import { createConnection } from 'typeorm';

export const testConn = (drop: boolean = false) => {
    return createConnection({
        name: 'default',
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'postgres',
        database: 'chungus-test',
        synchronize: drop,
        logging: true,
        dropSchema: drop,
        entities: [
            `${__dirname}/../entities/*.*`
        ]
    });
};
