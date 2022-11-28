
import React from 'react'
import HeroSection from './HeroSection'

const Home = () => {
  const data={
    name:'Hafza Maria',
    image:'./image/about1.jpg'
  }
  return (
    <div>
      I am Home
      <HeroSection {...data}/>
    </div>
  )
}

export default Home