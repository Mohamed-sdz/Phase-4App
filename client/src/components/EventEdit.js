import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
  label {
    font-weight: bold;
  }
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .error-message {
    color: #ff0000;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

function EventEdit({ eventId, eventDetails, onUpdate }) {
  const initialValues = {
    title: eventDetails.title,
    description: eventDetails.description,
    date: eventDetails.date,
    location: eventDetails.location,
    ongoing: eventDetails.ongoing,
    budget: eventDetails.budget.toString(),
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    date: Yup.date().required('Date is required'),
    location: Yup.string(),
    ongoing: Yup.boolean(),
    budget: Yup.number().positive('Budget must be a positive number'),
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      onUpdate(); // Trigger a callback to handle the success action
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    formik.setValues({
      title: eventDetails.title,
      description: eventDetails.description,
      date: eventDetails.date,
      location: eventDetails.location,
      ongoing: eventDetails.ongoing,
      budget: eventDetails.budget.toString(),
    });
  }, [eventDetails, formik]);

  return (
    <FormContainer>
      <FormTitle>Edit Event</FormTitle>
      <form onSubmit={formik.handleSubmit}>
        <FormField>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="error-message">{formik.errors.title}</div>
          ) : null}
        </FormField>
        {/* Other form fields (description, date, location, ongoing, budget) */}
        {/* ... */}
        <SubmitButton type="submit">Update Event</SubmitButton>
      </form>
    </FormContainer>
  );
}

export default EventEdit;
