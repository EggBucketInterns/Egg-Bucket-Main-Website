import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const CareerDreamJob = () => {
  return (
    <div className='min-h-screen mt-16 sm:mt-0 flex justify-center items-center w-full px-4 md:px-12 lg:px-20 py-10 bg-gray-50'>
      {/* Main Content */}
      <div className='flex flex-col lg:flex-row w-full max-w-6xl mx-auto gap-6'>
        {/* Left Section - Open Positions */}
        <div className='w-full lg:w-1/3 flex flex-col lg:mr-10 items-center space-y-5'>
          <h1 className='font-semibold text-lg py-2 text-center w-full'>Open Positions</h1>
          
          <Link
            to='/careers/dreamjob/EngineeringOpportunities'
            className='flex justify-between w-full max-w-md lg:max-w-80 items-center border border-gray-300 bg-white cursor-pointer hover:bg-gray-100 p-4 rounded-lg shadow-md transition-all duration-300'
          >
            <div className='text-left flex-grow'>
              <h1 className='text-base lg:text-lg font-medium'>Engineering Internship</h1>
              <p className='text-xs lg:text-sm text-gray-600'>In Office (Bengaluru, India)</p>
            </div>
            <p className='text-xl'>{'>'}</p>
          </Link>

          <Link
            to='/careers/dreamjob/MBAOpportunities'
            className='flex justify-between w-full max-w-md lg:max-w-80 items-center border border-gray-300 bg-white cursor-pointer hover:bg-gray-100 p-4 rounded-lg shadow-md transition-all duration-300'
          >
            <div className='text-left flex-grow'>
              <h1 className='text-base lg:text-lg font-medium'>MBA Internship</h1>
              <p className='text-xs lg:text-sm text-gray-600'>In Office (Bengaluru, India)</p>
            </div>
            <p className='text-xl'>{'>'}</p>
          </Link>
        </div>

        {/* Right Section - Internship Details */}
        <div className='w-full lg:w-2/3 mt-6 lg:mt-0'>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default CareerDreamJob;