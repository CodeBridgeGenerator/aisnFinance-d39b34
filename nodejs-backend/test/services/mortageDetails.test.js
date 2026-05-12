const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("mortageDetails service", async () => {
  let thisService;
  let mortageDetailCreated;
  let usersServiceResults;
  let users;

  const clientsCreated = await app.service("clients").Model.create({"applicationId":"parentObjectId","dealId":"parentObjectId","segment":"new value","currentStage":"new value","status":"new value","clientId":"parentObjectId","userId":"parentObjectId","type":"new value"});
const dealsCreated = await app.service("deals").Model.create({"applicationId":"parentObjectId","dealId":"parentObjectId","segment":"new value","currentStage":"new value","status":"new value","clientId":`${clientsCreated._id}`,"userId":"parentObjectId","type":"new value"});
const applicationsCreated = await app.service("applications").Model.create({"applicationId":"parentObjectId","dealId":`${dealsCreated._id}`,"segment":"new value","currentStage":"new value","status":"new value","clientId":`${clientsCreated._id}`,"userId":"parentObjectId","type":"new value","noContactByTelephone":"new value","noContactByPost":"new value","noContactByElectronicMedia":"new value","noContactForMarketResearch":"new value"});

  beforeEach(async () => {
    thisService = await app.service("mortageDetails");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (mortageDetails)");
  });

  describe("#create", () => {
    const options = {"applicationId":`${applicationsCreated._id}`,"dealId":`${dealsCreated._id}`,"segment":"new value","currentStage":"new value","status":"new value","clientId":`${clientsCreated._id}`,"userId":"parentObjectId","type":"new value","noContactByTelephone":"new value","noContactByPost":"new value","noContactByElectronicMedia":"new value","noContactForMarketResearch":"new value","requestedLoanAmount":"new value","requestedRepaymentTerm":"new value","purposeOfMortage":"new value","capitalRaisingFundUse":"new value","investmentPropertyOccupier":"new value","invstmntPropOcprDetails":"new value","solicitorName":"new value","solicitorAddress":"new value","solicitorPhoneNo":"new value","solicitorEmail":"new value","intermediaryName":"new value","intermediaryAddress":"new value","intermediaryPhoneNo":"new value","intermediaryEmail":"new value"};

    beforeEach(async () => {
      mortageDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new mortageDetail", () => {
      assert.strictEqual(mortageDetailCreated.applicationId.toString(), options.applicationId.toString());
assert.strictEqual(mortageDetailCreated.requestedLoanAmount, options.requestedLoanAmount);
assert.strictEqual(mortageDetailCreated.requestedRepaymentTerm, options.requestedRepaymentTerm);
assert.strictEqual(mortageDetailCreated.purposeOfMortage, options.purposeOfMortage);
assert.strictEqual(mortageDetailCreated.capitalRaisingFundUse, options.capitalRaisingFundUse);
assert.strictEqual(mortageDetailCreated.investmentPropertyOccupier, options.investmentPropertyOccupier);
assert.strictEqual(mortageDetailCreated.invstmntPropOcprDetails, options.invstmntPropOcprDetails);
assert.strictEqual(mortageDetailCreated.solicitorName, options.solicitorName);
assert.strictEqual(mortageDetailCreated.solicitorAddress, options.solicitorAddress);
assert.strictEqual(mortageDetailCreated.solicitorPhoneNo, options.solicitorPhoneNo);
assert.strictEqual(mortageDetailCreated.solicitorEmail, options.solicitorEmail);
assert.strictEqual(mortageDetailCreated.intermediaryName, options.intermediaryName);
assert.strictEqual(mortageDetailCreated.intermediaryAddress, options.intermediaryAddress);
assert.strictEqual(mortageDetailCreated.intermediaryPhoneNo, options.intermediaryPhoneNo);
assert.strictEqual(mortageDetailCreated.intermediaryEmail, options.intermediaryEmail);
    });
  });

  describe("#get", () => {
    it("should retrieve a mortageDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(mortageDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), mortageDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"applicationId":`${applicationsCreated._id}`,"requestedLoanAmount":"updated value","requestedRepaymentTerm":"updated value","purposeOfMortage":"updated value","capitalRaisingFundUse":"updated value","investmentPropertyOccupier":"updated value","invstmntPropOcprDetails":"updated value","solicitorName":"updated value","solicitorAddress":"updated value","solicitorPhoneNo":"updated value","solicitorEmail":"updated value","intermediaryName":"updated value","intermediaryAddress":"updated value","intermediaryPhoneNo":"updated value","intermediaryEmail":"updated value"};

    it("should update an existing mortageDetail ", async () => {
      const mortageDetailUpdated = await thisService.Model.findByIdAndUpdate(
        mortageDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(mortageDetailUpdated.applicationId.toString(), options.applicationId.toString());
assert.strictEqual(mortageDetailUpdated.requestedLoanAmount, options.requestedLoanAmount);
assert.strictEqual(mortageDetailUpdated.requestedRepaymentTerm, options.requestedRepaymentTerm);
assert.strictEqual(mortageDetailUpdated.purposeOfMortage, options.purposeOfMortage);
assert.strictEqual(mortageDetailUpdated.capitalRaisingFundUse, options.capitalRaisingFundUse);
assert.strictEqual(mortageDetailUpdated.investmentPropertyOccupier, options.investmentPropertyOccupier);
assert.strictEqual(mortageDetailUpdated.invstmntPropOcprDetails, options.invstmntPropOcprDetails);
assert.strictEqual(mortageDetailUpdated.solicitorName, options.solicitorName);
assert.strictEqual(mortageDetailUpdated.solicitorAddress, options.solicitorAddress);
assert.strictEqual(mortageDetailUpdated.solicitorPhoneNo, options.solicitorPhoneNo);
assert.strictEqual(mortageDetailUpdated.solicitorEmail, options.solicitorEmail);
assert.strictEqual(mortageDetailUpdated.intermediaryName, options.intermediaryName);
assert.strictEqual(mortageDetailUpdated.intermediaryAddress, options.intermediaryAddress);
assert.strictEqual(mortageDetailUpdated.intermediaryPhoneNo, options.intermediaryPhoneNo);
assert.strictEqual(mortageDetailUpdated.intermediaryEmail, options.intermediaryEmail);
    });
  });

  describe("#delete", async () => {
    it("should delete a mortageDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);
await app.service("applications").Model.findByIdAndDelete(applicationsCreated._id);;

      const mortageDetailDeleted = await thisService.Model.findByIdAndDelete(mortageDetailCreated._id);
      assert.strictEqual(mortageDetailDeleted._id.toString(), mortageDetailCreated._id.toString());
    });
  });
});