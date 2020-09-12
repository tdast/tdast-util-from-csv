# tdast-util-from-csv

[**tdast**][tdast] utility to parse csv into tdast ([RFC-4180][] compliant).

---

## Install

```sh
npm install tdast-util-from-csv
```

## Use

With some [RFC-4180][] compliant CSV content (example below includes escaped double quotes and linebreaks):

```csv
"col1","c""o""""l,2,,","co\nl\n\n3\n"
row1col1,  row1col2  ," row1col3\n,\n"""
"\nrow2col1",row2col2,row2col3\n
```

`tdast-util-from-csv` will parse the CSV content into a tdast `Table` node tracking row/column/cell offsets and attaching well-defined [`UnistPosition`][dfn-unist-position].

```js
import fromCsv from 'tdast-util-from-csv';

const options = { header: true };
expect(fromCsv(csv, options)).toEqual({
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
```

## API

### `fromCsv(csv[, options])`

#### Interface
```ts
function fromCsv(
  // RFC-4180 compliant CSV string
  csv: string,
  // optional options to configure parser
  options?: Options,
): Table;
```

[RFC-4180][] compliant CSV parser to parse CSV to a tdast `Table` node.

Parsed `Cell` nodes conveniently escape any double-quote characters while preserving the original [`UnistPosition`][dfn-unist-position].  This enables conversion of the tdast tree into other [syntax trees][syntax-tree] that can make use of the positional information.

#### Related interfaces
```ts
interface Options {
  // if the first row of the CSV contains header values
  header?: boolean;
}
```

## Author's Note
I have little experience writing parsers.  Unlike most CSV parsers, this parser does not use regexp and its implementation is specifically written to track and assemble a tdast tree with well-defined [`UnistPosition`][dfn-unist-position].

The parser **should** be well-behaved since it is implemented against the [RFC-4180][] spec with some testing.

If there are any issues or you want to implement this in a more elegant/efficient way, please let me know through GH issues!

<!-- Definitions -->
[dfn-unist-position]: https://github.com/syntax-tree/unist#position
[rfc-4180]: https://tools.ietf.org/html/rfc4180
[syntax-tree]: https://github.com/syntax-tree
[tdast]: https://github.com/tdast/tdast
