INSERT INTO department (id, name)
VALUES  (1, "Sales"),
        (2, "Accounting"),
        (3, "Human Resources"),
        (4, "Management");

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Manager", 100000, 4),
        (2, "HR_Rep", 45000, 3),
        (3, "Accountant", 55000, 2),
        (4, "Sales_Associate", 30000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Grant", "W", 1, null),
        (2, "Shane", "C", 3, 1),
        (3, "Zeek", "D", 4, 1);
