'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: 'materialshop-secret',

  FACEBOOK_ID: '',
  FACEBOOK_SECRET: 'ECL7Lwiao_jXN9pbOdFAvE812Xf_zciRn3tWc9AhWJ7B2NH51Cne3H4bMxZpLRci7mHCaa9ImATHgiHq',

  TWITTER_ID: 'app-id',
  TWITTER_SECRET: 'secret',

  GOOGLE_ID: 'app-id',
  GOOGLE_SECRET: 'secret',

  SENDGRID_APIKEY: 'YOUR_GENERATED_SENDGRID_API_KEY', // Used for sending emails

  PAYPAL_MODE: 'sandbox', //sandbox or live
  PAYPAL_CLIENT_ID: "ARb7W3Svi4rcM_F3OFvps5F_hAL9BZjPzMF3TkTb7q0Cp0p768FbmEK5nuiHWg3Y0ETwtkZkoCHQd7zo",
  PAYPAL_CLIENT_SECRET: "ECL7Lwiao_jXN9pbOdFAvE812Xf_zciRn3tWc9AhWJ7B2NH51Cne3H4bMxZpLRci7mHCaa9ImATHgiHq",

  STRIPE_APIKEY: 'sk_test_REST_OF_YOUR_KEY',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
//# sourceMappingURL=local.env.js.map
