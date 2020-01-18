var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table")
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "babypunky1322",
  database: "employee_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "create",
      type: "list",
      message: "Would you like to create a [Department] a [Role] or [Employee] or would you like to [View] one of the following?",
      choices: ["Department", "Role", "Employee", "View"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.create === "Department") {
        addDepartment();
      }
      else if(answer.create === "Role") {
        addRole();
      } 
      else if(answer.create === "Employee") {
        addEmployee();
      }
      else if(answer.create === "View") {
        view();
      }
      else{
        connection.end();
      }
    });
}

// function to handle posting new items up for auction
function addDepartment() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "division",
        type: "input",
        message: "What is the name of the department you'd like to add?",
        // validate: function(value) {
        //   if (isNaN(value) === false) {
        //     return true;
        //   }
        //   return false;
        // }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.division
        },
        function(err) {
          if (err) throw err;
          console.log("Your department was added successfully!");
          // re-prompt the user
          start();
        }
      );
    });
}

function addRole() {
 
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the role you'd like to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the role you'd like to add?",
      },
      {
        name: "departmentId",
        type: "input",
        message: "What is the departmentId of the role you'd like to add?",
        // validate: function(value) {
        //   if (isNaN(value) === false) {
        //     return true;
        //   }
        //   return false;
        // }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.department,
          salary: answer.salary,
          department_id: answer.departmentId
        },
        function(err) {
          if (err) throw err;
          console.log("Your role was added successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

function addEmployee() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "What is the first name of the employee you'd like to add?",
      },
      {
        name: "last",
        type: "input",
        message: "What is the last name of the employee you'd like to add?",
      },
      {
        name: "roleId",
        type: "input",
        message: "What is the role id of the employee you'd like to add?"
      },
      {
        name: "managerId",
        type: "input",
        message: "What is the manager id of the employee you'd like to add?",
        // validate: function(value) {
        //   if (isNaN(value) === false) {
        //     return true;
        //   }
        //   return false;
        // }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first,
          last_name: answer.last,
          role_id: answer.roleId,
          manager_id: answer.managerId
        },
        function(err) {
          if (err) throw err;
          console.log("Your employee was added successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

function view() {
  inquirer
    .prompt({
      name: "table",
      type: "list",
      message: "Which table would you like to view?",
      choices: ["Department", "Role", "Employee", ]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.table === "Department") {
        viewDepartment();
      }
      else if(answer.table === "Role") {
        viewRole();
      } 
      else if(answer.table === "Employee") {
        viewEmployee();
      }
      else{
        connection.end();
      }
    });
}

function viewDepartment() {
  connection.query("SELECT * FROM department", function(err,res){
    if (err) throw err;
    console.table(res);
    start();
  })
};

function viewRole() {
  connection.query("SELECT * FROM role", function(err,res){
    if (err) throw err;
    console.table(res);
    start();
  })
};

function viewEmployee() {
  connection.query("SELECT * FROM employee", function(err,res){
    if (err) throw err;
    console.table(res);
    start();
  })
};