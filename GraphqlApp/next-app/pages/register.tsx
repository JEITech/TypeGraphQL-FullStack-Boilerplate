import React from 'react';
import { Formik, Field } from 'formik';

import Layout from '../components/Layout';
import { inputField } from '../components/fields/InputField';
import { RegisterComponent } from '../generated/apolloComponents';
import { withApollo } from '../lib/withApollo';

const RegisterPage: React.FunctionComponent = () => {
    return (
        <Layout title="Register">
            <RegisterComponent>
                {(register) => (
                    <Formik 
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={async (data, { setErrors }) => {
                            try {
                                const response = await register({
                                    variables: {
                                        data
                                    }
                                });
                                console.log(response);
                            } catch (err) {
                                const errors: {[key: string]: string} = {};
                                err.graphQLErrors[0].extensions.exception.validationErrors.forEach((validationErr: any) => {
                                    Object.values(validationErr.constraints).forEach((message: any) => {
                                        errors[validationErr.property] = message;
                                    });
                                });
                                setErrors(errors);
                            }
                        }}
                        initialValues={{
                            email: '',
                            firstName: '',
                            lastName: '',
                            password: ''
                        }}>
                    {({ handleSubmit }) => 
                        <form onSubmit={handleSubmit}>
                            <Field 
                                name="firstName" 
                                placeholder="First Name" 
                                component={inputField} 
                            />
                            <Field 
                                name="lastName" 
                                placeholder="Last Name" 
                                component={inputField} 
                            />
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
            </RegisterComponent>
        </Layout>
    )
}

export default withApollo(RegisterPage);