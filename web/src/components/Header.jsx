import React from 'react'
import styled from 'styled-components';
import Navbar from './Navbar';
// import styled from 'styled-components';
import { useContext } from "react";

import { GlobalContext } from '../context';
const Header = () => {
  let { state } = useContext(GlobalContext);
  return (

<MainHeader>
    {/* <NavLink to='/'> */}
        {/* <img src='' alt='logo' className='logo'/> */}
        <div className="userName">{state?.user?.firstName} {state?.user?.lastName}</div>
    {/* </NavLink> */}
    <Navbar/>
</MainHeader>

  )
};

const MainHeader=styled.header`
padding: 0 4.8rem;
height: 4rem;
background-color: ${({theme})=>theme.colors.bg};
 display:flex;
 justify-content: space-between;
align-items: center;
.logo{
  height:auto;
  width:40%;
}
.userName{
  font-size:1.8rem;
  color:${({theme})=> theme.colors.helper};
}
`;

export default Header