const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("personalDetails service", async () => {
  let thisService;
  let personalDetailCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("personalDetails");

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
    assert.ok(thisService, "Registered the service (personalDetails)");
  });

  describe("#create", () => {
    const options = {"title":"new value","firstName":"new value","middleName":"new value","lastName":"new value","previousSurname":"new value","dateOfBirth":"2026-05-12T01:40:46.124Z","nationality":"new value","countryOfResidence":"new value","residentialAddress":"new value","postCode":"new value","previousAddress":"new value","contactPreference":"new value","phoneHome":"new value","phoneMobile":"new value","email":"new value","capacityRole":"new value","sharesHeldPct":"new value","everBankrupt":"new value","missedRepayments":"new value","ivaCva":"new value","propertyRepossessed":"new value","courtOrder":"new value","brokenCreditAgreement":"new value","associatedBusinessFailure":"new value","adverseCreditDetails":"new value","employerName":"new value","jobTitle":"new value","annuaLSalary":"new value","isEmploymentContinues":true,"signature":"new value","signedDate":"2026-05-12T01:40:46.124Z"};

    beforeEach(async () => {
      personalDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new personalDetail", () => {
      assert.strictEqual(personalDetailCreated.title, options.title);
assert.strictEqual(personalDetailCreated.firstName, options.firstName);
assert.strictEqual(personalDetailCreated.middleName, options.middleName);
assert.strictEqual(personalDetailCreated.lastName, options.lastName);
assert.strictEqual(personalDetailCreated.previousSurname, options.previousSurname);
assert.strictEqual(personalDetailCreated.dateOfBirth.toISOString(), options.dateOfBirth);
assert.strictEqual(personalDetailCreated.nationality, options.nationality);
assert.strictEqual(personalDetailCreated.countryOfResidence, options.countryOfResidence);
assert.strictEqual(personalDetailCreated.residentialAddress, options.residentialAddress);
assert.strictEqual(personalDetailCreated.postCode, options.postCode);
assert.strictEqual(personalDetailCreated.previousAddress, options.previousAddress);
assert.strictEqual(personalDetailCreated.contactPreference, options.contactPreference);
assert.strictEqual(personalDetailCreated.phoneHome, options.phoneHome);
assert.strictEqual(personalDetailCreated.phoneMobile, options.phoneMobile);
assert.strictEqual(personalDetailCreated.email, options.email);
assert.strictEqual(personalDetailCreated.capacityRole, options.capacityRole);
assert.strictEqual(personalDetailCreated.sharesHeldPct, options.sharesHeldPct);
assert.strictEqual(personalDetailCreated.everBankrupt, options.everBankrupt);
assert.strictEqual(personalDetailCreated.missedRepayments, options.missedRepayments);
assert.strictEqual(personalDetailCreated.ivaCva, options.ivaCva);
assert.strictEqual(personalDetailCreated.propertyRepossessed, options.propertyRepossessed);
assert.strictEqual(personalDetailCreated.courtOrder, options.courtOrder);
assert.strictEqual(personalDetailCreated.brokenCreditAgreement, options.brokenCreditAgreement);
assert.strictEqual(personalDetailCreated.associatedBusinessFailure, options.associatedBusinessFailure);
assert.strictEqual(personalDetailCreated.adverseCreditDetails, options.adverseCreditDetails);
assert.strictEqual(personalDetailCreated.employerName, options.employerName);
assert.strictEqual(personalDetailCreated.jobTitle, options.jobTitle);
assert.strictEqual(personalDetailCreated.annuaLSalary, options.annuaLSalary);
assert.strictEqual(personalDetailCreated.isEmploymentContinues, options.isEmploymentContinues);
assert.strictEqual(personalDetailCreated.isEmploymentContinues, options.isEmploymentContinues);
assert.strictEqual(personalDetailCreated.signature, options.signature);
assert.strictEqual(personalDetailCreated.signedDate.toISOString(), options.signedDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a personalDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(personalDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), personalDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"title":"updated value","firstName":"updated value","middleName":"updated value","lastName":"updated value","previousSurname":"updated value","dateOfBirth":"2026-05-12T01:40:46.124Z","nationality":"updated value","countryOfResidence":"updated value","residentialAddress":"updated value","postCode":"updated value","previousAddress":"updated value","contactPreference":"updated value","phoneHome":"updated value","phoneMobile":"updated value","email":"updated value","capacityRole":"updated value","sharesHeldPct":"updated value","everBankrupt":"updated value","missedRepayments":"updated value","ivaCva":"updated value","propertyRepossessed":"updated value","courtOrder":"updated value","brokenCreditAgreement":"updated value","associatedBusinessFailure":"updated value","adverseCreditDetails":"updated value","employerName":"updated value","jobTitle":"updated value","annuaLSalary":"updated value","isEmploymentContinues":false,"signature":"updated value","signedDate":"2026-05-12T01:40:46.124Z"};

    it("should update an existing personalDetail ", async () => {
      const personalDetailUpdated = await thisService.Model.findByIdAndUpdate(
        personalDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(personalDetailUpdated.title, options.title);
assert.strictEqual(personalDetailUpdated.firstName, options.firstName);
assert.strictEqual(personalDetailUpdated.middleName, options.middleName);
assert.strictEqual(personalDetailUpdated.lastName, options.lastName);
assert.strictEqual(personalDetailUpdated.previousSurname, options.previousSurname);
assert.strictEqual(personalDetailUpdated.dateOfBirth.toISOString(), options.dateOfBirth);
assert.strictEqual(personalDetailUpdated.nationality, options.nationality);
assert.strictEqual(personalDetailUpdated.countryOfResidence, options.countryOfResidence);
assert.strictEqual(personalDetailUpdated.residentialAddress, options.residentialAddress);
assert.strictEqual(personalDetailUpdated.postCode, options.postCode);
assert.strictEqual(personalDetailUpdated.previousAddress, options.previousAddress);
assert.strictEqual(personalDetailUpdated.contactPreference, options.contactPreference);
assert.strictEqual(personalDetailUpdated.phoneHome, options.phoneHome);
assert.strictEqual(personalDetailUpdated.phoneMobile, options.phoneMobile);
assert.strictEqual(personalDetailUpdated.email, options.email);
assert.strictEqual(personalDetailUpdated.capacityRole, options.capacityRole);
assert.strictEqual(personalDetailUpdated.sharesHeldPct, options.sharesHeldPct);
assert.strictEqual(personalDetailUpdated.everBankrupt, options.everBankrupt);
assert.strictEqual(personalDetailUpdated.missedRepayments, options.missedRepayments);
assert.strictEqual(personalDetailUpdated.ivaCva, options.ivaCva);
assert.strictEqual(personalDetailUpdated.propertyRepossessed, options.propertyRepossessed);
assert.strictEqual(personalDetailUpdated.courtOrder, options.courtOrder);
assert.strictEqual(personalDetailUpdated.brokenCreditAgreement, options.brokenCreditAgreement);
assert.strictEqual(personalDetailUpdated.associatedBusinessFailure, options.associatedBusinessFailure);
assert.strictEqual(personalDetailUpdated.adverseCreditDetails, options.adverseCreditDetails);
assert.strictEqual(personalDetailUpdated.employerName, options.employerName);
assert.strictEqual(personalDetailUpdated.jobTitle, options.jobTitle);
assert.strictEqual(personalDetailUpdated.annuaLSalary, options.annuaLSalary);
assert.strictEqual(personalDetailUpdated.isEmploymentContinues, options.isEmploymentContinues);
assert.strictEqual(personalDetailUpdated.isEmploymentContinues, options.isEmploymentContinues);
assert.strictEqual(personalDetailUpdated.signature, options.signature);
assert.strictEqual(personalDetailUpdated.signedDate.toISOString(), options.signedDate);
    });
  });

  describe("#delete", async () => {
    it("should delete a personalDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const personalDetailDeleted = await thisService.Model.findByIdAndDelete(personalDetailCreated._id);
      assert.strictEqual(personalDetailDeleted._id.toString(), personalDetailCreated._id.toString());
    });
  });
});