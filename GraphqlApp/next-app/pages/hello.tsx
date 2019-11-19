import React from 'react';

import { HelloComponent } from '../generated/apolloComponents';
import { withApollo } from '../lib/withApollo';
import Layout from '../components/Layout';

const HelloPage = () => {
    return (
        <Layout title="Hello">
            <HelloComponent>
                {({ data }) => (
                    <div>{data && data.hello ? data.hello : 'loading...'}</div>
                )}
            </HelloComponent>
        </Layout>
    );
}

export default withApollo(HelloPage);