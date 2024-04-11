import {BetaAnalyticsDataClient} from '@google-analytics/data';
import {twelveMonthsAgo, twentyEightDaysAgo, today} from './dates.js';

const propertyId = '314616216';
const sessionData = {};

const analyticsDataClient = new BetaAnalyticsDataClient({keyFilename: './credentials.json'}
);

// Runs a simple report.
async function runReport() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: twelveMonthsAgo,
        endDate: today,
        name: "lastYear",
      },
      {
        startDate: twentyEightDaysAgo,
        endDate: today,
        name: "last28Days",
      },
    ],
    dimensions: [
      {
        name: 'sessionPrimaryChannelGroup',
      },
    ],
    metrics: [
      {
        name: 'sessions',
      },
    ],
  });

  //console.log('Report result:');
  response.rows.forEach(row => {
    if (row.dimensionValues[0].value === 'Paid Search') {
    //console.log(row.dimensionValues[1].value, row.dimensionValues[0].value, row.metricValues[0].value);
    sessionData[row.dimensionValues[1].value] = row.metricValues[0].value;
    }
  });
  //console.log(sessionData);
  return sessionData;
}

export {runReport};