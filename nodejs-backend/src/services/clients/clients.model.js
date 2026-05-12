
    module.exports = function (app) {
        const modelName = "clients";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            userId: { type: Schema.Types.ObjectId, ref: "users", comment: "User Id, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },
type: { type:  String , comment: "Type, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };