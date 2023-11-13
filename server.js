//require mysql2 and inquirer
const mysql2 = require('mysql2');
const inquirer = require('inquirer');

//create the connection to the mysql database
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'passowrd',
    database: 'employee_tracker_db',
},
console.log("connected to the employee_tracker_db database")
);

//function to add a department
const addDepartment = (name) => {
    return db.query(
        'INSERT INTO department (name) VALUES (?)', 
        [name]
        )
    .then(() => 'Department added successfully.')
    .catch((e) => {
        throw e;
    });
;}

//function to view all of the departments
const viewDepartments = () => {
    return db.query('SELECT * FROM department');
};

//function to add a role
const addRole = (title, salary, departmentID) => {
    return db.query(
        'Insert INTO role (title, salary, department_id) VALUES (?,?,?)',
        [title,salary,departmentID]
    );
};

//function to view roles
const viewRoles = () => {
    return db.query('SELECT * FROM role');
};

//function to add an employee
const addEmployee = (firstName, lastName, roleID) => {
    return db.query(
        'INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)',
        [firstName,lastName, roleID]
    );
}

//function to view employees
const viewEmployees = () => {
    return db.query('SELECT * FROM employee');
}

//function to update an employees role
const updateRole = (employeeID, newID) => {
    return db.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [newID, employeeID]
    );
}

//main function that will run the inquirer prompts
const main = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'View departments',
                'view employees',
                'view roles',
                'add department',
                'add employee',
                'add role',
                'update role',
                'Exit'
            ]
        }
    ]) 
}

main();
