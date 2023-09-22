'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('likes', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
          references:{
            model:"users",
            key:"id"
          }
        },
        post_id:{
          type:Sequelize.INTEGER,
          allowNull:false,
          references:{
            model:"posts",
            key:"id"
          }
        },
        reaction_enum:{
          type:Sequelize.ENUM("LIKE"),
          allowNull:false,
          default:"LIKE"
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
    await queryInterface.dropTable('likes');
  }
};