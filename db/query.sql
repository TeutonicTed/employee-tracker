

SELECT employees.id AS employee_id, employees.first_name, employees.last_name, 
       roles.title, departments.department_name, roles.salary, 
       CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM roles
INNER JOIN employees ON roles.id = employees.role_id
INNER JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees manager ON employees.manager_id = manager.id;
