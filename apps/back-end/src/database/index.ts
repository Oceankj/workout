import { Sequelize } from 'sequelize';

// 從環境變量中獲取資料庫配置
const host: string = process.env.POSTGRES_HOST!;
const port: number = parseInt(process.env.POSTGRES_PORT!, 10);
const database: string = process.env.POSTGRES_DB!;
const username: string = process.env.POSTGRES_USER!;
const password: string = process.env.POSTGRES_PASSWORD!;

// 創建 Sequelize 實例
const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: 'postgres',
    logging: console.log, // 可以設置為 true 來啟用 SQL 日誌
});

// 測試連接
async function authenticateDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
}

// 調用驗證函數
authenticateDatabase();

export default sequelize;
