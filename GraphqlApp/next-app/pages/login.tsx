import React from 'react';
import { Formik, Field } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import { inputField } from '../components/fields/InputField';
import { LoginComponent } from '../generated/apolloComponents';
import { withApollo } from '../lib/withApollo';

const LoginPage: NextPage = () => {
    const router = useRouter();
    return (
        <Layout title="Login">
            <LoginComponent>
                {(login) => (
                    <Formik 
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={async (data, { setErrors }) => {
                            const response = await login({
                                variables: data
                            });
                            console.log(response);
                            if (response && response.data && !response.data.login) {
                                setErrors({
                                    email: 'Invalid Login'
                                });
                                return;
                            }
                            router.push('/');
                        }}
                        initialValues={{
                            email: '',
                            password: ''
                        }}>
                    {({ handleSubmit }) => 
                        <form onSubmit={handleSubmit}>
                            <Field 
                                name="email" 
                                placeholder="Email" 
                                type="email" 
                                component={inputField} 
                            />
                            <Field 
                                name="password" 
                                placeholder="Password" 
                                type="password" 
                                component={inputField} 
                            />
                            <button type="submit">Submit</button>
                        </form>
                    }
                    </Formik>
                )}
            </LoginComponent>
        </Layout>
    )
}

export default withApollo(LoginPage);