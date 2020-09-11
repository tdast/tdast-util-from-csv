import dedent from 'dedent';

import fromCsv from '../lib/from-csv';

describe(fromCsv, () => {
  it('should transform empty array to empty tree', () => {
    const csv = dedent`
    col1,col2,col3
    row1col1,row1col2,row1col3
    row2col1,row2col2,row2col3
    `;
    expect(fromCsv(csv)).toEqual([
      ['col1', 'col2', 'col3'],
      ['row1col1', 'row1col2', 'row1col3'],
      ['row2col1', 'row2col2', 'row2col3'],
    ]);
  });

  it.skip('should transform empty array to empty tree', () => {
    const csv = dedent`
    "col1","col2","col3"
    "row1col1","row1col2","row1col3"
    "row2col1","row2col2","row2col3"
    `;
    expect(fromCsv(csv)).toEqual([
      ['col1', 'col2', 'col3'],
      ['row1col1', 'row1col2', 'row1col3'],
      ['row2col1', 'row2col2', 'row2col3'],
    ]);
  });

  it.skip('should transform empty array to empty tree', () => {
    const csv = dedent`
    "col1","col,2","col3"
    row1col1,row1col2,row1col3
    row2col1,row2col2,row2col3
    `;
    expect(fromCsv(csv)).toEqual([
      ['col1', 'col2', 'col3'],
      ['row1col1', 'row1col2', 'row1col3'],
      ['row2col1', 'row2col2', 'row2col3'],
    ]);
  });
});
