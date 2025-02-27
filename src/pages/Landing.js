import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
<section
  className="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat"
>
  <div
    className="absolute inset-0 bg-gray-900/75 md:from-gray-900/75 md:to-gray-900/0 md:bg-gradient-to-r lg:from-gray-900/md:from-gray-900/75 lg:to-gray-900/0 lg:bg-gradient-to-r"
  ></div>

  <div
    className="relative mx-auto w-full px-4 lg:px-8 h-[80svh] flex items-center justify-center lg:justify-start"
  >
    <div className="max-w-xl text-center lg:text-start">
      <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
        Powering Your Future 

        <strong className="block font-extrabold text-primary"> with Reliable Energy Solutions. </strong>
      </h1>

      <p className="mt-4 w-full text-white sm:text-xl/relaxed">
        We provide sustainable, efficient, and affordable electricity for homes and businesses.
      </p>

      <div className="mt-8 flex flex-wrap gap-4 text-center justify-center lg:justify-start">
        <Link
          to={'/'}
          className="block w-full rounded bg-blue-700 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-800 focus:ring-3 focus:outline-hidden sm:w-auto"
        >
          Get Started
        </Link>

        <Link
          to={'/consumer-services'}
          className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-blue-700 shadow-sm hover:text-blue-800 focus:ring-3 focus:outline-hidden sm:w-auto"
        >
          Learn More
        </Link>
      </div>
    </div>
  </div>
</section>
  )
}

export default Landing