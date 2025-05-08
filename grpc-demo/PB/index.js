const fs = require('fs');
const employees = [];

employees.push({
  name: "Kamal",
  salary: 2000,
  id: 1001,
});

const ahmed = {
  name: "Ahmed",
  salary: 5000,
  id: 1002,
};

employees.push(ahmed);

const rick = {
  name: "Rick",
  salary: 2000,
  id: 1002,
};

employees.push(rick);


fs.writeFileSync("employees.json", JSON.stringify(employees));

console.log(employees);
console.log(JSON.stringify(employees));

