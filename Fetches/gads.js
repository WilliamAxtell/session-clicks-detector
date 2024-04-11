import dotenv from "dotenv";
dotenv.config();
import { GoogleAdsApi } from "google-ads-api";
import {twelveMonthsAgo, twentyEightDaysAgo, today} from './dates.js';
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


const clicks = await customer.report({
  entity: "campaign",
  attributes: [
    "campaign.id",
    "campaign.name",
    "campaign.bidding_strategy_type",
    "campaign_budget.amount_micros",
  ],
  metrics: [
    "metrics.cost_micros",
    "metrics.clicks",
    "metrics.impressions",
    "metrics.all_conversions",
  ],
  constraints: {
    "campaign.status": enums.CampaignStatus.ENABLED,
  },
  limit: 20,
});

export {clicks};