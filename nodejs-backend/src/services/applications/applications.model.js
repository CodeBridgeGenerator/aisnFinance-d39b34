
    module.exports = function (app) {
        const modelName = "applications";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            dealId: { type: Schema.Types.ObjectId, ref: "deals", comment: "Deal Id, dropdown, false, true, true, true, true, true, true, deals, deals, one-to-one, clientId," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
noContactByTelephone: { type:  String , comment: "No Contact By Telephone, p, false, true, true, true, true, true, true, , , , ," },
noContactByPost: { type:  String , comment: "No Contact By Post, p, false, true, true, true, true, true, true, , , , ," },
noContactByElectronicMedia: { type:  String , comment: "No Contact By Electronic Media, p, false, true, true, true, true, true, true, , , , ," },
noContactForMarketResearch: { type:  String , comment: "No Contact For Market Research, p, false, true, true, true, true, true, true, , , , ," },
, comment: "Application Documents, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };