import { MiddlewareFn } from 'type-graphql';

import { MyContext } from '../../types/MyContext';

export const logger: MiddlewareFn<MyContext> = async ({ args }, next) => {
    console.log(args);
    console.log('Peener');
    return next();
};