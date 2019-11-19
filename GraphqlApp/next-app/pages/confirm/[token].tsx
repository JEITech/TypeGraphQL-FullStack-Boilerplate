import React from 'react';
import Layout from '../../components/Layout';
import { NextPage } from 'next';

import redirect from '../../lib/redirect';
import { withApollo } from '../../lib/withApollo';
import { MyContext } from '../../interfaces/MyContext';
import { ConfirmUserMutation, ConfirmUserMutationVariables } from '../../generated/apolloComponents';
import { confirmUserMutation } from '../../graphql/user/mutations/confirmUser';

type confirmUserProps = {
    error: string;
}

const ConfirmEmail: NextPage<{ error: string }> = (props: confirmUserProps) => {
    return (
        <Layout title="Confirm Email">
            <h1>Confirming email...</h1>
            <p>{props.error}</p>
        </Layout>
    );
};

ConfirmEmail.getInitialProps = async ({ query, apolloClient, ...ctx }: MyContext) => {
    const token = query.token;
    if (!token) {
        return { error: 'Something went wrong!' }
    };
    try {
        await apolloClient.mutate<ConfirmUserMutation, ConfirmUserMutationVariables>({
            mutation: confirmUserMutation,
            variables: {
                token: token as string
            } 
        });
    }catch (err) {
        return { error: `Error: ${err.message}` };
    }
    redirect(ctx, '/login');
    return { error: 'none'};
}


export default withApollo(ConfirmEmail);
