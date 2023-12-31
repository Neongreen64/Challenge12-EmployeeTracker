/*Creates employe_tracker_db database*/
CREATE DATABASE employee_tracker_db;

/*Selects employee_tracker_db*/
USE employee_tracker_db;


/*Create department table*/
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);


/*Create role table*/
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(15,2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);


/*Create employee table*/
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);