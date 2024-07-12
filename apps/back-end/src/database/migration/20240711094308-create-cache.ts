import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.sequelize.query(`
        CREATE UNLOGGED TABLE Cache (
          "key" varchar(255) NOT NULL,
          "value" text,
          "expire_at" timestamptz,
          PRIMARY KEY ("key")
        );
      `);
    },

    async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.sequelize.query(`
        DROP TABLE IF EXISTS Cache;
      `);
    },
};
