
    module.exports = function (app) {
        const modelName = "deals";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            segment: { type:  String , comment: "Segment, p, false, true, true, true, true, true, true, , , , ," },
currentStage: { type:  String , comment: "Current Stage, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
clientId: { type: Schema.Types.ObjectId, ref: "clients", comment: "Client Id, dropdown, false, true, true, true, true, true, true, clients, clients, one-to-one, userId," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };