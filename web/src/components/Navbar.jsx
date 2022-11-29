
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useContext } from "react";

import { GlobalContext } from '../context';
import axios from "axios";

const Navbar = () => {
    let { state, dispatch } = useContext(GlobalContext);
  
    const logoutHandler = async () => {
        let baseUrl = "http://localhost:5000";
        try {
            let response = await axios.post(`${baseUrl}/logout`, {},
                {
                    withCredentials: true
                })
            console.log("response: ", response.data);
  
            dispatch({ type: "USER_LOGOUT" })
  
        } catch (e) {
            console.log("Error in api call: ", e);
        }
    }
    return (
    <Nav>
        
    <div className="menuIcon">
   
        <div className="navbar-list"> 
        {(state.isLogin === true)?////authgaurd//jwt work
    <>  
        <li>
          <NavLink className='navbar-link' to='/'>Home</NavLink>
            </li>  
               <li>
                    <NavLink className='navbar-link' to="/profile">Profile</NavLink>
                </li>

                <li>
                    <NavLink className='navbar-link' to="/product">Product</NavLink>
                </li>
                <li>
                    <NavLink className='navbar-link' to="/shop">Shop</NavLink>
                </li>
                <li>
                    <NavLink className='navbar-link' to="/cart">Cart</NavLink>
                </li>
                <li>
                    <NavLink className='navbar-link' to="/login" onClick={logoutHandler}>Logout</NavLink>
                </li> </>
        :null
        }
        {(state.isLogin === false)?
        <>
            <li>
        <NavLink className='navbar-link' to="/login">Login</NavLink>
           </li>
           <li>
                    <NavLink className='navbar-link' to="/signup">Signup</NavLink>
                </li> </>
    :null
    }
    {(state.isLogin === null)?
    <>loding...</>
:null
}
</div>
        </div>
    </Nav>
  )
}

const Nav = styled.nav`

.navbar-list{
    display:flex;
    gap:1.75rem;
    
     li{
        list-style:none; 
        .navbar-link{
            &:link,
            &:visited{
                display:inline-block;
                text-decoration:none;
                font-size:1rem;
                
                text-transform:uppercase;
                color:${({theme})=>theme.colors.black};
                transition:color 0.3s linear;
            }
          
            &:hover,
            &:active{
                color:${({theme})=> theme.colors.helper};
          }
        }
    }
}
`;
export default Navbar