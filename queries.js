
const { Pool } = require('pg');

// Connect to database
const pool = new Pool(
    {
      // Enter PostgreSQL username
      user: 'nashpeterson',
      // Enter PostgreSQL password
      password: 'Gary1234',
      host: 'localhost',
      database: 'employees_db'
  },
  console.log('Connected to the employees_db database!')
  )
  
  pool.connect();

// query reference for View All Employee  
async function getAllEmployees(){
  // select statement
  // returns back the result
  const result = await pool.query(`SELECT employees.id AS employee_id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM roles INNER JOIN employees ON roles.id = employees.role_id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON employees.manager_id = manager.id;`);
  return result.rows;
}

// query reference for Add An Employee 
async function addEmployeeData(data) {
  console.log('Data received:', data);

  const { first_name, last_name, role_id, manager_id } = data; 
  
  try {
    const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
    const values = [first_name, last_name, role_id, manager_id];
    const result = await pool.query(query, values);
      
  } catch (error) {
      console.error('Error adding employee:', error);
      throw error; // Re-throw the error to handle it at a higher level
  }
}

// query reference for Add A Department
async function addDepartment(data) {
    const { department_name } = data;
  console.log(data)
    if (!department_name) {
        throw new Error('Department name is required');
    }

    const result = await pool.query('INSERT INTO departments (department_name) VALUES ($1) RETURNING *', [department_name]);
    return result.rows[0];
}

// query reference for View All Departments
async function getAllDepartments(){
  const result = await pool.query('SELECT * FROM departments');
  return result.rows
}

// query reference for View All Roles
async function getAllRoles(){
  const result = await pool.query('SELECT * FROM roles');
  return result.rows
}

// query reference for Add A Role
async function addRoleData(data) {
  console.log('Data received:', data);

  const { title, salary, department_id } = data; 
  
  try {
    const query = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)';
    const values = [title, salary, department_id];
    const result = await pool.query(query, values);
    console.log(result)  

  } catch (error) {
      console.error('Error adding role:', error);
      throw error; // Re-throw the error to handle it at a higher level
  }
}

// query reference for Udpdate An Employee Role
async function updateEmployeeData(data) {
  console.log('Data received:', data);

  const { id, role_id } = data; 
  
  try {
    const query = 'UPDATE employees SET role_id = $1 where id = $2';
    const values = [ role_id, id];
    const result = await pool.query(query, values);
      
  } catch (error) {
      console.error('Error adding employee:', error);
      throw error; // Re-throw the error to handle it at a higher level
  }
}


module.exports = {
  getAllEmployees,
  addEmployeeData,
  getAllDepartments,
  addDepartment,
  getAllRoles,
  addRoleData,
  updateEmployeeData
}