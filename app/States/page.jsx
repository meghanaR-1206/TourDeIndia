import React from 'react'
// Import the dynamic function
import dynamic from 'next/dynamic';

// Dynamically import the component and disable SSR
const States = dynamic(() => import('../components/State.jsx'), {
  ssr: false, // Disable server-side rendering
});
const page = () => {
  return (
    <div>
      <States />
    </div>
  )
}

export default page