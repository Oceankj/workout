import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.createTable('user', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                field: 'is_deleted',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'created_at',
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'updated_at',
            },
        });
    },
    async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.dropTable('user');
    },
};
