import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components'; // Import styled-components

// Create a styled component for the form container
const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  .error {
    color: red;
    margin-top: 5px;
  }

  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

function RegistrationForm() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Define the initial form values
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Please enter a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  // Function to handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true); // Show loading indicator

    try {
      // Send a POST request to your API endpoint to register the user
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setRegistrationSuccess(true);
        setError(null); // Clear any previous errors
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false); // Hide loading indicator
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      {registrationSuccess ? (
        <p>
          Registration successful! You can now <a href="/login">log in</a>.
        </p>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <label htmlFor="username">Username:</label>
              <Field type="text" name="username" id="username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field type="email" name="email" id="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field type="password" name="password" id="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            {error && <p className="error">{error}</p>}
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <button type="submit" disabled={isLoading}>
                Register
              </button>
            )}
          </Form>
        </Formik>
      )}
    </FormContainer>
  );
}

export default RegistrationForm;
