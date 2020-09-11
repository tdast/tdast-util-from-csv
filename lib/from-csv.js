import td from 'tdastscript';

// Special characters as defined in RFC-4180
const CRLF = '\r\n';
const COMMA = ',';
const DQUOTE = '"';

// States
const FIELD_START = 0;
const FIELD_END = 1;
const LINE_END = 2;

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
  // track unist position
  let line = 1;
  let column = 1;
  let offset = 0;
  let start = { line, column, offset };
  let end = { line, column, offset };

  // track parsed field values and states
  let fieldValue = '';
  let state = FIELD_START;
  let quoted = false;
  const cells = [[]];
  const rows = [[]];

  const csvLength = csv.length;
  while (offset < csvLength + 1) {
    const previousChar = csv[offset - 1];
    const char = csv[offset];
    const nextChar = csv[offset + 1];
    switch (state) {
      case FIELD_START: {
        let charToAdd = '';
        const isFieldEnd = testFieldEnd(nextChar, offset, csvLength);
        if (fieldValue === '') {
          start = { line, column, offset };
        }
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
        fieldValue += charToAdd;
        break;
      }
      case FIELD_END: {
        if (char === COMMA) {
          state = FIELD_START;
        } else if (testNewline(char)) {
          state = LINE_END;
        }
        const endOffset = previousChar === DQUOTE ? offset -1 : offset;
        end = { line, column: column - 1, offset: endOffset };
        const position = {start, end };
        cells[line - 1].push(td('cell', { position, value: fieldValue }));
        rows[line - 1].push(fieldValue);
        fieldValue = '';
        break;
      }
      case LINE_END: {
        if (!testNewline(char)) {
          state = FIELD_START;
          offset--;
        }
        line++;
        cells[line - 1] = [];
        rows[line - 1] = [];
        column = 1;
        break;
      }
      default:
        break;
    }
    column++;
    offset++;
  }

  console.log(JSON.stringify(cells, null, 2));

  const tdast = td('table');

  return rows;
}
