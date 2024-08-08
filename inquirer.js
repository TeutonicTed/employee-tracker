const inquirer = require("inquirer");
const { getAllEmployees, addEmployeeData, getAllDepartments, addDepartment, getAllRoles, addRoleData, updateEmployeeData } = require("./queries")
const cTable = require("console.table")

// Initial menu options from inquirer statement
const menuOptions = [
  "View All Employees",
  "View All Roles",
  "View All Departments",
  "Add An Employee",
  "Add A Department",
  "Add A Role",
  "Update An Employee Role"
]

// Main menu for the employee tracker, if statements for each menu branch
async function start() {
  const result = await inquirer.prompt([
    {
      type: "list",
      name: "menuOption",
      choices: menuOptions
    }
  ])

  if (result.menuOption === "View All Employees") {
    return displayEmployees();

  } else if (result.menuOption === "View All Roles"){
    return displayRoles();
  
  } else if (result.menuOption === "View All Departments"){
      return displayDepartments();

    } else if (result.menuOption === "Add An Employee"){
      return addEmployee()

    } else if (result.menuOption === "Add A Department"){
      return addDepartmentData();

    } else if (result.menuOption === "Add A Role"){
      return addRole();

    } else if (result.menuOption === "Update An Employee Role"){
      return updateEmployee();
    }
    addEmployee();
  } 

// View All Employees query
async function displayEmployees() {
  const data = await getAllEmployees()
  console.table(data)
  start();
}


// Add An Employee inquirer string
async function addEmployee() {
  const roles = await getAllRoles()
  const listOfRoles = roles.map(roles => ({
    name: roles.title,
    value: roles.id
    
  }))
  const managers = await getAllEmployees()
  const listOfManagers = managers.map(manager => ({
    name: manager.first_name + " " + manager.last_name,
    value: manager.employee_id
    
  }))
  
  const result = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the employee's last name?"
    },
    {
      type: "list",
      name: "role_id",
      message: "What is your role?",
      choices: listOfRoles
    },
    {
      type: "list",
      name: "manager_id",
      message: "What is your manager?",
      choices: listOfManagers
    },
  ])
  
  addEmployeeData(result)
  displayEmployees()
}

// View All Departments query
async function displayDepartments() {
  const data = await getAllDepartments()
  console.table(data)
  start();
}

// Add A Department inquirer string
async function addDepartmentData(){
  const result = await inquirer.prompt([
    {
      type: "input",
      name: "department_name",
      message: "What is your department?"
    }
  ])
  addDepartment(result)
  displayDepartments()
}

// View All Roles query
async function displayRoles() {
  const data = await getAllRoles()
  console.table(data)
  start();
}

// Add A Role inquirer string
async function addRole(){
  const department = await getAllDepartments()
  const listOfDepartments = department.map(department => 
    ({
    name: department.department_name,
    value: department.id
    }
    ))
  
    const result = await inquirer.prompt([
    {
      type: "list",
      name: "department_id",
      message: "What is your department?",
      choices: listOfDepartments
    },
    {
      type: "input",
      name: "title",
      message: "What is your title?"
    },
    {
      type: "input",
      name: "salary",
      message: "What is your salary?"
    }
  ])
  addRoleData(result)
  displayRoles()
}

// Update An Employee Role inquirer string
async function updateEmployee() {
  const roles = await getAllRoles()
  const listOfRoles = roles.map(roles => ({
    name: roles.title,
    value: roles.id
    
  }))
  const employees = await getAllEmployees()
  const listOfEmployees = employees.map(employee => ({
    name: employee.first_name + " " + employee.last_name,
    value: employee.employee_id
    
  }))
  
  const result = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Who is the employee?",
      choices: listOfEmployees
    },
    {
      type: "list",
      name: "role_id",
      message: "What is your new role?",
      choices: listOfRoles
    }
  ])
  
  updateEmployeeData(result)
  displayEmployees()
}



start();