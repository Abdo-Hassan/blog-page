import React from 'react';

const Title = ({title}:{title:string}) => {
  return (
    <h1 className='text-center text-4xl text-emerald-700 py-6 font-semibold'>
      {title}
    </h1>
  );
};

export default Title;