# Xpenso - Expense Management System

Xpenso is a web-based Expense Management System that allows organizations to track, manage, and approve employee expenses efficiently. It features a role-based access control system with dedicated dashboards for Employees, Managers, and Administrators.

## 🚀 Features

### 👤 Employee Role
- **Expense Submission:** Employees can easily submit new expense requests with details such as category, amount, date, payment method, remarks, and descriptions.
- **Expense Tracking:** View a list of submitted expenses and their current status (Draft, Waiting Approval, Approved, Rejected).
- **Statistics Dashboard:** Quick overview of total amounts to submit, waiting for approval, and approved.

### 👔 Manager Role
- **Manager Dashboard:** A centralized view of all pending expense requests from the team.
- **Approval Workflow:** Managers can review and either **Approve** or **Reject** pending expenses.
- **Pending Statistics:** View total pending amount and the number of pending requests at a glance.

### 🛡️ Admin Role
- **User Management Dashobard:** Full control over the system's users.
- **Add New Users:** Create new user accounts and assign them to specific roles and departments.
- **Edit Roles:** Change user roles (Employee, Manager, Admin).
- **Status Management:** Activate or deactivate user accounts.
- **Delete Users:** Remove users from the system when necessary.

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3
- **Logic:** Vanilla JavaScript (`dashboard.js` handles data mocking and role switching logic)
- **Architecture:** Client-side rendering (Data is currently mocked within the JavaScript application for demonstration purposes)

## 📁 Project Structure

```
expense-manager/
├── index.html              # Sign-in page
├── signup.html             # Sign-up page for new accounts
├── script.js               # Logic for login/signup pages
├── style.css               # Styling for the login page
├── signup.css              # Styling for the signup page
└── Dashboard/              # Main application directory
    ├── dashboard.html      # The central dashboard interface
    ├── dashboard.js        # Core logic for roles, expenses, and users
    └── dashboard.css       # Styling for the dashboard interface
```

## 💻 Getting Started

1. **Clone or Download** the repository to your local machine.
2. **Open `index.html`** in your preferred web browser.
3. You can explore the application by clicking **Login** or **Sign Up** (which will redirect you to the main Dashboard).
4. Inside the Dashboard, use the **Select Your Role** buttons at the top to switch between "Employee", "Manager", and "Admin" views to see how the interface changes based on permission levels.

## 📸 Screenshots & Usage

- **Role Switching:** The top navigation allows you to instantly switch roles to test different functionalities.
- **Mock Data:** The application comes with pre-populated dummy data for expenses and users so you can immediately interact with the system's features without setting up a backend.