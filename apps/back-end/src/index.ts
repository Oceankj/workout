import app from './app';
import sequelize from './database';

const port = process.env.APP_PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function init() {
  await sequelize.sync({ force: true });
  console.log(`Starting Sequelize + Express example on port ${port}...`);
  server.on('error', console.error);
}

init();
