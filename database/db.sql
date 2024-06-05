CREATE TABLE product(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);