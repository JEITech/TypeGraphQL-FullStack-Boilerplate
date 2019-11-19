import React from 'react';
import { Formik, Field } from 'formik';

import Layout from '../components/Layout';
import { inputField } from '../components/fields/InputField';
import { ForgotPasswordComponent } from '../generated/apolloComponents';
import { withApollo } from '../lib/withApollo';
import Router from 'next/router';

const ForgotPasswordPage: React.FunctionComponent = () => {
    return (
        <Layout title="Register">
            <ForgotPasswordComponent>
                {(forgotPassword) => (
                    <Formik 
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={async (data) => {
                            const response = await forgotPassword({
                                variables: data
                            });
                            console.log(response);
                            Router.push('/check-email');
                        }}
                        initialValues={{
                            email: ''
                        }}>
                    {({ handleSubmit }) => 
                        <form onSubmit={handleSubmit}>
                            <Field 
                                name="email" 
                                placeholder="Email" 
                                type="email" 
                                component={inputField} 
                            />
                            <button type="submit">Send Password Reset Link</button>
                        </form>
                    }
                    </Formik>
                )}
            </ForgotPasswordComponent>
        </Layout>
    )
}

export default withApollo(ForgotPasswordPage);