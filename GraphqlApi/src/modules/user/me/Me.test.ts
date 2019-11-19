import { testConn } from '../../../test-utils/testConn';
import { Connection } from 'typeorm';
import faker from 'faker';

import { gCall } from '../../../test-utils/gCall';
import { User } from '../../../entities/User';

const meQuery = `
{
    me {
        id
        firstName
        lastName
        email
        name
    }
}
`;

let conn: Connection;
beforeAll(async () => {
    conn = await testConn();
});

afterAll(async () => {
    await conn.close();
});

describe('Me', () => {
    it('get myself', async () => {
        const user = await User.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }).save();
        const response = await gCall({
            source: meQuery,
            userId: user.id
        });
        expect(response).toMatchObject({
            data: {
                me: {
                    id: `${user.id}`,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`
                }
            }
        });
    });
    it('return null', async () => {
        const response = await gCall({
            source: meQuery
        });
        expect(response).toMatchObject({
            data: {
                me: null
            }
        });
    });
});