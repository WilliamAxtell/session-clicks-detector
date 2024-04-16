import dotenv from "dotenv";
dotenv.config();
import { GoogleAdsApi } from "google-ads-api";
import {twelveMonthsAgo, thirtyDaysAgo, today} from './dates.js';
import { enums } from "google-ads-api";

const client = new GoogleAdsApi({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  developer_token: process.env.DEVELOPER_TOKEN,
});

const customer = client.Customer({
    customer_id: "1694044870",
    login_customer_id: process.env.CUSTOMER_ID,
    refresh_token: process.env.REFRESH_TOKEN,
  });


const getClicks = async (startDate, endDate) => {

  const [summaryRow, ...response] = await customer.report({
    entity: "campaign",
    metrics: ["metrics.clicks"],
    summary_row_setting: enums.SummaryRowSetting.SUMMARY_ROW_WITH_RESULTS,
    segments: ["segments.date"],
    from_date: startDate,
    to_date: endDate,    
  });

  return summaryRow.metrics.clicks;

}

async function gadClicks() {
  const getLastYear = await getClicks(twelveMonthsAgo, today);
  const getLast30Days = await getClicks(thirtyDaysAgo, today);
  return {
    lastYear: getLastYear, 
    last30Days: getLast30Days
  };
}

export {gadClicks};