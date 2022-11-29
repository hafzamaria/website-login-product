// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from 'axios'
// import './index.css'

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         kidswish
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const theme = createTheme();

// export default function Signup() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//       firstName : data.get('firstName'),
//       lastName : data.get('lastName'),
//       agree : data.get('agree')
//     });

//     let baseUrl = "http://localhost:5000";
   
//     axios.post(`${baseUrl}/signup`, {
//       email : data.get('email'),
//       password : data.get('password'),
//       firstName : data.get('firstName'),
//       lastName : data.get('lastName')
      
//      })
//      .then(function (response) {
//        console.log("response:" ,response.data.message);
//        alert(response.data.message);
       
       
//      })
//      .catch(function (error) {
//        console.log("error in api call" , error);
//        alert(error.response.data.message)
//      });

//   };
//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="firstName"
//                   required
//                   fullWidth
//                   id="firstName"
//                   label=" firstName"
//                   autoFocus
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="lastName"
//                   label="Last Name"
//                   name="lastName"
//                   autoComplete="family-name"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="address"
//                   label="address"
//                   type="text"
//                   id="address"
                  
//                 />
//               </Grid>
              
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={<Checkbox name='agree' value="allowExtraEmails" color="primary" />}
//                   label="I want to receive inspiration, marketing promotions and updates via email."
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign Up
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 5 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }



import axios from "axios";
import { useEffect, useState } from "react";

import "./index.css";

function Signup() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [users, setUsers] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(true);

  useEffect(() => {
    let getAllUsers = async () => {
      // let response = await axios.get("https://crud--crud-app.herokuapp.com/users");
      let response = await axios.get("http://localhost:5000/users");
      setUsers(response.data.data.reverse());
    };
    getAllUsers();
  }, [toggleRefresh]);

  const doSignup = async (e) => {
    e.preventDefault();

    var profilePictureInput = document.getElementById("profilePictureInput");
    console.log("fileInput: ", profilePictureInput.files); // local url

    let formData = new FormData();
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax

    formData.append("firstName", firstName); 
    formData.append("lastName", lastName);// this is how you add some text data along with file
    formData.append("email", Email); // this is how you add some text data along with file
    formData.append("password", Password); // this is how you add some text data along with file
    formData.append("profilePicture", profilePictureInput.files[0]); // file input is for browser only, use fs to read file in nodejs client
//////////////////

   
//     
///////////////////////
let baseUrl = "http://localhost:5000";
    axios({
      method: "post",
      url: "http://localhost:5000/signup",
    // axios.post(`${baseUrl}/signup`, {
      // url: "https://crud--crud-app.herokuapp.com/signup",///after backend deploy connect url instead of local host
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      // withCredentials: true
    })
      .then((res) => {
        console.log(`upload Success` + res.data);
        console.log(res.data)
        document.querySelector("#message").innerHTML = res.data.message;
        setToggleRefresh(!toggleRefresh);
      })
      .catch((err) => {
        console.log(err);
        document.querySelector("#message").innerHTML = err.res.data.message;
      });
  };

  return (
    <>
  
      <div className="flex">
        <div className="main">
          <div className="start">
            <h1>Signup Form</h1>
            <p class="para">please fill in this form to create an account!</p>
          </div>

          <form onSubmit={doSignup}>
            <div className="in1">
              FirstName:{" "}
              <input
                name="firstname"
                type="text"
                placeholder="firstName"
                id="firstName"
                onChange={(e) => {
                  setfirstName(e.target.value);
                }}
              />
               lastName:{" "}
              <input
                name="lastName"
                type="text"
                placeholder="LastName"
                id="lastName"
                onChange={(e) => {
                  setlastName(e.target.value);
                }}
              />
            </div>
            <br />
            Email:{" "}
            <input
              className="in1"
              name="email"
              type="email"
              placeholder="Email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            Password:{" "}
            <input
              className="in1"
              name="password"
              type="password"
              placeholder="Password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            Profile Picture:{" "}
            <input
              className="profile"
              type="file"
              id="profilePictureInput"
              accept="image/*"
              onChange={() => {
                ////// to display imager instantly on screen
                var profilePictureInput = document.getElementById(
                  "profilePictureInput"
                );
                var url = URL.createObjectURL(profilePictureInput.files[0]);
                console.log("url: ", url);
                document.getElementById(
                  "img"
                ).innerHTML = `<img width="200px" src="${url}" alt="" id="img"> `;
              }}
            />
            <div className="sign">
              <div id="img"></div>

              <div className="msg">
                <button className="but" type="submit">
                  Signup
                </button>
                <p className="message" id="message"></p>
              </div>
            </div>
          </form>
          <p id="message"></p>
        </div>
      </div>
      <div className='container'>
      <div className="result">
        <div className="map">
          {users.map((eachUser) => (
            <div className="key" key={eachUser.id}>
              <img className="img" src={eachUser.profilePicture} alt="" />
              <p className="name">{eachUser.firstName} {eachUser.lastName}</p>
              <br />
              {/* <span>{eachUser.email}</span> */}
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}


export default Signup;

