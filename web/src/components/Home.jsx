
import React from 'react'
import HeroSection from './HeroSection'

const Home = () => {
  const data={
    name:'TheEShop',
    image:'./image/eshop1.png'
  }
  return (
    <div>
    
      <HeroSection {...data}/>
    </div>
  )
}

export default Home