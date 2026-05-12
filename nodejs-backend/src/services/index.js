const clients = require("./clients/clients.service.js");
const deals = require("./deals/deals.service.js");
const dealStageHistory = require("./dealStageHistory/dealStageHistory.service.js");
const applications = require("./applications/applications.service.js");
const mortageDetails = require("./mortageDetails/mortageDetails.service.js");
const personalDetails = require("./personalDetails/personalDetails.service.js");
const businessDetails = require("./businessDetails/businessDetails.service.js");
const securityProperties = require("./securityProperties/securityProperties.service.js");
const assetsLiabilities = require("./assetsLiabilities/assetsLiabilities.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(clients);
  app.configure(deals);
  app.configure(dealStageHistory);
  app.configure(applications);
  app.configure(mortageDetails);
  app.configure(personalDetails);
  app.configure(businessDetails);
  app.configure(securityProperties);
  app.configure(assetsLiabilities);
    // ~cb-add-configure-service-name~
};
