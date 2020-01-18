DROP DATABASE IF EXISTS employee_db
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(30) NULL

);

CREATE TABLE role(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(45) NULL,
  salary DECIMAL,
  department_id INT
);

CREATE TABLE employee(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  role_id INT NULL,
  manager_id INT NULL
);


