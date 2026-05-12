const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("businessDetails service", async () => {
  let thisService;
  let businessDetailCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("businessDetails");

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
    assert.ok(thisService, "Registered the service (businessDetails)");
  });

  describe("#create", () => {
    const options = {"name":"new value"};

    beforeEach(async () => {
      businessDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new businessDetail", () => {
      assert.strictEqual(businessDetailCreated.name, options.name);
    });
  });

  describe("#get", () => {
    it("should retrieve a businessDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(businessDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), businessDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value"};

    it("should update an existing businessDetail ", async () => {
      const businessDetailUpdated = await thisService.Model.findByIdAndUpdate(
        businessDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(businessDetailUpdated.name, options.name);
    });
  });

  describe("#delete", async () => {
    it("should delete a businessDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const businessDetailDeleted = await thisService.Model.findByIdAndDelete(businessDetailCreated._id);
      assert.strictEqual(businessDetailDeleted._id.toString(), businessDetailCreated._id.toString());
    });
  });
});