// Install needed dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const axios = require("axios");
require("console.table");

// Users keep in mind to align the password and DB name to their unique DB password and name
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Auburn",
    database: ""
  });
  
  // Initialize connection 
  connection.connect(function (err) {
      if (err) throw err;
      console.log(`\n connected as id ${connection.threadId} \n`);
      userInput();
  });

  // Use inquirer to give users a prompt 
function userInput() {
    inquirer.prompt({
        message: "How do you wish to proceed?",
        type: "list",
        choices: [
            "add department",
            "add role",
            "add employee",
            "update employee role",
            "view all departments",
            "view all employees",
            "view all roles",
            "delete department",
            "delete employee",
            "delete role",
            "QUIT"
        ],
        name: "choice"
    })
    .then(answers => {
        // Make sure all information is properly distributed via switch case
        switch (answers.choice) {
            case "add department":
                addDepartment()
                break;

            case "add role":
                addEmployee()
                break;

            case "add employee":
                addRole()
                break;

            case "update employee role":
                deleteDepartment()
                break;

            case "view all departments":
                deleteEmployee()
                break;

            case "view all employees":
                deleteRole()
                break;

            case "view all roles":
                updateEmployeeRole();
                break;

            case "delete department":
                viewRoles()
                break;

            case "delete employee":
                viewEmployees()
                break;

            case "delete role":
                viewDepartments()
                break;

            default:
                connection.end()
                break;
        }
    })
}

// Create department table in DB
function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What department would you like to add?"
    }, ])
    
    .then(function(res) {
        connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function(err, data) {
            if (err) throw err;
            console.log(`Inserted ${res.department} into department database. \n`);
           userInput();
        })
    })
}

// This allows us to add an employee to the table in out DB
function addEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "firstName",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?"
        },
        {
            type: "number",
            name: "roleId",
            message: "What is the employees role ID"
        },
        {
            type: "number",
            name: "managerId",
            message: "What is the employees manager's ID?"
        }
    ]).then(function(res) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) {
            if (err) throw err;
            console.log(`Inserted ${res.firstName} into employee database. \n`);
            userInput();
        })
    })
}

// This allows us to add new roles to the table in our DB
function addRole() {
    inquirer.prompt([
        {
            message: "enter title:",
            type: "input",
            name: "title"
        }, {
            message: "enter salary:",
            type: "number",
            name: "salary"
        }, {
            message: "enter department ID:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (res) {
        connection.query("INSERT INTO role (title, salary, department_id) values (?, ?, ?)", [res.title, res.salary, res.department_id], function (err, data) {
            if (err) throw err;
            console.log(`Inserted ${res.title} into role database. \n`);
            userInput();
        })
    })

}

// Delete department from deparment table
function deleteDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department_id",
        message: "Which department id would you like to delete?"
    }, ]).then(function(res) {
        connection.query('DELETE FROM department WHERE id = ?', [res.department_id], function(err, data) {
            if (err) throw err;
            console.log(`Deleted ${res.department_id} from department database. \n`);
            userInput();
        })
    })
}

// Delete employee from employee table
function deleteEmployee() {
    inquirer.prompt([{
        type: "input",
        name: "employee_id",
        message: "Which employee would you like to delete?"
    }, ]).then(function(res) {
        connection.query('DELETE FROM employee WHERE id = ?', [res.employee_id], function(err, data) {
            if (err) throw err;
            console.log(`Deleted ${res.employee_id} from employee database. \n`);
            userInput();
        })
    })
}

// Delete role from role table
function deleteRole() {
    inquirer.prompt([{
        type: "input",
        name: "role_id",
        message: "Which role would you like to delete?"
    }, ]).then(function(res) {
        connection.query('DELETE FROM role WHERE id = ?', [res.role_id], function(err, data) {
            if (err) throw err;
            console.log(`Deleted ${res.role_id} from role database. \n`);
            userInput();
        })
    })
}

// Update role_id for employees in the DB
function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "Employee to update? (enter employees id number)",
            type: "input",
            name: "id"
        }, {
            message: "enter the new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [response.role_id, response.id], function (err, data) {
            if (err) throw err;
            console.table(data);
            userInput();
        })
    })
}


// User can view all departments in the DB
function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        console.log(`\n`);
        console.table(data);
        userInput();
    })
}

// User can view all employees in the DB
function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        console.log(`\n`);
        console.table(data);
        userInput();
    })
}

// User can view all roles in the DB
function viewRoles() {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        console.log(`\n`);
        console.table(data);
        userInput();
    })
}