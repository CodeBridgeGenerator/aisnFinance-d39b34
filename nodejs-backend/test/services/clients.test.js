const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("clients service", async () => {
  let thisService;
  let clientCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("clients");

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
    assert.ok(thisService, "Registered the service (clients)");
  });

  describe("#create", () => {
    const options = {"userId":"parentObjectId","type":"new value","status":"new value"};

    beforeEach(async () => {
      clientCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new client", () => {
      assert.strictEqual(clientCreated.userId.toString(), options.userId.toString());
assert.strictEqual(clientCreated.type, options.type);
assert.strictEqual(clientCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a client by ID", async () => {
      const retrieved = await thisService.Model.findById(clientCreated._id);
      assert.strictEqual(retrieved._id.toString(), clientCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"userId":`${usersCreated._id}`,"type":"updated value","status":"updated value"};

    it("should update an existing client ", async () => {
      const clientUpdated = await thisService.Model.findByIdAndUpdate(
        clientCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(clientUpdated.userId.toString(), options.userId.toString());
assert.strictEqual(clientUpdated.type, options.type);
assert.strictEqual(clientUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a client", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const clientDeleted = await thisService.Model.findByIdAndDelete(clientCreated._id);
      assert.strictEqual(clientDeleted._id.toString(), clientCreated._id.toString());
    });
  });
});