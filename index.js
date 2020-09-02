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