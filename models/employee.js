const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nik: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    end_date: {
        type: DataTypes.DATE,
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

module.exports = employee;