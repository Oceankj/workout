import sequelize from 'src/database';

const setupCacheTable = async () => {
    const createFunctionQuery = `
    CREATE OR REPLACE FUNCTION delete_expired_rows() RETURNS TRIGGER AS $$
    BEGIN
      DELETE FROM cache WHERE expire_at IS NOT NULL AND expire_at <= NOW();
      RETURN NULL;
    END;
    $$ LANGUAGE plpgsql;
  `;

    const createTriggerQuery = `
    CREATE OR REPLACE TRIGGER delete_expired_rows_trigger
    AFTER INSERT OR UPDATE ON cache
    FOR EACH ROW
    EXECUTE FUNCTION delete_expired_rows();
  `;

    await sequelize.query(createFunctionQuery);
    await sequelize.query(createTriggerQuery);
};

export default setupCacheTable;
