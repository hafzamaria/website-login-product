import Login from './components/login';
import Signup from './components/signup';
import Profile from './components/profile';
import Home from './components/Home';
import Header from './components/Header';
import Contact from './components/Contact';
import {ThemeProvider} from 'styled-components';/////npm i styled components from npm react-router-dom(search(styled components))
import { GlobalStyle} from './GlobalStyle'
import Product from './components/product/index'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,

} from "react-router-dom";
import { useContext, useEffect } from 'react';
import { GlobalContext } from './context';
import axios from "axios"


import Shop from './components/shop';

import Cart from './components/cart/Cart';






function App() {
  const theme={
    colors:{
      heading : "rgb(24 24 29)",
      text: "rgb(24 24 29)",
      white : "fff",
      black : "#212529",
      helper: "#8490ff",
      bg : "rgb(249 249 255)",
      footer_bg : "#0a1435",
      btn : "rgb(98 84 243)",
      border : "rgba(98 84 243 0.5)",
      hr : "#ffffff",
      gradient: "linear-gradient(0deg,rgb(132 144 255) 0%,rgb(98 189 252) 100%)",
      shadow : "rgba(0 0 0 0.02) 0px 1px 3px 0px, rgba(27 31 35 0.15) 0px 0px 0px 1px;",
      shawdowSupport : "rgba(0 0 0 0.16) 0px 1px 4px",
  
    },
    media : {mobile : "768px" ,tab : "998px"},
    }

  let { state, dispatch } = useContext(GlobalContext);


  useEffect(() => {  //pg load hoty he profile ajaye chahy refresh kre issliye ye app ki file me dala h

    const getProfile = async () => {
      let baseUrl = "http://localhost:5000";
      try {
        let response = await axios({
          url: `${baseUrl}/profile`,
          method: "get",
          withCredentials: true
        })
        if (response.status === 200) {
          console.log("response: ", response.data);
          dispatch({  //ye relaod ya refresh pe pe data show profile ka isliye use is me nav bar kch nh aya coz hum ne route pe null likhha h 
            type: "USER_LOGIN",
            payload: response.data
          })
        } else {
          dispatch({
            type: "USER_LOGOUT"
          })
        }
      } catch (e) {
        console.log("Error in api call: ", e);
        dispatch({
          type: "USER_LOGOUT"
        })
      }
    }
    getProfile();
  }, [])
  return (
    <>
   
   <ThemeProvider theme={theme}>
    <GlobalStyle/>
      <Router>
      <Header/>
        {/* <NavBar /> */}

        <Routes>
          {(state.isLogin === true) ?
            <>  
            <Route path='/Contact' element={<Contact/>} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/product' element={<Product/>} />
              <Route path='/shop' element={<Shop/>} />
              <Route path='/cart' element={<Cart/>} />
              <Route path="/" element={<Home/>} />
              <Route path='*' element={<Navigate to ="/" />}></Route> //agr pg pe kch na dikhy tw home pe lejao

            </> : null}

          {(state.isLogin === false) ?
            <>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />

            </> : null}

          {(state.isLogin === null) ?
            <>
              <Route path="*" element={<h1>loading</h1>}></Route>
            </> :
            null}

        </Routes>
      </Router>
      </ThemeProvider>
    </>

  );
}


export default App;



// import Login from './components/login';
// import Signup from './components/signup';
// import Profile from './components/profile';
// import Home from  './components/home'
// import NavBar from './components/Navbar';
// import Cart from './components/cart/Cart';
// import './App.css';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,

// } from "react-router-dom";
// import { useContext, useEffect } from 'react';
// import { GlobalContext } from './context';
// import axios from "axios"
// import Product from './components/products';
// import Shop from './components/shop';








// function App() {

//   let { state, dispatch } = useContext(GlobalContext);


//   useEffect(() => {  //pg load hoty he profile ajaye chahy refresh kre issliye ye app ki file me dala h

//     const getProfile = async () => {
//       let baseUrl = "http://localhost:5000";
//       try {
//         let response = await axios({
//           url: `${baseUrl}/profile`,
//           method: "get",
//           withCredentials: true
//         })
//         if (response.status === 200) {
//           console.log("response: ", response.data);
//           dispatch({  //ye relaod ya refresh pe pe data show profile ka isliye use is me nav bar kch nh aya coz hum ne route pe null likhha h 
//             type: "USER_LOGIN",
//             payload: response.data
//           })
//         } else {
//           dispatch({
//             type: "USER_LOGOUT"
//           })
//         }
//       } catch (e) {
//         console.log("Error in api call: ", e);
//         dispatch({
//           type: "USER_LOGOUT"
//         })
//       }
//     }
//     getProfile();
//   }, [])
//   return (
//     <>

//       <Router>
//         <NavBar />

//         <Routes>
//           {(state.isLogin === true) ?
//             <>
//               <Route path='/profile' element={<Profile />} />
//               <Route path='/products' element={<Product/>} />
//               <Route path='/shop' element={<Shop/>} />
//               <Route path='/cart' element={<Cart/>} />
//               <Route path="/" element={<Home/>} />
//               <Route path='*' element={<Navigate to ="/" />}></Route> //agr pg pe kch na dikhy tw home pe lejao

//             </> : null}

//           {(state.isLogin === false) ?
//             <>
//               <Route path='/login' element={<Login />} />
//               <Route path='/signup' element={<Signup />} />

//             </> : null}

//           {(state.isLogin === null) ?
//             <>
//               <Route path="*" element={<h1>loading</h1>}></Route>
//             </> :
//             null}

//         </Routes>
//       </Router>

//     </>

//   );
// }


// export default App;