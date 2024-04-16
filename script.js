import { runReport } from './Fetches/ga4.js';
import { gadClicks } from './Fetches/gads.js';
import { sendEmail } from './alerts/sendgrid.js';
import schedule from 'node-schedule';
import console from './logger.js';
import { androidPrivacySharedKeyGoogleCampaign } from 'google-ads-api/build/src/protos/autogen/resourceNames.js';

const clients = {
    "gartec":
        {
         propertyId: 314616216, 
         customer_id: 1694044870,
        },
    "coastal drains":
        {
         propertyId: 314533257,
         customer_id: 6966351389,
        },
    };


const techCheck = async (client, ga4Prop, gadsCust) => {
    //Collects 30 day and 12 month session data from GA4 and 30 day and 12 month campaign click data from Google Ads
    const GA4 = await runReport(ga4Prop);
    const GAds = await gadClicks(gadsCust);
    // const GA4 = { lastYear: 17864, last30Days: 1509 };
    // const GAds = { lastYear: 44726, last30Days: 4940 };
    console.log(GA4, GAds);

    //Calculates the ratio for GA4 sessions and Google Ads clicks for the last 30 days and last 12 months
    const yearPerc = Math.round((GA4.lastYear / GAds.lastYear) * 100);
    const monthPerc = Math.round((GA4.last30Days / GAds.last30Days) * 100);


    //
    if (GAds.last30Days == 0) {
        sendEmail("noClicks");
    } else if (monthPerc < (yearPerc / 2)) {
        sendEmail("highClicks")
    } else if (monthPerc > (yearPerc * 2)) {
        sendEmail("lowClicks")
    } else {
        sendEmail("normalClicks")
    }
}

console.log("scheduler running");

// const j = schedule.scheduleJob({hour: 6, minute: 0, date: 1}, () => {
//   console.log("job scheduled");
//   techCheck();
// });
