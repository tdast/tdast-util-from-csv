import dedent from 'dedent';

import fromCsv from '../lib/from-csv';

describe(fromCsv, () => {
  describe('edge cases', () => {
    it('should transform empty string to empty tree', () => {
      expect(fromCsv('')).toEqual([[]]);
    });
  });

  describe('RFC-4180-1', () => {
    it('rows are delimited by line breaks', () => {
      expect(fromCsv('col1,col2,col3\nrow1col1,row1col2,row1col3')).toEqual([
        ['col1', 'col2', 'col3'],
        ['row1col1', 'row1col2', 'row1col3'],
      ]);
    });
  });

  describe('RFC-4180-2', () => {
    it('accepts optional ending line break.', () => {
      expect(fromCsv('col1,col2,col3\n')).toEqual([
        ['col1', 'col2', 'col3'],
        [],
      ]);
      expect(fromCsv('col1,col2,col3\nrow1col1,row1col2,row1col3\n')).toEqual([
        ['col1', 'col2', 'col3'],
        ['row1col1', 'row1col2', 'row1col3'],
        [],
      ]);
    });
  });

  describe('RFC-4180-3', () => {
    it('should apply headers', () => {
      expect(fromCsv('col1,col2,col3', { headers: true })).toEqual([
        ['col1', 'col2', 'col3'],
      ]);
    });
  });

  describe('RFC-4180-4', () => {
    it('should transform csv-delimited string', () => {
      expect(fromCsv('col1,col2,col3')).toEqual([['col1', 'col2', 'col3']]);
    });

    it('should only respect commas as delimiters', () => {
      expect(fromCsv('col1;col2\tcol3')).toEqual([['col1;col2\tcol3']]);
    });

    it('should consider spaces as part of a field', () => {
      expect(fromCsv('col1,  col2  , col3')).toEqual([
        ['col1', '  col2  ', ' col3'],
      ]);
    });

    it('should consider ignore comma contained in last fields', () => {
      expect(fromCsv('col1,col2,col3,')).toEqual([['col1', 'col2', 'col3']]);
    });
  });

  describe('RFC-4180-5', () => {
    it('should handle fields enclosed in dquotes', () => {
      expect(fromCsv('"col1","col2","col3"')).toEqual([
        ['col1', 'col2', 'col3'],
      ]);
      expect(fromCsv('"col1","  col2  "," col3"')).toEqual([
        ['col1', '  col2  ', ' col3'],
      ]);
    });
  });

  describe('RFC-4180-6', () => {
    it('should handle linebreaks and commas if fields are enclosed in dquotes', () => {
      expect(fromCsv('"col\n\n\n\n1","col,,,,2",col3')).toEqual([
        ['col\n\n\n\n1', 'col,,,,2', 'col3'],
      ]);
    });
  });

  describe('RFC-4180-7', () => {
    it('should handle escaped dquotes if fields are enclosed in dquotes', () => {
      expect(fromCsv('"col""1","c""o""""l2",col3')).toEqual([
        ['col"1', 'c"o""l2', 'col3'],
      ]);
    });
  });

  describe('kitchen sink', () => {
    it('should handle all edge cases and return a tree with multiple rows', () => {
      const csv = dedent`
        "col1","c""o""""l,2,,","co\nl\n\n3\n"
        row1col1,  row1col2  ," row1col3\n,\n"""
        "\nrow2col1",row2col2,row2col3\n
      `;
      expect(fromCsv(csv, { headers: true })).toEqual([
        ['col1', 'c"o""l,2,,', 'co\nl\n\n3\n'],
        ['row1col1', '  row1col2  ', ' row1col3\n,\n"'],
        ['\nrow2col1', 'row2col2', 'row2col3'],
        [],
      ]);
    });
  });
});
