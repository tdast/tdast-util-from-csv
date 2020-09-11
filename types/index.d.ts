import { Table } from 'tdast-types';

export interface Options {
  // if the first row of the CSV contains header values
  header?: boolean;
}

/**
 * Non-regexp RFC-4180 compliant CSV parser to parse CSV to tdast
 * https://tools.ietf.org/html/rfc4180
 */
export default function fromCsv(
  // RFC-4180 compliant CSV string
  csv: string,
  // optional options to configure parser
  options?: Options
): Table;
