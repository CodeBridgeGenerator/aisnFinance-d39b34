const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("deals service", async () => {
  let thisService;
  let dealCreated;
  let usersServiceResults;
  let users;

  const clientsCreated = await app.service("clients").Model.create({"segment":"new value","currentStage":"new value","status":"new value","clientId":"parentObjectId","userId":"parentObjectId","type":"new value"});

  beforeEach(async () => {
    thisService = await app.service("deals");

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
    assert.ok(thisService, "Registered the service (deals)");
  });

  describe("#create", () => {
    const options = {"segment":"new value","currentStage":"new value","status":"new value","clientId":`${clientsCreated._id}`,"userId":"parentObjectId","type":"new value"};

    beforeEach(async () => {
      dealCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new deal", () => {
      assert.strictEqual(dealCreated.segment, options.segment);
assert.strictEqual(dealCreated.currentStage, options.currentStage);
assert.strictEqual(dealCreated.status, options.status);
assert.strictEqual(dealCreated.clientId.toString(), options.clientId.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a deal by ID", async () => {
      const retrieved = await thisService.Model.findById(dealCreated._id);
      assert.strictEqual(retrieved._id.toString(), dealCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"segment":"updated value","currentStage":"updated value","status":"updated value","clientId":`${clientsCreated._id}`};

    it("should update an existing deal ", async () => {
      const dealUpdated = await thisService.Model.findByIdAndUpdate(
        dealCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(dealUpdated.segment, options.segment);
assert.strictEqual(dealUpdated.currentStage, options.currentStage);
assert.strictEqual(dealUpdated.status, options.status);
assert.strictEqual(dealUpdated.clientId.toString(), options.clientId.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a deal", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);;

      const dealDeleted = await thisService.Model.findByIdAndDelete(dealCreated._id);
      assert.strictEqual(dealDeleted._id.toString(), dealCreated._id.toString());
    });
  });
});