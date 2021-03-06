import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis'; 
import cors from 'cors';

import { redis } from './redis';
import { createSchema } from './utils/createSchema';

const main = async () => {

    await createConnection();

    const schema = await createSchema();

    const apolloServer = new ApolloServer({ 
        schema,
        context: ({ req, res }: any) => ({ req, res }),
        validationRules: [
            // queryComplexity({
            //     maximumComplexity: 8,
            //     variables: {},
            //     onComplete: (complexity: number) => {
            //         console.log('Query Complexity: ', complexity);
            //     },
            //     estimators: [
            //         fieldConfigEstimator(),
            //         simpleEstimator({
            //             defaultComplexity: 1
            //         })
            //     ]
            // }) as any
        ]
    });

    const app = Express();

    const RedisStore = connectRedis(session);

    app.use(
        cors({
            credentials: true,
            origin: 'http://localhost:3000'
        })
    );

    app.use(
        session({
            store: new RedisStore({
                client: redis as any
            }),
            name: "qid",
            secret: "secret69secret",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365 //7 years
            }
        } as any)
    );

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(4000, () => {
        console.log('Doin it 4k');
    });

}

main();