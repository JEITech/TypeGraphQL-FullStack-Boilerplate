import * as React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { NextPage } from 'next';

import { withApollo } from '../lib/withApollo';
import { LoginComponent } from '../generated/apolloComponents';


const IndexPage: NextPage = () => {
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <h1>Hello Next.js 👋</h1>
            <Link href='/about/bigone'>
                <a>About</a>
            </Link>
            <hr />
            <LoginComponent>
                {mutate => (
                    <button
                        onClick={ async () => {
                            const response = await mutate({
                                variables: { email: 'hi@hi.com', password: 'hello' }
                            });
                            console.log(response);
                        }}
                    >
                    Login
                    </button>
                )}
            </LoginComponent>
        </Layout>
    );
};

export default withApollo(IndexPage);
