# 📅 BookEasy – Appointment Booking Platform  
A modern, fully interactive appointment booking web application built using **HTML, CSS, JavaScript, PHP, and MySQL**.  
This system provides a smooth user experience with separate modules for **Customers** and **Admins**, complete booking flow, and a stylish dynamic UI.

---

## 🚀 Features

### ⭐ Customer Module
- Browse available services  
- Select service, date, and time  
- Fully interactive calendar & time slot selection  
- Add special requests for appointments  
- Book appointments in a smooth animated interface  
- View confirmation instantly  

### ⭐ Admin Module
- View all bookings with real-time updates  
- Check total bookings, pending, confirmed, and cancelled  
- Revenue calculation  
- Booking status management (confirm/cancel/edit)  
- Dynamic dashboard UI  

### ⭐ User Authentication
- Register new users  
- Login & session-based access (to be connected with backend)  
- Form validation & clean UI  

### ⭐ UI/UX Highlights
- Modern Material-style interface  
- Dynamic service selection  
- Responsive & mobile-friendly  
- Toast notifications for success/error/warnings  
- Smooth animations & interactive elements  
- Sticky header navigation  

---

## 🛠️ Tech Stack

### **Frontend**
- HTML5  
- CSS3 (Custom styling + animations)  
- JavaScript (Vanilla JS, no frameworks)  
- FontAwesome icons  

### **Backend**
- PHP (REST-style endpoints)  
- MySQL (Bookings, Services, Users)  

### **Architecture**
- Modular folder structure  
- Clean separation of frontend & backend  
- Reusable components  
- API-based communication  

---

## 📂 Project Structure


project/
│── index.html 
│── styles.css
│── script.js 
│── api/
│ ├── auth/
│ │ ├── login.php
│ │ └── register.php
│ ├── bookings/
│ │ ├── create.php
│ │ ├── list_user.php
│ │ └── list_admin.php
│ └── services/
│ └── list.php
│── config/
│ └── db.php 
│── database.sql


⭐ Future Enhancements

-JWT authentication
-Staff assignment & role-based access
-Email/SMS notifications
-Online payment integration
-Export bookings (CSV/PDF)
-PWA offline support
-Full mobile app version
