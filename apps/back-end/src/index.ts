import app from 'src/app';
import sequelize from 'src/database';
import setupCacheTable from 'src/database/setupCacheTable';

const port = process.env.APP_PORT || 8080;

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

async function init() {
    try {
        await sequelize.sync();
        await setupCacheTable();
        console.log(`Starting Sequelize + Express example on port ${port}...`);
        server.on('error', console.error);
    } catch (error) {
        console.log('ERROR:', error);
    }
}

init();
