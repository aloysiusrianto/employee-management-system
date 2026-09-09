"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Initialize with sample data
const employees = [
    {
        id: (0, uuid_1.v4)(),
        employeeId: 'EMP001',
        name: 'Ahmad Rizky',
        email: 'ahmad.rizky@maspion.co.id',
        phone: '+62 812 3456 7890',
        department: 'Engineering',
        position: 'Senior Software Engineer',
        status: 'Active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: (0, uuid_1.v4)(),
        employeeId: 'EMP002',
        name: 'Siti Nurhaliza',
        email: 'siti.nurhaliza@maspion.co.id',
        phone: '+62 813 8765 4321',
        department: 'Human Resources',
        position: 'HR Manager',
        status: 'Active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: (0, uuid_1.v4)(),
        employeeId: 'EMP003',
        name: 'Budi Santoso',
        email: 'budi.santoso@maspion.co.id',
        phone: '+62 821 1122 3344',
        department: 'Finance',
        position: 'Financial Analyst',
        status: 'Active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: (0, uuid_1.v4)(),
        employeeId: 'EMP004',
        name: 'Dewi Lestari',
        email: 'dewi.lestari@maspion.co.id',
        phone: '+62 857 9988 7766',
        department: 'Marketing',
        position: 'Marketing Specialist',
        status: 'Inactive',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: (0, uuid_1.v4)(),
        employeeId: 'EMP005',
        name: 'Eko Prasetyo',
        email: 'eko.prasetyo@maspion.co.id',
        phone: '+62 856 5544 3322',
        department: 'Engineering',
        position: 'Junior Developer',
        status: 'Active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];
// Auto-generate employeeId
function generateEmployeeId() {
    const maxNum = employees.reduce((max, emp) => {
        const num = parseInt(emp.employeeId.replace('EMP', ''), 10);
        return isNaN(num) ? 0 : Math.max(max, num);
    }, 0);
    return `EMP${String(maxNum + 1).padStart(3, '0')}`;
}
// ============ API ROUTES ============
// GET /api/employees - List all employees (with filters)
app.get('/api/employees', (req, res) => {
    try {
        const { department, status, search } = req.query;
        let filtered = [...employees];
        if (department && typeof department === 'string') {
            filtered = filtered.filter(emp => emp.department.toLowerCase() === department.toLowerCase());
        }
        if (status && typeof status === 'string') {
            filtered = filtered.filter(emp => emp.status.toLowerCase() === status.toLowerCase());
        }
        if (search && typeof search === 'string') {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(emp => emp.name.toLowerCase().includes(searchLower) ||
                emp.email.toLowerCase().includes(searchLower));
        }
        res.status(200).json({
            success: true,
            data: filtered,
            count: filtered.length,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
// GET /api/employees/:id - Get single employee
app.get('/api/employees/:id', (req, res) => {
    try {
        const { id } = req.params;
        const employee = employees.find(emp => emp.id === id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found',
            });
        }
        res.status(200).json({
            success: true,
            data: employee,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
// POST /api/employees - Create new employee
app.post('/api/employees', (req, res) => {
    try {
        const { name, email, phone, department, position, status } = req.body;
        // Validation
        if (!name || !email || !department || !position) {
            return res.status(400).json({
                success: false,
                message: 'name, email, department, and position are required',
            });
        }
        // Check duplicate email
        const emailExists = employees.find(emp => emp.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists',
            });
        }
        const newEmployee = {
            id: (0, uuid_1.v4)(),
            employeeId: generateEmployeeId(),
            name,
            email,
            phone: phone || '',
            department,
            position,
            status: status || 'Active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        employees.unshift(newEmployee);
        res.status(201).json({
            success: true,
            data: newEmployee,
            message: 'Employee created successfully',
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
// PUT /api/employees/:id - Update employee
app.put('/api/employees/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, department, position, status } = req.body;
        const employeeIndex = employees.findIndex(emp => emp.id === id);
        if (employeeIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found',
            });
        }
        const existingEmail = employees[employeeIndex].email;
        const emailChanged = email && email.toLowerCase() !== existingEmail.toLowerCase();
        // Check duplicate email if changed
        if (emailChanged) {
            const emailExists = employees.find(emp => emp.email.toLowerCase() === email.toLowerCase());
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists',
                });
            }
        }
        const updatedEmployee = {
            ...employees[employeeIndex],
            name: name || employees[employeeIndex].name,
            email: email || employees[employeeIndex].email,
            phone: phone !== undefined ? phone : employees[employeeIndex].phone,
            department: department || employees[employeeIndex].department,
            position: position || employees[employeeIndex].position,
            status: status || employees[employeeIndex].status,
            updatedAt: new Date().toISOString(),
        };
        employees[employeeIndex] = updatedEmployee;
        res.status(200).json({
            success: true,
            data: updatedEmployee,
            message: 'Employee updated successfully',
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
// DELETE /api/employees/:id - Delete employee
app.delete('/api/employees/:id', (req, res) => {
    try {
        const { id } = req.params;
        const employeeIndex = employees.findIndex(emp => emp.id === id);
        if (employeeIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found',
            });
        }
        const deletedEmployee = employees.splice(employeeIndex, 1)[0];
        res.status(200).json({
            success: true,
            data: deletedEmployee,
            message: 'Employee deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
// GET / - Serve frontend static files (for production)
const frontendPath = path_1.default.join(__dirname, '../../frontend/dist');
if (fs_1.default.existsSync(frontendPath)) {
    app.use(express_1.default.static(frontendPath));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(frontendPath, 'index.html'));
    });
}
// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Documentation available at: http://localhost:${PORT}/`);
});
exports.default = app;
//# sourceMappingURL=index.js.map