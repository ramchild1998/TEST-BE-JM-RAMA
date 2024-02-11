const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Route untuk mendapatkan semua data Employee
router.get('/employee', employeeController.getAllEmployees);

// Route untuk mendapatkan data Employee berdasarkan ID
router.get('/employee/:id', employeeController.getEmployeeById);

// Route untuk membuat data Employee baru
router.post('/employee', employeeController.createEmployee);

// Route untuk mengupdate data Employee berdasarkan ID
router.put('/employee/:id', employeeController.updateEmployee);

// Route untuk menghapus data Employee berdasarkan ID
router.delete('/employee/:id', employeeController.deleteEmployee);

module.exports = router;