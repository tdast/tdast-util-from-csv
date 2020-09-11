import td from 'tdastscript';

// special characters as defined in RFC-4180
const CR = '\r';
const LF = '\n';
const CRLF = '\r\n';
const COMMA = ',';
const DQUOTE = '"';

// reset values
const RESET_COLUMN = 1;
const RESET_OFFSET = 0;
const RESET_LINE = 1;
const RESET_TEXT = '';

// states
const START_TEXT = 0;
const START_QUOTE = 1;
const END_QUOTE = 3;
const END_TEXT = 4;
const END_LINE = 5;

function getPoint(line, column, offset) {
  return {
    line,
    column,
    offset,
  };
}

function testComma(char) {
  return char === COMMA;
}

function testDquote(char) {
  return char === DQUOTE;
}

function testNewline(char) {
  return CRLF.includes(char);
}

/**
 * RFC 4180 compliant CSV parser
 * O(n) complexity
 *
 * Pseudocode:
 * - keep track of Point-related data at all times (line/offset/column)
 * - manage parser based on the state of parsing.
 * - At a particular parsing state, we update and persist relevant information (e.g. line/offset/column/text/rows), and update the state based on nextChar.
 * - Each loop increments the csv string offset by +1, so the algorithm complexity is O(n).
 * - Convert all rows into equivalent tdast.
 */
export default function fromCsv(csv = '', options = {}) {
  let column = RESET_COLUMN;
  let line = RESET_LINE;
  let offset = RESET_OFFSET;
  let text = RESET_TEXT;
  let state = START_TEXT;
  let quoted = false;

  const rows = [[]];

  while (offset < csv.length + 1) {
    const char = csv[offset];
    const nextChar = csv[offset + 1];
    switch (state) {
      case START_TEXT: {
        text += char;
        if (testComma(nextChar) || testNewline(nextChar) || offset === csv.length - 1) {
          state = END_TEXT;
        }
        break;
      }
      case END_TEXT: {
        rows[line - 1].push(text);
        text = RESET_TEXT;
        if (testComma(char)) {
          state = START_TEXT;
        } else if (testNewline(char)) {
          state = END_LINE;
        }
        break;
      }
      case END_LINE: {
        line++;
        rows[line - 1] = [];
        column = RESET_COLUMN;
        if (!testNewline(char)) {
          state = START_TEXT;
          offset--;
        }
        break;
      }
    }
    offset++;
    column++;
  }

  console.log(rows);

  let tdast = td('table');

  return rows;
}
