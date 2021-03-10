import { createConnection, getConnection } from 'typeorm';

const connection = {
    async create(){
        await createConnection();
    },
  
    async close(){
        await getConnection().close(); 
    },
  
    async clear(){ // The clear method will delete all data for every single entity registered in our connection.
        const connection = getConnection();
        const entities = connection.entityMetadatas;

        const entityDeletionPromises = entities.map((entity) => async() => {
            const repository = connection.getRepository(entity.name);
            await repository.query(`DELETE FROM ${entity.tableName}`);
        });
        await Promise.all(entityDeletionPromises);
    },
};

export default connection;