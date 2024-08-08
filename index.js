// Main Index page for the Employee Tracker
const { inquirer } = require('./inquirer');
const { Pool } = require('pg');

const pool = new Pool({
  database: 'employees_db',
  user: 'nashpeterson',
  password: 'Gary1234',
  host: 'localhost',
});

async function main() {
  try {
    // Connect to the database
    await pool.connect();
    
    // Prompt the user for input using Inquirer
    const userData = await inquirer;
    
    // // Add an employee to the database
    // const addedEmployee = await addEmployee(userData);
    
    // console.log('Employee added successfully:', addedEmployee);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the database connection
    await pool.end();
  }
}

main();