
    module.exports = function (app) {
        const modelName = "personal_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            title: { type:  String , comment: "Title, p, false, true, true, true, true, true, true, , , , ," },
firstName: { type:  String , comment: "First Name, p, false, true, true, true, true, true, true, , , , ," },
middleName: { type:  String , comment: "Middle Name, p, false, true, true, true, true, true, true, , , , ," },
lastName: { type:  String , comment: "Last Name, p, false, true, true, true, true, true, true, , , , ," },
previousSurname: { type:  String , comment: "Previous Surname, p, false, true, true, true, true, true, true, , , , ," },
dateOfBirth: { type: Date, comment: "Date Of Birth, p_calendar, false, true, true, true, true, true, true, , , , ," },
nationality: { type:  String , comment: "Nationality, p, false, true, true, true, true, true, true, , , , ," },
countryOfResidence: { type:  String , comment: "Country Of Residence, p, false, true, true, true, true, true, true, , , , ," },
residentialAddress: { type:  String , comment: "Residential Address, p, false, true, true, true, true, true, true, , , , ," },
postCode: { type:  String , comment: "Post Code, p, false, true, true, true, true, true, true, , , , ," },
previousAddress: { type:  String , comment: "Previous Address, p, false, true, true, true, true, true, true, , , , ," },
contactPreference: { type:  String , comment: "ContactPreference, p, false, true, true, true, true, true, true, , , , ," },
phoneHome: { type:  String , comment: "Phone Home, p, false, true, true, true, true, true, true, , , , ," },
phoneMobile: { type:  String , comment: "Phone Mobile, p, false, true, true, true, true, true, true, , , , ," },
email: { type:  String , comment: "Email, p, false, true, true, true, true, true, true, , , , ," },
capacityRole: { type:  String , comment: "Capacity Role, p, false, true, true, true, true, true, true, , , , ," },
sharesHeldPct: { type:  String , comment: "Shares Held Pct, p, false, true, true, true, true, true, true, , , , ," },
everBankrupt: { type:  String , comment: "Ever Bankrupt, p, false, true, true, true, true, true, true, , , , ," },
missedRepayments: { type:  String , comment: "missedRepayments, p, false, true, true, true, true, true, true, , , , ," },
ivaCva: { type:  String , comment: "ivaCva, p, false, true, true, true, true, true, true, , , , ," },
propertyRepossessed: { type:  String , comment: "propertyRepossessed, p, false, true, true, true, true, true, true, , , , ," },
courtOrder: { type:  String , comment: "courtOrder, p, false, true, true, true, true, true, true, , , , ," },
brokenCreditAgreement: { type:  String , comment: "brokenCreditAgreement, p, false, true, true, true, true, true, true, , , , ," },
associatedBusinessFailure: { type:  String , comment: "associatedBusinessFailure, p, false, true, true, true, true, true, true, , , , ," },
adverseCreditDetails: { type:  String , comment: "adverseCreditDetails, p, false, true, true, true, true, true, true, , , , ," },
employerName: { type:  String , comment: "employerName, p, false, true, true, true, true, true, true, , , , ," },
jobTitle: { type:  String , comment: "jobTitle, p, false, true, true, true, true, true, true, , , , ," },
annuaLSalary: { type:  String , comment: "Annua lSalary, p, false, true, true, true, true, true, true, , , , ," },
isEmploymentContinues: { type: Boolean, required: false, comment: "Is Employment Continues, p_boolean, false, true, true, true, true, true, true, , , , ," },
signature: { type:  String , comment: "Signature, p, false, true, true, true, true, true, true, , , , ," },
signedDate: { type: Date, comment: "Signed Date, p_date, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };