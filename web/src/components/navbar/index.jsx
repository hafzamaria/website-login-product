import { Link } from "react-router-dom";
import "./index.css";
import { useContext } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";

///////////jwt work/////
export default function NavBar() {

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

///////////////////
  return (
    <nav className='nav'>
    <div className="userName">{state?.user?.firstName} {state?.user?.lastName}</div>
    {(state.isLogin === true)?////authgaurd//jwt work
    <ul>
        <li> <Link to="/">Home</Link>             </li>
        <li> <Link to="/profile">Profile</Link>       </li>
        <li> <Link to="/product">Product</Link>   </li>
        <li> <Link to="/shop">Shop</Link>   </li>
        <li> <Link to="/cart">Cart</Link>   </li>
        <li> <Link to="/login" onClick={logoutHandler}>Logout</Link>  </li>
        </ul>
        :null
        }
        {(state.isLogin === false)?
        <ul>
        <li> <Link to="/login">Login</Link>       </li>
        <li> <Link to="/signup">Signup</Link>     </li>
   
    </ul>
    :null
    }
    {(state.isLogin === null)?
    <>loding...</>
:null
}
</nav>
)
}