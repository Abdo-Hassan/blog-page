import React from 'react';

interface Props {
  label: string;
  inputName: string;
  value: string;
  formik: any;
}

const ArticleInputForm = ({ label, inputName, formik, value }: Props) => {
  return (
    <div className='sm:col-span-1'>
      <label className='block text-sm font-medium leading-6 text-gray-900'>
        {label}
      </label>
      <div className='mt-2'>
        <input
          type='text'
          onChange={formik.handleChange}
          value={value}
          onBlur={formik.handleBlur}
          name={inputName}
          id={inputName}
          className='block w-full rounded-md focus:outline-none border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
        />
      </div>
    </div>
  );
};

export default ArticleInputForm;