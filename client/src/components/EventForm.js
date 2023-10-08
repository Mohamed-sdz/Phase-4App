import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
    <div>
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
    </div>
  );
}

export default InvitationForm;
