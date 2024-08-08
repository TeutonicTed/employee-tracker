DO $$
  DECLARE
      -- Any variable declarations would go here
  BEGIN
      -- Begin transaction

INSERT INTO departments (department_name)
VALUES ('Marketing'),
       ('Accounting'),
       ('Project Management'),
       ('Human Resources'),
       ('Logistics');

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, 'Marketing Director', 50000, 1),
       (2, 'Accountant', 70000, 2),
       (3, 'Project Manager', 80000, 3),
       (4, 'HR Director', 50000, 4),
       (5, 'Supply Chain Analyst', 60000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Ryan', 'George', 1, NULL),
       ('John', 'Baylor', 2, 3),
       ('Mark', 'Peterson', 3, 4),
       ('Melissa', 'Grisham', 4, 1),
       ('Jacob', 'Nash', 5, 3);

EXCEPTION
WHEN OTHERS THEN
    RAISE NOTICE 'An error occurred: %', SQLERRM; -- Log the error
    ROLLBACK; -- Explicitly roll back changes in case of error
END $$;