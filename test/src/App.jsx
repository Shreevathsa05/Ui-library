// import { BasicButton, BasicCarousel } from '../../ui-library-package'
import { BasicCarousel } from '../../ui-library-package/components/carousel/BasicCarousel'

import './index.css'
import React from 'react'
function TestingRig() {
  return (
    <>
    <div className='bg-blue-950 w-screen h-screen'>
    <BasicCarousel
  className=" h-[90vh]"
  slideClassName="border-2 border-white shadow-2xl"
  items={[
    <div className="bg-indigo-500 w-full h-full rounded-xl" />,
    <div className="bg-pink-500 w-full h-full rounded-xl" />,
    <div className="bg-orange-500 w-full h-full rounded-xl" />,
  ]}
/>

    </div>
    </>
  )
}

export default TestingRig