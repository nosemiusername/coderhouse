DROP DATABASE IF EXISTS prueba;
CREATE DATABASE prueba;

USE prueba;

CREATE table items (
	nombre varchar(255) NOT NULL ,
	categoria varchar(255) NOT NULL,
	stock INT UNSIGNED,
	id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(id)
);

INSERT INTO items (nombre, categoria, stock) values 
('Fideos','Harina',20), ('Leche', 'Lácteos', 30), ('Crema', 'Lácteos', 15); 


SELECT * FROM items;

DELETE FROM items WHERE id = 1;

UPDATE items SET stock = 45 WHERE id = 2;