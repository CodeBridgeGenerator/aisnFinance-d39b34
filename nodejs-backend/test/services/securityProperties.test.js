const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("securityProperties service", async () => {
  let thisService;
  let securityPropertyCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("securityProperties");

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
    assert.ok(thisService, "Registered the service (securityProperties)");
  });

  describe("#create", () => {
    const options = {"name":"new value"};

    beforeEach(async () => {
      securityPropertyCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new securityProperty", () => {
      assert.strictEqual(securityPropertyCreated.name, options.name);
    });
  });

  describe("#get", () => {
    it("should retrieve a securityProperty by ID", async () => {
      const retrieved = await thisService.Model.findById(securityPropertyCreated._id);
      assert.strictEqual(retrieved._id.toString(), securityPropertyCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value"};

    it("should update an existing securityProperty ", async () => {
      const securityPropertyUpdated = await thisService.Model.findByIdAndUpdate(
        securityPropertyCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(securityPropertyUpdated.name, options.name);
    });
  });

  describe("#delete", async () => {
    it("should delete a securityProperty", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const securityPropertyDeleted = await thisService.Model.findByIdAndDelete(securityPropertyCreated._id);
      assert.strictEqual(securityPropertyDeleted._id.toString(), securityPropertyCreated._id.toString());
    });
  });
});