import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from 'src/database';

export interface CacheAttributes {
    key: string;
    value: string;
    expireAt: Date | null;
}

export interface CacheCreationAttributes extends CacheAttributes {}

class Cache extends Model<CacheAttributes, CacheCreationAttributes> implements CacheAttributes {
    public key!: string;
    public value!: string;
    public expireAt!: Date | null;
}

Cache.init(
    {
        key: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
        },
        expireAt: {
            type: DataTypes.DATE,
            field: 'expire_at',
            allowNull: true,
        },
    },
    {
        sequelize, // We need to pass the connection instance
        modelName: 'Cache', // We need to choose the model name
        tableName: 'cache',
        timestamps: false,
        hooks: {
            afterSync: async () => {
                await sequelize.query('ALTER TABLE cache SET UNLOGGED');
            },
        },
    },
);

export default Cache;
