const employees = require('../model/employees.json');

const getAllEmployees = (req, res) => {
    res.json(employees);
};

const createNewEmployee = (req, res) => {
    const { firstname, lastname } = req.body || {};
    if (!firstname || !lastname) {
        return res.status(400).json({ message: 'First name and last name are required.' });
    }
    const newEmployee = {
        id: employees.length ? employees[employees.length - 1].id + 1 : 1,
        firstname,
        lastname
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
};

const updateEmployee = (req, res) => {
    const id = parseInt(req.body?.id, 10);
    const { firstname, lastname } = req.body || {};
    const employee = employees.find(emp => emp.id === id);
    if (!employee) return res.status(404).json({ message: `No employee matches ID ${id}.` });
    if (firstname) employee.firstname = firstname;
    if (lastname) employee.lastname = lastname;
    res.json(employee);
};

const deleteEmployee = (req, res) => {
    const id = parseInt(req.body?.id, 10);
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) return res.status(404).json({ message: `No employee matches ID ${id}.` });
    const deleted = employees.splice(index, 1);
    res.json(deleted[0]);
};

const getEmployee = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const employee = employees.find(emp => emp.id === id);
    if (!employee) return res.status(404).json({ message: `No employee matches ID ${id}.` });
    res.json(employee);
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
};