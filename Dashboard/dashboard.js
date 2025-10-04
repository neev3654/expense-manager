let expenses = [];
let users = [
    { id: 1, name: "John Doe", email: "john@company.com", role: "employee", department: "Sales", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@company.com", role: "employee", department: "Engineering", status: "active" },
    { id: 3, name: "Mike Johnson", email: "mike@company.com", role: "manager", department: "Engineering", status: "active" },
    { id: 4, name: "Sarah Wilson", email: "sarah@company.com", role: "admin", department: "HR", status: "active" },
    { id: 5, name: "Robert Brown", email: "robert@company.com", role: "employee", department: "Marketing", status: "active" },
    { id: 6, name: "Emily Davis", email: "emily@company.com", role: "employee", department: "Sales", status: "active" }
];

let allExpenses = [
    {
        id: 1, employee: "John Doe", department: "Sales", desc: "Business lunch with client",
        date: "2024-01-15", category: "Meals", paidBy: "Company Card", remarks: "Client meeting",
        amount: "2500", status: "approved", submittedBy: 1
    },
    {
        id: 2, employee: "Jane Smith", department: "Engineering", desc: "Flight to conference",
        date: "2024-01-20", category: "Travel", paidBy: "Personal", remarks: "Annual tech conference",
        amount: "15000", status: "pending", submittedBy: 2
    },
    {
        id: 3, employee: "John Doe", department: "Sales", desc: "Hotel accommodation",
        date: "2024-01-25", category: "Travel", paidBy: "Company Card", remarks: "Client visit",
        amount: "8000", status: "pending", submittedBy: 1
    },
    {
        id: 4, employee: "Robert Brown", department: "Marketing", desc: "Marketing materials",
        date: "2024-01-28", category: "Marketing", paidBy: "Company Card", remarks: "Campaign materials",
        amount: "4500", status: "pending", submittedBy: 5
    }
];

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    const modal = document.getElementById("expenseModal");
    const newBtn = document.querySelector(".new");
    const submitBtn = document.querySelector(".submit");

    newBtn.addEventListener("click", () => {
        populateEmployeeDropdown();
        modal.style.display = "flex";
    });

    submitBtn.addEventListener("click", submitExpense);

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    updateEmployeeStats();
    renderEmployeeTable();
    switchRole('employee');
}

function updateEmployeeStats() {
    const toSubmitAmount = expenses
        .filter(exp => exp.status === 'draft')
        .reduce((sum, exp) => sum + parseInt(exp.amount || 0), 0);
    
    const waitingApprovalAmount = expenses
        .filter(exp => exp.status === 'pending')
        .reduce((sum, exp) => sum + parseInt(exp.amount || 0), 0);
    
    const approvedAmount = expenses
        .filter(exp => exp.status === 'approved')
        .reduce((sum, exp) => sum + parseInt(exp.amount || 0), 0);

    document.getElementById('toSubmitAmount').textContent = `₹${toSubmitAmount.toLocaleString()}`;
    document.getElementById('waitingApprovalAmount').textContent = `₹${waitingApprovalAmount.toLocaleString()}`;
    document.getElementById('approvedAmount').textContent = `₹${approvedAmount.toLocaleString()}`;
}

function populateEmployeeDropdown() {
    const employeeSelect = document.getElementById("employee");
    employeeSelect.innerHTML = '<option value="">Select Employee</option>';
    
    const activeEmployees = users.filter(user => 
        user.role === 'employee' && user.status === 'active'
    );
    
    activeEmployees.forEach(employee => {
        const option = document.createElement("option");
        option.value = employee.name;
        option.textContent = employee.name;
        employeeSelect.appendChild(option);
    });
}

function switchRole(role) {
    document.querySelectorAll('.role-section').forEach(section => {
        section.style.display = 'none';
    });
    
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(role + 'Section').style.display = 'block';
    document.querySelector(`.role-btn[onclick="switchRole('${role}')"]`).classList.add('active');
    
    if (role === 'manager') {
        loadPendingExpenses();
    } else if (role === 'admin') {
        loadUsers();
    } else if (role === 'employee') {
        updateEmployeeStats();
        renderEmployeeTable();
    }
}

function submitExpense() {
    const employee = document.getElementById("employee").value;
    const category = document.getElementById("category").value;
    const total_amount = document.getElementById("total_amount").value;
    const date = document.getElementById("date").value;
    const paidBy = document.getElementById("paidby").value;
    const remarks = document.getElementById("remarks").value;
    const desc = document.getElementById("description").value;

    if (!employee || !category || !total_amount || !date) {
        alert("Please fill in all required fields");
        return;
    }

    const newExpense = {
        id: expenses.length + 1,
        employee,
        category,
        amount: total_amount,
        date,
        paidBy,
        remarks,
        desc,
        status: "pending"
    };

    expenses.push(newExpense);
    allExpenses.push({...newExpense, department: getEmployeeDepartment(employee)});

    updateEmployeeStats();
    renderEmployeeTable();
    document.getElementById("expenseModal").style.display = "none";
    clearModalInputs();
    alert("Expense submitted successfully!");
}

function getEmployeeDepartment(employeeName) {
    const user = users.find(user => user.name === employeeName);
    return user ? user.department : 'General';
}

function renderEmployeeTable() {
    const table = document.getElementById("expenseTable");
    let rows = "";

    expenses.forEach(exp => {
        rows += `
        <tr>
            <td>${exp.employee}</td>
            <td>${exp.desc}</td>
            <td>${exp.date}</td>
            <td>${exp.category}</td>
            <td>${exp.paidBy}</td>
            <td>${exp.remarks}</td>
            <td>₹${exp.amount}</td>
            <td><span class="status ${exp.status}">${exp.status}</span></td>
        </tr>`;
    });

    table.innerHTML = rows || `<tr><td colspan="8" style="text-align: center;">No expenses submitted yet</td></tr>`;
}

function clearModalInputs() {
    document.getElementById("employee").value = "";
    document.getElementById("category").value = "";
    document.getElementById("total_amount").value = "";
    document.getElementById("date").value = "";
    document.getElementById("paidby").value = "";
    document.getElementById("remarks").value = "";
    document.getElementById("description").value = "";
}

function loadPendingExpenses() {
    const table = document.getElementById('teamExpensesTable');
    const pendingExpenses = allExpenses.filter(exp => exp.status === 'pending');
    
    const totalPendingAmount = pendingExpenses.reduce((sum, exp) => sum + parseInt(exp.amount), 0);
    document.getElementById('pendingAmount').textContent = `₹${totalPendingAmount.toLocaleString()}`;
    document.getElementById('pendingCount').textContent = pendingExpenses.length;
    
    let rows = '';
    if (pendingExpenses.length === 0) {
        rows = `<tr><td colspan="6" style="text-align: center;">No pending expenses for approval</td></tr>`;
    } else {
        pendingExpenses.forEach(expense => {
            rows += `
            <tr>
                <td>${expense.employee}</td>
                <td>${expense.desc}</td>
                <td>${expense.date}</td>
                <td>${expense.category}</td>
                <td>₹${expense.amount}</td>
                <td>
                    <button onclick="approveExpense(${expense.id})" class="action-btn btn-approve">Approve</button>
                    <button onclick="rejectExpense(${expense.id})" class="action-btn btn-reject">Reject</button>
                </td>
            </tr>`;
        });
    }
    table.innerHTML = rows;
}

function approveExpense(expenseId) {
    const expense = allExpenses.find(exp => exp.id === expenseId);
    const employeeExpense = expenses.find(exp => exp.id === expenseId);
    
    if (expense) {
        expense.status = 'approved';
        if (employeeExpense) {
            employeeExpense.status = 'approved';
        }
        loadPendingExpenses();
        if (document.getElementById('employeeSection').style.display === 'block') {
            updateEmployeeStats();
            renderEmployeeTable();
        }
        alert('Expense approved successfully!');
    }
}

function rejectExpense(expenseId) {
    const expense = allExpenses.find(exp => exp.id === expenseId);
    const employeeExpense = expenses.find(exp => exp.id === expenseId);
    
    if (expense) {
        expense.status = 'rejected';
        if (employeeExpense) {
            employeeExpense.status = 'rejected';
        }
        loadPendingExpenses();
        if (document.getElementById('employeeSection').style.display === 'block') {
            updateEmployeeStats();
            renderEmployeeTable();
        }
        alert('Expense rejected!');
    }
}

function loadUsers() {
    const table = document.getElementById('usersTable');
    let rows = '';
    users.forEach(user => {
        rows += `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.department}</td>
            <td><span class="status ${user.status}">${user.status}</span></td>
            <td>
                <button onclick="editUser(${user.id})" class="action-btn btn-edit">Edit Role</button>
                <button onclick="toggleUserStatus(${user.id})" class="action-btn ${user.status === 'active' ? 'btn-reject' : 'btn-approve'}">${user.status === 'active' ? 'Deactivate' : 'Activate'}</button>
                <button onclick="deleteUser(${user.id})" class="action-btn btn-delete">Delete</button>
            </td>
        </tr>`;
    });
    table.innerHTML = rows;
}

function showAddUserForm() {
    const name = prompt("Enter user name:");
    if (!name) return;
    
    const email = prompt("Enter user email:");
    if (!email) return;
    
    const role = prompt("Enter role (employee/manager/admin):");
    if (!role || !['employee', 'manager', 'admin'].includes(role)) {
        alert("Invalid role. Please enter employee, manager, or admin.");
        return;
    }
    
    const department = prompt("Enter department:");
    if (!department) return;
    
    const newUser = {
        id: users.length + 1,
        name,
        email,
        role,
        department,
        status: 'active'
    };
    users.push(newUser);
    loadUsers();
    alert('User added successfully!');
}

function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        const newRole = prompt("Enter new role (employee/manager/admin):", user.role);
        if (newRole && ['employee', 'manager', 'admin'].includes(newRole)) {
            user.role = newRole;
            loadUsers();
            alert('User role updated successfully!');
        } else {
            alert("Invalid role. Please enter employee, manager, or admin.");
        }
    }
}

function toggleUserStatus(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.status = user.status === 'active' ? 'inactive' : 'active';
        loadUsers();
        alert(`User ${user.status === 'active' ? 'activated' : 'deactivated'} successfully!`);
    }
}

function deleteUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        if (confirm(`Are you sure you want to delete user: ${user.name}?`)) {
            users = users.filter(u => u.id !== userId);
            loadUsers();
            alert('User deleted successfully!');
        }
    }
}
