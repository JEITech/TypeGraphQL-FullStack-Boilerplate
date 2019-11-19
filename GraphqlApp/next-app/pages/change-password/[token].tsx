import React from 'react';
import Layout from '../../components/Layout';
import { NextPage, NextPageContext } from 'next';
import { Formik, Field } from 'formik';

import { withApollo } from '../../lib/withApollo';
import { ChangePasswordComponent } from '../../generated/apolloComponents';
import { inputField } from '../../components/fields/InputField';
import Router from 'next/router';

interface changePasswordProps {
    token: string;
}

const ChangePassword: NextPage<{ token: string }> = (props: changePasswordProps) => {
    return (
        <Layout title="About | Next.js + TypeScript Example">
            <ChangePasswordComponent>
                {(changePassword) => (
                    <Formik 
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={async (data) => {
                            await changePassword({
                                variables: {
                                    data: {
                                        password: data.password,
                                        token: props.token
                                    }
                                }
                            });
                            Router.replace('/hello');
                        }}
                        initialValues={{
                            password: ''
                        }}>
                    {({ handleSubmit }) => 
                        <form onSubmit={handleSubmit}>
                            <Field 
                                name="password" 
                                placeholder="New Password" 
                                type="password" 
                                component={inputField} 
                            />
                            <button type="submit">Update Password</button>
                        </form>
                    }
                    </Formik>
                )}
            </ChangePasswordComponent>
        </Layout>
    );
};

ChangePassword.getInitialProps = async ({ query }: NextPageContext) => {
    const token = query.token.toString();
    return {
        token
    }
};


export default withApollo(ChangePassword);
