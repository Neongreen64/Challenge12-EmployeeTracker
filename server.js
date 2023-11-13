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
                'view departments',
                'view employees',
                'view roles',
                'add department',
                'add employee',
                'add role',
                'update role',
                'exit'
            ]
        }
    ])
    .then((answers) => {
        //switch statement to call a function based on the user's input.
        switch(answers.choices){
            case 'view departments':
                viewDepartments();
                break;
            case 'view employees':
                viewEmployees();
                break;
            case 'view roles':
                viewRoles();
                break;
            
            //prompts the user for the name of the department then adds to database
            case 'add department':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Enter the name of the deparment: '
                    }
                ])
                .then((answers) => {
                    addDepartment(answers.name);
                });
                break;
            
            //prompts the user for the name of the employee then adds to database
            case 'add employee':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Enter the name of the employee: '
                    }
                ])
                .then((answers) => {
                    addEmployee(answers.name);
                });
                break;
            
            //prompts the user for the name of the role then adds to database
            case 'add role':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Enter the name of the role: '
                    }
                ])
                .then((answers)=>{
                    addRole(answers.name);
                });
                break;
            
            //prompts the user for the id of the employee and the new role id and then updates the database
            case 'update role':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'employeeID',
                        message: 'Enter the employee id: ',
                    },
                    {
                        type: 'input',
                        name: 'newID',
                        message: 'Enter the new role id: ',
                    },
                ])
                .then((answers) => {
                    updateRole(parseInt(answers.employeeID), parseInt(answers.newID));
                });
                break;
        };
    }); 
};

main();
