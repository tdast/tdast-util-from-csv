import dedent from 'dedent';

import fromCsv from '../lib/from-csv';

describe(fromCsv, () => {
  describe('edge cases', () => {
    it('should transform empty string to empty tree', () => {
      expect(fromCsv('')).toEqual({
        type: 'table',
        children: [],
      });
    });
  });

  describe('RFC-4180-1', () => {
    it('rows are delimited by line breaks', () => {
      expect(fromCsv('col1,col2,col3\nrow1col1,row1col2,row1col3')).toEqual({
        type: 'table',
        position: {
          start: {
            line: 1,
            column: 1,
            offset: 0,
          },
          end: {
            line: 2,
            column: 27,
            offset: 41,
          },
        },
        children: [
          {
            type: 'row',
            index: 0,
            position: {
              start: {
                line: 1,
                column: 1,
                offset: 0,
              },
              end: {
                line: 1,
                column: 15,
                offset: 14,
              },
            },
            children: [
              {
                type: 'cell',
                value: 'col1',
                columnIndex: 0,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 1,
                    offset: 0,
                  },
                  end: {
                    line: 1,
                    column: 5,
                    offset: 4,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col2',
                columnIndex: 1,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 6,
                    offset: 5,
                  },
                  end: {
                    line: 1,
                    column: 10,
                    offset: 9,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col3',
                columnIndex: 2,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 11,
                    offset: 10,
                  },
                  end: {
                    line: 1,
                    column: 15,
                    offset: 14,
                  },
                },
              },
            ],
          },
          {
            type: 'row',
            index: 1,
            position: {
              start: {
                line: 2,
                column: 1,
                offset: 15,
              },
              end: {
                line: 2,
                column: 27,
                offset: 41,
              },
            },
            children: [
              {
                type: 'cell',
                value: 'row1col1',
                columnIndex: 0,
                rowIndex: 1,
                position: {
                  start: {
                    line: 2,
                    column: 1,
                    offset: 15,
                  },
                  end: {
                    line: 2,
                    column: 9,
                    offset: 23,
                  },
                },
              },
              {
                type: 'cell',
                value: 'row1col2',
                columnIndex: 1,
                rowIndex: 1,
                position: {
                  start: {
                    line: 2,
                    column: 10,
                    offset: 24,
                  },
                  end: {
                    line: 2,
                    column: 18,
                    offset: 32,
                  },
                },
              },
              {
                type: 'cell',
                value: 'row1col3',
                columnIndex: 2,
                rowIndex: 1,
                position: {
                  start: {
                    line: 2,
                    column: 19,
                    offset: 33,
                  },
                  end: {
                    line: 2,
                    column: 27,
                    offset: 41,
                  },
                },
              },
            ],
          },
        ],
      });
    });
  });

  describe('RFC-4180-2', () => {
    it('accepts optional ending line break.', () => {
      expect(fromCsv('col1,col2,col3\n')).toEqual({
        type: 'table',
        position: {
          start: {
            line: 1,
            column: 1,
            offset: 0,
          },
          end: {
            line: 1,
            column: 15,
            offset: 14,
          },
        },
        children: [
          {
            type: 'row',
            index: 0,
            position: {
              start: {
                line: 1,
                column: 1,
                offset: 0,
              },
              end: {
                line: 1,
                column: 15,
                offset: 14,
              },
            },
            children: [
              {
                type: 'cell',
                value: 'col1',
                columnIndex: 0,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 1,
                    offset: 0,
                  },
                  end: {
                    line: 1,
                    column: 5,
                    offset: 4,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col2',
                columnIndex: 1,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 6,
                    offset: 5,
                  },
                  end: {
                    line: 1,
                    column: 10,
                    offset: 9,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col3',
                columnIndex: 2,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 11,
                    offset: 10,
                  },
                  end: {
                    line: 1,
                    column: 15,
                    offset: 14,
                  },
                },
              },
            ],
          },
        ],
      });
      expect(fromCsv('col1,col2,col3\nrow1col1,row1col2,row1col3\n')).toEqual({
        type: 'table',
        position: {
          start: {
            line: 1,
            column: 1,
            offset: 0,
          },
          end: {
            line: 2,
            column: 27,
            offset: 41,
          },
        },
        children: [
          {
            type: 'row',
            index: 0,
            position: {
              start: {
                line: 1,
                column: 1,
                offset: 0,
              },
              end: {
                line: 1,
                column: 15,
                offset: 14,
              },
            },
            children: [
              {
                type: 'cell',
                value: 'col1',
                columnIndex: 0,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 1,
                    offset: 0,
                  },
                  end: {
                    line: 1,
                    column: 5,
                    offset: 4,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col2',
                columnIndex: 1,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 6,
                    offset: 5,
                  },
                  end: {
                    line: 1,
                    column: 10,
                    offset: 9,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col3',
                columnIndex: 2,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 11,
                    offset: 10,
                  },
                  end: {
                    line: 1,
                    column: 15,
                    offset: 14,
                  },
                },
              },
            ],
          },
          {
            type: 'row',
            index: 1,
            position: {
              start: {
                line: 2,
                column: 1,
                offset: 15,
              },
              end: {
                line: 2,
                column: 27,
                offset: 41,
              },
            },
            children: [
              {
                type: 'cell',
                value: 'row1col1',
                columnIndex: 0,
                rowIndex: 1,
                position: {
                  start: {
                    line: 2,
                    column: 1,
                    offset: 15,
                  },
                  end: {
                    line: 2,
                    column: 9,
                    offset: 23,
                  },
                },
              },
              {
                type: 'cell',
                value: 'row1col2',
                columnIndex: 1,
                rowIndex: 1,
                position: {
                  start: {
                    line: 2,
                    column: 10,
                    offset: 24,
                  },
                  end: {
                    line: 2,
                    column: 18,
                    offset: 32,
                  },
                },
              },
              {
                type: 'cell',
                value: 'row1col3',
                columnIndex: 2,
                rowIndex: 1,
                position: {
                  start: {
                    line: 2,
                    column: 19,
                    offset: 33,
                  },
                  end: {
                    line: 2,
                    column: 27,
                    offset: 41,
                  },
                },
              },
            ],
          },
        ],
      });
    });
  });

  describe('RFC-4180-2', () => {
    it('accepts optional ending line break.', () => {
      expect(fromCsv('col1,col2,col3\n')).toEqual({
        type: 'table',
        position: {
          start: {
            line: 1,
            column: 1,
            offset: 0,
          },
          end: {
            line: 1,
            column: 15,
            offset: 14,
          },
        },
        children: [
          {
            type: 'row',
            index: 0,
            position: {
              start: {
                line: 1,
                column: 1,
                offset: 0,
              },
              end: {
                line: 1,
                column: 15,
                offset: 14,
              },
            },
            children: [
              {
                type: 'cell',
                value: 'col1',
                columnIndex: 0,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 1,
                    offset: 0,
                  },
                  end: {
                    line: 1,
                    column: 5,
                    offset: 4,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col2',
                columnIndex: 1,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 6,
                    offset: 5,
                  },
                  end: {
                    line: 1,
                    column: 10,
                    offset: 9,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col3',
                columnIndex: 2,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 11,
                    offset: 10,
                  },
                  end: {
                    line: 1,
                    column: 15,
                    offset: 14,
                  },
                },
              },
            ],
          },
        ],
      });
    });
  });

  describe('RFC-4180-3', () => {
    it('should apply header', () => {
      expect(fromCsv('col1,col2,col3', { header: true })).toEqual({
        type: 'table',
        position: {
          start: {
            line: 1,
            column: 1,
            offset: 0,
          },
          end: {
            line: 1,
            column: 15,
            offset: 14,
          },
        },
        children: [
          {
            type: 'row',
            index: 0,
            position: {
              start: {
                line: 1,
                column: 1,
                offset: 0,
              },
              end: {
                line: 1,
                column: 15,
                offset: 14,
              },
            },
            children: [
              {
                type: 'column',
                value: 'col1',
                index: 0,
                position: {
                  start: {
                    line: 1,
                    column: 1,
                    offset: 0,
                  },
                  end: {
                    line: 1,
                    column: 5,
                    offset: 4,
                  },
                },
              },
              {
                type: 'column',
                value: 'col2',
                index: 1,
                position: {
                  start: {
                    line: 1,
                    column: 6,
                    offset: 5,
                  },
                  end: {
                    line: 1,
                    column: 10,
                    offset: 9,
                  },
                },
              },
              {
                type: 'column',
                value: 'col3',
                index: 2,
                position: {
                  start: {
                    line: 1,
                    column: 11,
                    offset: 10,
                  },
                  end: {
                    line: 1,
                    column: 15,
                    offset: 14,
                  },
                },
              },
            ],
          },
        ],
      });
    });
  });

  describe('RFC-4180-4', () => {
    it('should transform csv-delimited string', () => {
      expect(fromCsv('col1,col2,col3')).toEqual({
        type: 'table',
        position: {
          start: {
            line: 1,
            column: 1,
            offset: 0,
          },
          end: {
            line: 1,
            column: 15,
            offset: 14,
          },
        },
        children: [
          {
            type: 'row',
            index: 0,
            position: {
              start: {
                line: 1,
                column: 1,
                offset: 0,
              },
              end: {
                line: 1,
                column: 15,
                offset: 14,
              },
            },
            children: [
              {
                type: 'cell',
                value: 'col1',
                columnIndex: 0,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 1,
                    offset: 0,
                  },
                  end: {
                    line: 1,
                    column: 5,
                    offset: 4,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col2',
                columnIndex: 1,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 6,
                    offset: 5,
                  },
                  end: {
                    line: 1,
                    column: 10,
                    offset: 9,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col3',
                columnIndex: 2,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 11,
                    offset: 10,
                  },
                  end: {
                    line: 1,
                    column: 15,
                    offset: 14,
                  },
                },
              },
            ],
          },
        ],
      });
    });

    it('should only respect commas as delimiters', () => {
      expect(fromCsv('col1;col2\tcol3')).toEqual({
        type: 'table',
        position: {
          start: {
            line: 1,
            column: 1,
            offset: 0,
          },
          end: {
            line: 1,
            column: 15,
            offset: 14,
          },
        },
        children: [
          {
            type: 'row',
            index: 0,
            position: {
              start: {
                line: 1,
                column: 1,
                offset: 0,
              },
              end: {
                line: 1,
                column: 15,
                offset: 14,
              },
            },
            children: [
              {
                type: 'cell',
                value: 'col1;col2\tcol3',
                columnIndex: 0,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 1,
                    offset: 0,
                  },
                  end: {
                    line: 1,
                    column: 15,
                    offset: 14,
                  },
                },
              },
            ],
          },
        ],
      });
    });

    it('should consider spaces as part of a field', () => {
      expect(fromCsv('col1,  col2  , col3')).toEqual({
        type: 'table',
        position: {
          start: {
            line: 1,
            column: 1,
            offset: 0,
          },
          end: {
            line: 1,
            column: 20,
            offset: 19,
          },
        },
        children: [
          {
            type: 'row',
            index: 0,
            position: {
              start: {
                line: 1,
                column: 1,
                offset: 0,
              },
              end: {
                line: 1,
                column: 20,
                offset: 19,
              },
            },
            children: [
              {
                type: 'cell',
                value: 'col1',
                columnIndex: 0,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 1,
                    offset: 0,
                  },
                  end: {
                    line: 1,
                    column: 5,
                    offset: 4,
                  },
                },
              },
              {
                type: 'cell',
                value: '  col2  ',
                columnIndex: 1,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 6,
                    offset: 5,
                  },
                  end: {
                    line: 1,
                    column: 14,
                    offset: 13,
                  },
                },
              },
              {
                type: 'cell',
                value: ' col3',
                columnIndex: 2,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 15,
                    offset: 14,
                  },
                  end: {
                    line: 1,
                    column: 20,
                    offset: 19,
                  },
                },
              },
            ],
          },
        ],
      });
    });

    it('should ignore comma contained in last fields', () => {
      expect(fromCsv('col1,col2,col3,')).toEqual({
        type: 'table',
        position: {
          start: {
            line: 1,
            column: 1,
            offset: 0,
          },
          end: {
            line: 1,
            column: 15,
            offset: 14,
          },
        },
        children: [
          {
            type: 'row',
            index: 0,
            position: {
              start: {
                line: 1,
                column: 1,
                offset: 0,
              },
              end: {
                line: 1,
                column: 15,
                offset: 14,
              },
            },
            children: [
              {
                type: 'cell',
                value: 'col1',
                columnIndex: 0,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 1,
                    offset: 0,
                  },
                  end: {
                    line: 1,
                    column: 5,
                    offset: 4,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col2',
                columnIndex: 1,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 6,
                    offset: 5,
                  },
                  end: {
                    line: 1,
                    column: 10,
                    offset: 9,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col3',
                columnIndex: 2,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 11,
                    offset: 10,
                  },
                  end: {
                    line: 1,
                    column: 15,
                    offset: 14,
                  },
                },
              },
            ],
          },
        ],
      });
    });
  });

  describe('RFC-4180-5', () => {
    it('should handle fields enclosed in dquotes', () => {
      expect(fromCsv('"col1","col2","col3"')).toEqual({
        type: 'table',
        position: {
          start: {
            line: 1,
            column: 2,
            offset: 1,
          },
          end: {
            line: 1,
            column: 20,
            offset: 19,
          },
        },
        children: [
          {
            type: 'row',
            index: 0,
            position: {
              start: {
                line: 1,
                column: 2,
                offset: 1,
              },
              end: {
                line: 1,
                column: 20,
                offset: 19,
              },
            },
            children: [
              {
                type: 'cell',
                value: 'col1',
                columnIndex: 0,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 2,
                    offset: 1,
                  },
                  end: {
                    line: 1,
                    column: 6,
                    offset: 5,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col2',
                columnIndex: 1,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 9,
                    offset: 8,
                  },
                  end: {
                    line: 1,
                    column: 13,
                    offset: 12,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col3',
                columnIndex: 2,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 16,
                    offset: 15,
                  },
                  end: {
                    line: 1,
                    column: 20,
                    offset: 19,
                  },
                },
              },
            ],
          },
        ],
      });
      expect(fromCsv('"col1","  col2  "," col3"')).toEqual({
        type: 'table',
        position: {
          start: {
            line: 1,
            column: 2,
            offset: 1,
          },
          end: {
            line: 1,
            column: 25,
            offset: 24,
          },
        },
        children: [
          {
            type: 'row',
            index: 0,
            position: {
              start: {
                line: 1,
                column: 2,
                offset: 1,
              },
              end: {
                line: 1,
                column: 25,
                offset: 24,
              },
            },
            children: [
              {
                type: 'cell',
                value: 'col1',
                columnIndex: 0,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 2,
                    offset: 1,
                  },
                  end: {
                    line: 1,
                    column: 6,
                    offset: 5,
                  },
                },
              },
              {
                type: 'cell',
                value: '  col2  ',
                columnIndex: 1,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 9,
                    offset: 8,
                  },
                  end: {
                    line: 1,
                    column: 17,
                    offset: 16,
                  },
                },
              },
              {
                type: 'cell',
                value: ' col3',
                columnIndex: 2,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 20,
                    offset: 19,
                  },
                  end: {
                    line: 1,
                    column: 25,
                    offset: 24,
                  },
                },
              },
            ],
          },
        ],
      });
    });
  });

  describe('RFC-4180-6', () => {
    it('should handle linebreaks and commas if fields are enclosed in dquotes', () => {
      expect(fromCsv('"col\n\n\n\n1","col,,,,2",col3')).toEqual({
        type: 'table',
        position: {
          start: {
            line: 1,
            column: 2,
            offset: 1,
          },
          end: {
            line: 1,
            column: 27,
            offset: 26,
          },
        },
        children: [
          {
            type: 'row',
            index: 0,
            position: {
              start: {
                line: 1,
                column: 2,
                offset: 1,
              },
              end: {
                line: 1,
                column: 27,
                offset: 26,
              },
            },
            children: [
              {
                type: 'cell',
                value: 'col\n\n\n\n1',
                columnIndex: 0,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 2,
                    offset: 1,
                  },
                  end: {
                    line: 1,
                    column: 10,
                    offset: 9,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col,,,,2',
                columnIndex: 1,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 13,
                    offset: 12,
                  },
                  end: {
                    line: 1,
                    column: 21,
                    offset: 20,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col3',
                columnIndex: 2,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 23,
                    offset: 22,
                  },
                  end: {
                    line: 1,
                    column: 27,
                    offset: 26,
                  },
                },
              },
            ],
          },
        ],
      });
    });
  });

  describe('RFC-4180-7', () => {
    it('should handle escaped dquotes if fields are enclosed in dquotes', () => {
      expect(fromCsv('"col""1","c""ol""""2",col3')).toEqual({
        type: 'table',
        position: {
          start: {
            line: 1,
            column: 2,
            offset: 1,
          },
          end: {
            line: 1,
            column: 27,
            offset: 26,
          },
        },
        children: [
          {
            type: 'row',
            index: 0,
            position: {
              start: {
                line: 1,
                column: 2,
                offset: 1,
              },
              end: {
                line: 1,
                column: 27,
                offset: 26,
              },
            },
            children: [
              {
                type: 'cell',
                value: 'col"1',
                columnIndex: 0,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 2,
                    offset: 1,
                  },
                  end: {
                    line: 1,
                    column: 8,
                    offset: 7,
                  },
                },
              },
              {
                type: 'cell',
                value: 'c"ol""2',
                columnIndex: 1,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 11,
                    offset: 10,
                  },
                  end: {
                    line: 1,
                    column: 21,
                    offset: 20,
                  },
                },
              },
              {
                type: 'cell',
                value: 'col3',
                columnIndex: 2,
                rowIndex: 0,
                position: {
                  start: {
                    line: 1,
                    column: 23,
                    offset: 22,
                  },
                  end: {
                    line: 1,
                    column: 27,
                    offset: 26,
                  },
                },
              },
            ],
          },
        ],
      });
    });
  });

  describe('kitchen sink', () => {
    it('should handle all edge cases and return a tree with multiple rows', () => {
      const csv = dedent`
        "col1","c""o""""l,2,,","co\nl\n\n3\n"
        row1col1,  row1col2  ," row1col3\n,\n"""
        "\nrow2col1",row2col2,row2col3\n
      `;
      expect(fromCsv(csv, { header: true })).toEqual({
        type: 'table',
        position: {
          start: {
            line: 1,
            column: 2,
            offset: 1,
          },
          end: {
            line: 3,
            column: 30,
            offset: 102,
          },
        },
        children: [
          {
            type: 'row',
            index: 0,
            position: {
              start: {
                line: 1,
                column: 2,
                offset: 1,
              },
              end: {
                line: 1,
                column: 33,
                offset: 32,
              },
            },
            children: [
              {
                type: 'column',
                index: 0,
                position: {
                  start: {
                    line: 1,
                    column: 2,
                    offset: 1,
                  },
                  end: {
                    line: 1,
                    column: 6,
                    offset: 5,
                  },
                },
                value: 'col1',
              },
              {
                type: 'column',
                index: 1,
                position: {
                  start: {
                    line: 1,
                    column: 9,
                    offset: 8,
                  },
                  end: {
                    line: 1,
                    column: 22,
                    offset: 21,
                  },
                },
                value: 'c"o""l,2,,',
              },
              {
                type: 'column',
                index: 2,
                position: {
                  start: {
                    line: 1,
                    column: 25,
                    offset: 24,
                  },
                  end: {
                    line: 1,
                    column: 33,
                    offset: 32,
                  },
                },
                value: 'co\nl\n\n3\n',
              },
            ],
          },
          {
            type: 'row',
            index: 1,
            position: {
              start: {
                line: 2,
                column: 1,
                offset: 34,
              },
              end: {
                line: 2,
                column: 38,
                offset: 71,
              },
            },
            children: [
              {
                type: 'cell',
                columnIndex: 0,
                position: {
                  start: {
                    line: 2,
                    column: 1,
                    offset: 34,
                  },
                  end: {
                    line: 2,
                    column: 9,
                    offset: 42,
                  },
                },
                rowIndex: 1,
                value: 'row1col1',
              },
              {
                type: 'cell',
                columnIndex: 1,
                position: {
                  start: {
                    line: 2,
                    column: 10,
                    offset: 43,
                  },
                  end: {
                    line: 2,
                    column: 22,
                    offset: 55,
                  },
                },
                rowIndex: 1,
                value: '  row1col2  ',
              },
              {
                type: 'cell',
                columnIndex: 2,
                position: {
                  start: {
                    line: 2,
                    column: 24,
                    offset: 57,
                  },
                  end: {
                    line: 2,
                    column: 38,
                    offset: 71,
                  },
                },
                rowIndex: 1,
                value: ' row1col3\n,\n"',
              },
            ],
          },
          {
            type: 'row',
            index: 2,
            position: {
              start: {
                line: 3,
                column: 2,
                offset: 74,
              },
              end: {
                line: 3,
                column: 30,
                offset: 102,
              },
            },
            children: [
              {
                type: 'cell',
                columnIndex: 0,
                position: {
                  start: {
                    line: 3,
                    column: 2,
                    offset: 74,
                  },
                  end: {
                    line: 3,
                    column: 11,
                    offset: 83,
                  },
                },
                rowIndex: 2,
                value: '\nrow2col1',
              },
              {
                type: 'cell',
                columnIndex: 1,
                position: {
                  start: {
                    line: 3,
                    column: 13,
                    offset: 85,
                  },
                  end: {
                    line: 3,
                    column: 21,
                    offset: 93,
                  },
                },
                rowIndex: 2,
                value: 'row2col2',
              },
              {
                type: 'cell',
                columnIndex: 2,
                position: {
                  start: {
                    line: 3,
                    column: 22,
                    offset: 94,
                  },
                  end: {
                    line: 3,
                    column: 30,
                    offset: 102,
                  },
                },
                rowIndex: 2,
                value: 'row2col3',
              },
            ],
          },
        ],
      });
    });
  });
});
