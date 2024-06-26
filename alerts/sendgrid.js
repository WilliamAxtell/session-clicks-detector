import sgMail from '@sendgrid/mail';
import console from '../logger.js';


const sendEmail = (client, issue) => {
    const responses = {
      noClicks: `There have been no clicks in the last 30 days for ${client}. This suggests a serious error with your Google Ads tracking.`,
      highClicks: `For ${client}, there have been an admormally high number of Google Ads clicks as compared to GA4 sessions in the last 30 days. This suggests there may be an issue with your Google Ads tracking.`,
      lowClicks: `For ${client}, there have been a low number of Google Ads clicks as compared to GA4 sessions in the last 30 days. This suggests there may be an issue with your Google Ads tracking.`,
      normalClicks: `For ${client}, there have been a normal number of clicks in the last 30 days. It looks like your Google Ads tracking is working as expected.`
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'william@bamboonine.co.uk',
      from: 'data@bamboonine.co.uk',
      subject: `Results for Sessions/Clicks text for ${client}`,
      //text: 'and easy to do anywhere, even with Node.js',
      html: `<p>Good Morning, Zak!</p>
            <p>${responses[issue]}</p>
            <p>Kind Regards,</p>
            <p>The Data Team</p>`,
    };
  
    (async () => {
      try {
        await sgMail.send(msg);
        console.log("email sent successfully");
      } catch (error) {
        console.error(error);
  
        if (error.response) {
          console.error(error.response.body)
        }
      }
    })();
  }

export { sendEmail };