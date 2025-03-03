import React from 'react'

function LineSkeleton({ className, speed }) {
  return (
    <div className={`${className} bg-light-hover dark:bg-dark-hover rounded-lg animate-pulse-${speed}`}>

    </div>
  )
}

export default LineSkeleton