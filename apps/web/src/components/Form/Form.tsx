import React from 'react';

interface FormProps {
  children: React.ReactElement | React.ReactElement[]
}

const Form = ({ children }: FormProps) => {
  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    alert('Not Implemented!');
  };

  return <form onSubmit={handleSubmitForm}>{children}</form>;
};

export default Form;
