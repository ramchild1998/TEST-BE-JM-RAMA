const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EmployeeFamily = sequelize.define('employee_family', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    identifier: {
        type: DataTypes.STRING,
        allowNull: true
    },
    job: {
        type: DataTypes.STRING,
        allowNull: true
    },
    place_of_birth: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true
    },
    religion: {
        type: DataTypes.ENUM('Islam', 'Katolik', 'Buda', 'Protestan', 'Konghucu'),
        allowNull: true
    },
    is_life: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    is_divorced: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    relation_status: {
        type: DataTypes.ENUM('Suami', 'Istri', 'Anak', 'Anak Sambung'),
        allowNull: true
    },
    created_by: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    updated_by: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = employee_family;