import React from 'react'
import Image from 'next/image'
import Icon from "../../public/images/LOGO.svg"

const Footer = () => {
  return (
    <footer className='min-h-[20rem] bg-[#351a03] text-black p-5 flex flex-col lg:flex-row items-center'>
      <div className="left flex flex-col items-center py-9 max-w-[21rem] px-5 bg-black rounded-md mx-7 mb-6 lg:mb-0">
        <Image src={Icon} alt='icon' width={250} />
      </div>
      <div className='w-full justify-between items-start flex flex-col lg:flex-row'>
        <div className='lg:w-1/3 mb-6 lg:mb-0'>
          <h2 className='cursor-default text-xl text-white font-bold mb-2'>About Us</h2>
          <ul>
            <li className='cursor-pointer hover:underline text-gray-400'>Our Story</li>
            <li className='cursor-pointer hover:underline text-gray-400'>Team</li>
            <li className='cursor-pointer hover:underline text-gray-400'>Careers</li>
            <li className='cursor-pointer hover:underline text-gray-400'>Press</li>
          </ul>
        </div>
        <div className='lg:w-1/3 mb-6 lg:mb-0'>
          <h2 className='cursor-default text-xl text-white font-bold mb-2'>Follow Us</h2>
          <ul>
            <li className='cursor-pointer hover:underline text-gray-400'>Facebook</li>
            <li className='cursor-pointer hover:underline text-gray-400'>Twitter</li>
            <li className='cursor-pointer hover:underline text-gray-400'>Instagram</li>
            <li className='cursor-pointer hover:underline text-gray-400'>LinkedIn</li>
          </ul>
        </div>
        <div className='lg:w-1/3'>
          <h2 className='cursor-default text-xl text-white font-bold mb-2'>Contact Us</h2>
          <ul>
            <li className='cursor-pointer hover:underline text-gray-400'>Email: contact@insightnow.com</li>
            <li className='cursor-pointer hover:underline text-gray-400'>Phone: (123) 456-7890</li>
            <li className='cursor-pointer hover:underline text-gray-400'>Address: 123 News St, Bangalore, India</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
