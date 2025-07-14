CREATE DATABASE config_db;
CREATE DATABASE store1_db;
CREATE DATABASE store2_db;

USE config_db;
CREATE TABLE stores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  domain VARCHAR(255) UNIQUE,
  db_name VARCHAR(100),
  theme VARCHAR(100)
);
INSERT INTO stores (domain, db_name, theme) VALUES
  ('store1.localhost', 'store1_db', 'default'),
  ('store2.localhost', 'store2_db', 'modern');

USE store1_db;
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  price DECIMAL(10,2)
);
INSERT INTO products (name, price) VALUES
  ('Red Shirt', 29.99),
  ('Blue Jeans', 49.99);

USE store2_db;
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  price DECIMAL(10,2)
);
INSERT INTO products (name, price) VALUES
  ('Green Hat', 19.99),
  ('Black Socks', 9.99);