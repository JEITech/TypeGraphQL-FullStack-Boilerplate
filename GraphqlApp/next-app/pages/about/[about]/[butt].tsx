import * as React from 'react';
import Link from 'next/link';
import Layout from '../../../components/Layout';
// import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { withApollo } from '../../../lib/withApollo';

type someProps = {
    what: string | Array<string>;
}

const AboutPage: NextPage<{ what: string | Array<string> }> = (props: someProps) => {
    const router = useRouter();
    return (
        <Layout title="About | Next.js + TypeScript Example">
            <h1>{router.query.about}</h1>
            <p>This is the {props.what} page</p>
            <p>butt: {router.query.butt}</p>
            <p>
                <Link href="/">
                    <a>Go home</a>
                </Link>
            </p>
        </Layout>
    );
};

AboutPage.getInitialProps = async () => {
    //do some ajax
    return { what: 'ajax result' };
}

export default withApollo(AboutPage);
