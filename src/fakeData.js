import faker from "faker";

function getData(dataLimit = 20) {
  return Array.from({ length: dataLimit }).map(e => ({
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email()
  }));
}

export default getData;
