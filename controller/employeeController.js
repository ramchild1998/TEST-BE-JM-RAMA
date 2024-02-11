const { employee } = require('../models');

// Mendapatkan semua data Employee
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await employee.findAll();
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Mendapatkan data Employee berdasarkan ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await employee.findByPk(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Membuat data Employee baru
exports.createEmployee = async (req, res) => {
    try {
        const { nik, name, is_active } = req.body;
        const employee = await employee.create({ nik, name, is_active });
        res.status(201).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Mengupdate data Employee berdasarkan ID
exports.updateEmployee = async (req, res) => {
    try {
        const { nik, name, is_active } = req.body;
        const [updatedRowsCount, updatedEmployee] = await employee.update(
            { nik, name, is_active },
            { where: { id: req.params.id }, returning: true }
        );
        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(updatedEmployee[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Menghapus data Employee berdasarkan ID
exports.deleteEmployee = async (req, res) => {
    try {
        const deletedRowCount = await employee.destroy({ where: { id: req.params.id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
