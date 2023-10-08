import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components'; // Import styled-components

// Create a styled component for the form container
const FormContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 5px;
    }

    input {
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 3px;
      font-size: 1rem;
    }

    button {
      background-color: #007bff;
      color: #fff;
      padding: 10px;
      border: none;
      border-radius: 3px;
      font-size: 1rem;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;

function InvitationForm({ eventId, onInvitationSent }) {
  const initialValues = {
    userEmail: '',
  };

  const validationSchema = Yup.object({
    userEmail: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch('/api/invitations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId,
          userEmail: values.userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send invitation');
      }

      onInvitationSent(); // Trigger a callback to handle the success action
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <FormContainer>
      <h2>Invite Guests</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="userEmail">Guest Email:</label>
          <input
            type="text"
            id="userEmail"
            name="userEmail"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userEmail}
          />
          {formik.touched.userEmail && formik.errors.userEmail ? (
            <div>{formik.errors.userEmail}</div>
          ) : null}
        </div>
        <button type="submit">Send Invitation</button>
      </form>
    </FormContainer>
  );
}

export default InvitationForm;
