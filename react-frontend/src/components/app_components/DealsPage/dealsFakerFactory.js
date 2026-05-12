
import { faker } from "@faker-js/faker";
export default (user,count,clientIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
segment: faker.lorem.sentence(1),
currentStage: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),
clientId: clientIdIds[i % clientIdIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
