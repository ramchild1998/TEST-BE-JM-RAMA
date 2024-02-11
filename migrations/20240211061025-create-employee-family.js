'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employee_family', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      identifier: {
        type: Sequelize.STRING,
        allowNull: true
      },
      job: {
        type: Sequelize.STRING,
        allowNull: true
      },
      place_of_birth: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true
      },
      religion: {
        type: Sequelize.ENUM('Islam', 'Katolik', 'Buda', 'Protestan', 'Konghucu'),
        allowNull: true
      },
      is_life: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      is_divorced: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      relation_status: {
        type: Sequelize.ENUM('Suami', 'Istri', 'Anak', 'Anak Sambung'),
        allowNull: true
      },
      created_by: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      updated_by: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employee_family');
  }
};