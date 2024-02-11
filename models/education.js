const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Education = sequelize.define('education', {
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
        type: DataTypes.STRING(255),
        allowNull: true
    },
    level: {
        type: DataTypes.ENUM('TK', 'SD', 'SMP', 'SMA', 'Strata 1', 'Strata 2', 'Doktor', 'Profesor'),
        allowNull: true
    },
    description: {
        type: DataTypes.STRING(255),
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

module.exports = education;