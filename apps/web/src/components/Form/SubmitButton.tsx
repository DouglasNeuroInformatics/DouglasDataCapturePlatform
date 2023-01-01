import React from 'react';

const SubmitButton = ({ label = 'Submit' }: { label?: string }) => {
  return (
    <button className="rounded-md bg-blue-500 px-2 py-1 text-white" type="submit">
      {label}
    </button>
  );
};

export default SubmitButton;
