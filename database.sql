CREATE DATABASE appointment_db;
USE appointment_db;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('customer','admin') DEFAULT 'customer'
);

CREATE TABLE services(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    duration INT,
    price DECIMAL(10,2)
);

CREATE TABLE bookings(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    service_id INT,
    booking_date DATETIME,
    status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);
