import { runReport } from './Fetches/ga4.js';
import { clicks } from './Fetches/gads.js';

const GA4 = await runReport();
const GAds = await clicks;

console.log(GAds);