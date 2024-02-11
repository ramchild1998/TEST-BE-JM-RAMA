'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('education', {
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
        type: Sequelize.STRING(255),
        allowNull: true
      },
      level: {
        type: Sequelize.ENUM('TK', 'SD', 'SMP', 'SMA', 'Strata 1', 'Strata 2', 'Doktor', 'Profesor'),
        allowNull: true
      },
      description: {
        type: Sequelize.STRING(255),
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
    await queryInterface.dropTable('education');
  }
};