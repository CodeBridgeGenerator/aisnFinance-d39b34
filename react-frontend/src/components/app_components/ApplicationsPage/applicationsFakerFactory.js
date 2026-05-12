
import { faker } from "@faker-js/faker";
export default (user,count,dealIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
dealId: dealIdIds[i % dealIdIds.length],
status: faker.lorem.sentence(1),
noContactByTelephone: faker.lorem.sentence(1),
noContactByPost: faker.lorem.sentence(1),
noContactByElectronicMedia: faker.lorem.sentence(1),
noContactForMarketResearch: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
