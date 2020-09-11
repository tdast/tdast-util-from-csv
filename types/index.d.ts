import { Table } from 'tdast-types';

export interface Options {
  // if the first row of the CSV contains header values
  header?: boolean;
}

/**
 * CSV parser to parse CSV to tdast
 * This parser does not use regexp, and tracks UnistPosition in tdast nodes.
 * RFC-4180 compliant: https://tools.ietf.org/html/rfc4180
 */
export default function fromCsv(
  // RFC-4180 compliant CSV string
  csv: string,
  // optional options to configure parser
  options?: Options
): Table;
