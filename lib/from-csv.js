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

function inferParentPosition(nodes) {
  const head = nodes[0];
  const tail = nodes[nodes.length - 1];
  if (head && tail) {
    return {
      start: head.position.start,
      end: tail.position.end,
    };
  }
}

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
  const rowCellData = [[]];

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
            column++;
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
        const endColumn = previousChar === DQUOTE ? column - 1 : column;
        const endOffset = previousChar === DQUOTE ? offset - 1 : offset;
        end = { line, column: endColumn, offset: endOffset };
        const position = { start, end };
        rowCellData[line - 1].push({ position, value: fieldValue });
        fieldValue = '';
        break;
      }
      case LINE_END: {
        if (!testNewline(char)) {
          state = FIELD_START;
          offset--;
        }
        line++;
        rowCellData[line - 1] = [];
        column = 0;
        break;
      }
      default:
        break;
    }
    column++;
    offset++;
  }

  const rows = rowCellData.reduce((acc, cellData, rowIndex) => {
    const isColumn = options.header && rowIndex === 0;
    const cells = cellData.map(({ position, value }, columnIndex) => {
      if (isColumn) {
        return {
          type: 'column',
          index: columnIndex,
          position,
          value,
        };
      }
      return {
        type: 'cell',
        columnIndex,
        rowIndex,
        position,
        value,
      };
    });
    if (cells.length > 0) {
      const rowPosition = inferParentPosition(cells);
      const row = td('row', { index: rowIndex, position: rowPosition }, cells);
      acc.push(row);
    }
    return acc;
  }, []);

  const tablePosition = inferParentPosition(rows);
  return td('table', { position: tablePosition }, rows);
}
