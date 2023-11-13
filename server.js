//require mysql2 and inquirer
const mysql2 = require('mysql2');
const inquirer = require('inquirer');

//create the connection to the mysql database
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_tracker_db',
});

db.connect((e)=> {
    if (e) {
        console.error("error connecting to employee_tracker_db");
        return;
    }
    console.log("connected to employee_tracker_db!")
    main();
})

//function to add a department
const addDepartment = (name) => {
    db.query(
        'INSERT INTO department (name) VALUES (?)', 
        [name], function(e, addDept){
            if(e){
                console.error("error adding department. ", e);
            }
            else{
                console.log("Successfully added department!");
                main();
            }
        }
    );   
};

//function to view all of the departments
const viewDepartments = async () => {
    db.query('SELECT * FROM department', function(e, deptData){
        if(e){
            console.error("Error viewing departments. ", e);
            
        }
        else{
            console.table(deptData);
            main();
        }
    });
};

//function to add a role
const addRole = (title, salary, departmentID) => {
    db.query(
        'Insert INTO role (title, salary, department_id) VALUES (?,?,?)',
        [title,salary,departmentID], function(e, addrl){
            if(e){
                console.error("error adding role. ", e);
            }
            else{
                console.log("Successfully added role!");
                main();
            }
        }
    );
};

//function to view roles
const viewRoles = () => {
    db.query('SELECT * FROM role', function(e, roleData){
        if(e){
            console.error("Error viewing roles. ", e);
            
        }
        else{
            console.table(roleData);
            main();
        }
    });
};

//function to add an employee
const addEmployee = (firstName, lastName, roleID) => {
    db.query(
        'INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)',
        [firstName,lastName,roleID], function(e, addData){
            if(e){
                console.error("error adding employee. ", e);
            }
            else{
                console.log("Successfully added employee!");
                main();
            }
        }
    );
};

//function to view employees
const viewEmployees = () => {
    db.query('SELECT * FROM employee', function(e, employeeData){
        if(e){
            console.error("Error viewing employees. ", e);
            
        }
        else{
            console.table(employeeData);
            main();
        }
    });
};

//function to update an employees role
const updateRole = (employeeID, newID) => {
    return db.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [newID, employeeID]
    ).then(()=>"Role successfully updated")
    .catch((e)=>{
        throw e;
    });
};

//main function that will run the inquirer prompts
const main = async () => {
    const answers = await inquirer.prompt([
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
    ]);
        switch(answers.options){
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
                const deptName = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Enter the name of the deparment: '
                    }
                ]);
                addDepartment(deptName.name);
                break;
            
            //prompts the user for the name of the employee then adds to database
            case 'add employee':
                const employeeName = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstname',
                        message: 'Enter the first name of the employee: '
                    },
                    {
                        type: 'input',
                        name: 'lastname',
                        message: 'Enter the last name of the employee: '
                    },
                    {
                        type: 'input',
                        name: 'role',
                        message: 'Enter the role id of the employee: '
                    },
                    
                ]);
                addEmployee(employeeName.firstname, employeeName.lastname, employeeName.role);
                break;
            
            //prompts the user for the name of the role then adds to database
            case 'add role':
                const roleName = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Enter the name of the role: '
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter the salary of the role: '
                    },
                    {
                        type: 'input',
                        name: 'roleID',
                        message: 'Enter the id of the role: '
                    }
                ]);
                addRole(roleName.name, roleName.salary, roleName.roleID);
                break;
            
            //prompts the user for the id of the employee and the new role id and then updates the database
            case 'update role':
                const updateInfo = await inquirer.prompt([
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
                ]);
                updateRole(parseInt(updateInfo.employeeID), parseInt(updateInfo.newID));
                break;
            default:
                console.log('ytho');
                break;
        };
        console.log("BRUH");
    
    };


