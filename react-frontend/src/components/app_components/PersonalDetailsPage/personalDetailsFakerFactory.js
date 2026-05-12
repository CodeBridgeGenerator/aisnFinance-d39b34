
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
title: faker.date.past(""),
firstName: faker.date.past(""),
middleName: faker.date.past(""),
lastName: faker.date.past(""),
previousSurname: faker.date.past(""),
dateOfBirth: faker.date.past(""),
nationality: faker.date.past(""),
countryOfResidence: faker.date.past(""),
residentialAddress: faker.date.past(""),
postCode: faker.date.past(""),
previousAddress: faker.date.past(""),
contactPreference: faker.date.past(""),
phoneHome: faker.date.past(""),
phoneMobile: faker.date.past(""),
email: faker.date.past(""),
capacityRole: faker.date.past(""),
sharesHeldPct: faker.date.past(""),
everBankrupt: faker.date.past(""),
missedRepayments: faker.date.past(""),
ivaCva: faker.date.past(""),
propertyRepossessed: faker.date.past(""),
courtOrder: faker.date.past(""),
brokenCreditAgreement: faker.date.past(""),
associatedBusinessFailure: faker.date.past(""),
adverseCreditDetails: faker.date.past(""),
employerName: faker.date.past(""),
jobTitle: faker.date.past(""),
annuaLSalary: faker.date.past(""),
isEmploymentContinues: faker.date.past(""),
signature: faker.date.past(""),
signedDate: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
