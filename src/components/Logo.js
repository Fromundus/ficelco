import React from 'react'
import logo from "../assets/ficelco-logo.png"

function Logo({ width, height }) {
  return (
    <img src={logo} alt="" style={{width: width, height: height, minWidth: width}} />
  )
}

export default Logo