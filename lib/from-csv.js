import td from 'tdastscript';

// Special characters as defined in RFC-4180
const CRLF = '\r\n';
const COMMA = ',';
const DQUOTE = '"';

// States
const FIELD_START = 0;
const FIELD_END = 1;
const LINE_END = 2;

function getPoint(line, column, offset) {
  return {
    line,
    column,
    offset,
  };
}

function testNewline(char) {
  return CRLF.includes(char);
}

function testFieldEnd(char, offset, csvLength) {
  return offset === csvLength - 1 || char === COMMA || testNewline(char);
}

/**
 * Non-regexp RFC 4180 compliant CSV parser to parse CSV to tdast
 * https://tools.ietf.org/html/rfc4180
 */
export default function fromCsv(csv = '', options = {}) {
  let column = 1;
  let line = 1;
  let offset = 0;
  let field = '';
  let state = FIELD_START;
  let quoted = false;
  const csvLength = csv.length;
  const rows = [[]];

  while (offset < csvLength + 1) {
    const char = csv[offset];
    const nextChar = csv[offset + 1];
    switch (state) {
      case FIELD_START: {
        let charToAdd = '';
        const isFieldEnd = testFieldEnd(nextChar, offset, csvLength);
        if (char === DQUOTE) {
          if (!quoted) {
            quoted = true;
          } else if (isFieldEnd) {
            quoted = false;
          } else if (nextChar === DQUOTE) {
            charToAdd = '"';
            offset++;
          }
        } else {
          charToAdd = char;
        }
        if (!quoted && isFieldEnd) {
          state = FIELD_END;
        }
        field += charToAdd;
        break;
      }
      case FIELD_END: {
        if (char === COMMA) {
          state = FIELD_START;
        } else if (testNewline(char)) {
          state = LINE_END;
        }
        rows[line - 1].push(field);
        field = '';
        break;
      }
      case LINE_END: {
        if (!testNewline(char)) {
          state = FIELD_START;
          offset--;
        }
        line++;
        rows[line - 1] = [];
        column = 1;
        break;
      }
      default:
        break;
    }
    offset++;
    column++;
  }

  const tdast = td('table');

  return rows;
}
