const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("applications service", async () => {
  let thisService;
  let applicationCreated;
  let usersServiceResults;
  let users;

  const clientsCreated = await app.service("clients").Model.create({"dealId":"parentObjectId","segment":"new value","currentStage":"new value","status":"new value","clientId":"parentObjectId","userId":"parentObjectId","type":"new value"});
const dealsCreated = await app.service("deals").Model.create({"dealId":"parentObjectId","segment":"new value","currentStage":"new value","status":"new value","clientId":`${clientsCreated._id}`,"userId":"parentObjectId","type":"new value"});

  beforeEach(async () => {
    thisService = await app.service("applications");

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
    assert.ok(thisService, "Registered the service (applications)");
  });

  describe("#create", () => {
    const options = {"dealId":`${dealsCreated._id}`,"segment":"new value","currentStage":"new value","status":"new value","clientId":`${clientsCreated._id}`,"userId":"parentObjectId","type":"new value","noContactByTelephone":"new value","noContactByPost":"new value","noContactByElectronicMedia":"new value","noContactForMarketResearch":"new value"};

    beforeEach(async () => {
      applicationCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new application", () => {
      assert.strictEqual(applicationCreated.dealId.toString(), options.dealId.toString());
assert.strictEqual(applicationCreated.status, options.status);
assert.strictEqual(applicationCreated.noContactByTelephone, options.noContactByTelephone);
assert.strictEqual(applicationCreated.noContactByPost, options.noContactByPost);
assert.strictEqual(applicationCreated.noContactByElectronicMedia, options.noContactByElectronicMedia);
assert.strictEqual(applicationCreated.noContactForMarketResearch, options.noContactForMarketResearch);
    });
  });

  describe("#get", () => {
    it("should retrieve a application by ID", async () => {
      const retrieved = await thisService.Model.findById(applicationCreated._id);
      assert.strictEqual(retrieved._id.toString(), applicationCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"dealId":`${dealsCreated._id}`,"status":"updated value","noContactByTelephone":"updated value","noContactByPost":"updated value","noContactByElectronicMedia":"updated value","noContactForMarketResearch":"updated value"};

    it("should update an existing application ", async () => {
      const applicationUpdated = await thisService.Model.findByIdAndUpdate(
        applicationCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(applicationUpdated.dealId.toString(), options.dealId.toString());
assert.strictEqual(applicationUpdated.status, options.status);
assert.strictEqual(applicationUpdated.noContactByTelephone, options.noContactByTelephone);
assert.strictEqual(applicationUpdated.noContactByPost, options.noContactByPost);
assert.strictEqual(applicationUpdated.noContactByElectronicMedia, options.noContactByElectronicMedia);
assert.strictEqual(applicationUpdated.noContactForMarketResearch, options.noContactForMarketResearch);
    });
  });

  describe("#delete", async () => {
    it("should delete a application", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);;

      const applicationDeleted = await thisService.Model.findByIdAndDelete(applicationCreated._id);
      assert.strictEqual(applicationDeleted._id.toString(), applicationCreated._id.toString());
    });
  });
});