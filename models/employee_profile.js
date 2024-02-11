const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EmployeeProfile = sequelize.define('employee_profile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    place_of_birth: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('Laki-Laki', 'Perempuan'),
        allowNull: false
    },
    is_married: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    prof_pict: {
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

module.exports = employee_profile;