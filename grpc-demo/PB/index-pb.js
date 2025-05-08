const Schema = require('./employees_pb');
const fs = require('fs');

const kimya = new Schema.Employee();

kimya.setId(1001);
kimya.setName("Kimya");
kimya.setSalary(2000);

const ali = new Schema.Employee();
ali.setId(1002);
ali.setName("Ali");
ali.setSalary(5000);

const rick = new Schema.Employee();
rick.setId(1003);
rick.setName("Rick");
rick.setSalary(2000);

const employees = new Schema.Employees();

employees.addEmployees(kimya);
employees.addEmployees(ali);
employees.addEmployees(rick);

console.log("binary", employees.serializeBinary());

fs.writeFileSync("employees.bin", employees.serializeBinary());


const employees2 = Schema.Employees.deserializeBinary(
  fs.readFileSync("employees.bin")
);

console.log(JSON.stringify(employees2.toObject()));
