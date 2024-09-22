
import React from 'react';
import { FaCheck } from 'react-icons/fa'; 
import { FaTimes } from 'react-icons/fa'; 
import egg6 from '../assets/Images/six.jpg';
import egg12 from '../assets/Images/twleve.jpg';
import egg30 from '../assets/Images/thirty.jpg';

const Orders = () => {
  console.log('Orders component rendered');
  const orders = [
    {
      date: '24th Jul 2024, 12:22 pm',
      status: 'delivered',
      total: '122',
      items: [
        { name: 'Item 1', image: egg6 },
        { name: 'Item 2', image: egg12 },
      ],
    },
    {
      date: '3rd May 2024, 03:40 pm',
      status: 'delivered',
      total: '240',
      items: [
        { name: 'Item 1', image: egg6 },
        { name: 'Item 2', image: egg12 },
        { name: 'Item 3', image: egg30 },
      ],
    },
    {
      date: '3rd May 2024, 03:40 pm',
      status: 'cancelled',
      total: '400',
      items: [
        { name: 'Item 1', image: egg30 },
        { name: 'Item 2', image: egg30 },
        { name: 'Item 3', image: egg30 },
      ],
    },
    {
      date: '13th Apr 2024, 06:09 pm',
      status: 'cancelled',
      total: '100',
      items: [{ name: 'Item 1', image: egg6 }],
    },
    {
      date: '3rd May 2024, 03:40 pm',
      status: 'cancelled',
      total: '400',
      items: [
        { name: 'Item 1', image: egg30 },
        { name: 'Item 2', image: egg30 },
        { name: 'Item 3', image: egg30 },
      ],
    },
    {
      date: '3rd May 2024, 03:40 pm',
      status: 'cancelled',
      total: '400',
      items: [
        { name: 'Item 1', image: egg30 },
        { name: 'Item 2', image: egg30 },
        { name: 'Item 3', image: egg30 },
      ],
    },
  ];

  return (
    <div className=" h-3/4 lg:h-2/3  overflow-y-auto bg-gray-100 rounded-lg ">
      {orders.length === 0 ? (
        <p className="text-black  text-center text-lg">No orders done</p>
      ) : (
        <div className="space-y-4 m-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-lg flex justify-between items-center"
            >
              <div className="flex flex-col items-start">
                <div className="flex space-x-2">
                  {order.items.map((item, i) => (
                    <img
                      key={i}
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  ))}
                </div>
                <div className='mt-2'>
                  <h4 className="text-lg font-semibold">
                    {order.status === 'delivered' ? 'Order delivered' : 'Order cancelled'}{' '}
                    {order.status === 'delivered' ? (
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-600 text-xs text-white">
                        <FaCheck />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-600 text-xs text-white">
                        <FaTimes />
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-500">Placed at {order.date}</p>
                </div>
              </div>
              <p className="text-lg font-semibold">₹{order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
