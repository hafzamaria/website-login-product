import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { stringToHash, varifyHash } from "bcrypt-inzi"
import jwt from 'jsonwebtoken' ///jwt work
import cookieParser from 'cookie-parser';///jwtwork
import fs from 'fs';
import multer from 'multer';
import admin from "firebase-admin"
const SECRET = process.env.SECRET || "topsecret";///jwt work

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser()) ///jwt work

app.use(cors({/////jwt work
    origin: ['http://localhost:3000', "*", 'https://react-login-signup-app.netlify.app'],
    credentials: true
}));

let dbURI = 'mongodb+srv://abcd:abcd@cluster0.0nsp7aq.mongodb.net/socialmrdiaBase?retryWrites=true&w=majority';
mongoose.connect(dbURI);

/////////////////////////////////////////////////////////////////////
////==================================

// https://firebase.google.com/docs/storage/admin/start

var serviceAccount ={
    "type": "service_account",
    "project_id": "mycrudapp-2ced8",
    "private_key_id": "e275436eb480aa2abccb0532e3fbe5f56bc4e8c8",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClzZdxpwugaJcZ\niJSE1BJNYo2xVaXtSR8hmZiaZzoXhuxhlqOZNrDVUmGM/mTUd6qhY9H4nZCu9K71\nZsJR6eZBtD40UU+T0E2jOV5bARu8eHBHDWtLX6xarTJgyDBFAIivM/b+3Dvq61oj\nGhim7PR2ir6okXN0N51ynz12Va3XLhg6NQFRanddxtoy5rHx4YnmqasVnMNHzHVT\nkKsYYUWFG10s+Vcp+hKe8rvXhNSMfWPLqbijITWBF6+RDJeGboMuN4u3P6zzlQpg\nmpXETcz2hS9Bo1chpv8IQz1EnVnyNBuf3XsB5ik1XID0Cn8kbtCmGBYs/k/2WX8b\nxtCInl/pAgMBAAECggEAQHapOYp5hkHz8Xz9RZGQlh7JuVdz/khOPsmRoAKffvM5\n541iiRjO8vmnLOLhwAvQvxPo2LEmRiei+I2d4qw+lnAmOUAd4Pn9nYcaDObm6kWn\nXbC1dSY7BDxPmHps7f8RpZDeKOPmteUQdBJa4FfDim1SSIbYrShMYnrQMjiIsN69\nQ2FGotGIOdbKIxYEFiFFo68S9K65aZbGxeNKGanKKXmc0pfzmb93CYmNXbJCKKic\n1OoBk1vvTC8aQ/oTh6bKq+TyBD/yq4ZMOfVgbHe0XUzxfKWpCUyOaNYd9/9onuPn\ndwrssLz9ysDYCwax8zFt48sEqwtL9QRkAGMgf7nawwKBgQDnvLxF3E9LbS6HaL/v\nNH59SFHJyDxcirXGSIjIYILbi9WFpjTMuPTIOYW+cl9q8yNZjXlPvRRLCN9GFzYF\nxAmgdVOJyKsas/pPK08K5LwMGrsQIj2H9w2K5JtoCkiBI2cV6f1kacKe4B34KL/y\niSKtnzk+Do6b1P/DG7MYrt5MIwKBgQC3KZ6rT6ZM9xw6t/HkZoSQI01CVSarv2R5\nJ6dexdXJEepENjLrSVwgzAdfFrGVUF0BAnJkkyX7OLwpm2QwvTtVXEmG/wMtq1KT\ns4IadIIgiP1tnj+UNiwqm2tc0x2oeWWe/xu5bDjVnzpv8HuAxHnQcGi325CFlbms\nCbsV5/aOgwKBgGt3IvhiyoL4BvPUp+2OMnp25zbkHNntmY5yZLxHxWd62XI5OZMW\n0q1nv5YqBAXc6y/EY9WOobKKUsB2Ux8pYi1/O1ZSMMcZX6MHOoiaunoCi21X86Dx\n+N3IVilRW35HpK6M7G18fjyfQkaq3xjib6qEhE87APdTN6iLV+rCbWRxAoGAK4mP\nF7V1GDJc2XBD5UChHgnmIXBQIt75qPrOA+8OpB7ICrK/Y8IqTflxfx7L02woz0af\nnlyD2LVhtJolNJimc+Hd8GLJhJ+Gn2k58cPj8ovdgaLuBfLiiLYszQG5uQQyLZsC\nIg8ha1XP9C+7i54oPm2Z1qowLjCq08P0Xn6m0rUCgYEAjXcWWQvkR23BAT1Q2VL+\nHlPIOP5vuBb+yO/2bEPNXSYkPvdL0uw01rND153if69J2zG6Qi4KiLDjQm/Ffag5\nwEWLz9jIvBerX4a8kEQaV9h/k33h1MbUAxg/ZKuXxvxZYDPGtBQAC+FXyeXdnpMe\nDaZMzHcvnUgWNStQG1Hy+q8=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-tscm0@mycrudapp-2ced8.iam.gserviceaccount.com",
    "client_id": "115915895330148959698",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tscm0%40mycrudapp-2ced8.iam.gserviceaccount.com"
  };
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mycrudapp-2ced8.firebaseio.com"
});
const bucket = admin.storage().bucket("gs://mycrudapp-2ced8.appspot.com");


//==============================================

const storageConfig = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
destination: './uploads/',
filename: function (req, file, cb) {

    console.log("mul-file: ", file);
    cb(null, `${new Date().getTime()}-${file.originalname}`)
}
})
var upload = multer({ storage: storageConfig })

//==============================================
///////////////////////////////////////////////////////////////
////step 01 (create schema)///this validation is for security purpose//

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, },
  password: { type: String, required: true, },
  age: { type: Number, min: 17, max: 65, default: 18 },
  // subjects:Array,
  isMarried: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now }, //go to schema type (ctrl+f)typt on box date now & copy///
});

const userModel = mongoose.model('User1', userSchema);




app.post("/login", (req, res) => {

    let body = req.body;

    if (!body.email || !body.password) { // null check - undefined, "", 0 , false, null , NaN
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
        );
        return;
    }

    // check if user already exist // query email user
    userModel.findOne(
        { email: body.email },
        // { email:1, firstName:1, lastName:1, age:1, password:0 },
        "email firstName lastName age password",
        (err, data) => {
            if (!err) {
                console.log("data: ", data);

                if (data) { // user found
                    varifyHash(body.password, data.password).then(isMatched => {

                        console.log("isMatched: ", isMatched);

                        if (isMatched) {

                            var token = jwt.sign({
                                _id: data._id,
                                email: data.email,
                                iat: Math.floor(Date.now() / 1000) - 30,
                                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                            }, SECRET);

                            console.log("token: ", token);

                            res.cookie('Token', token, {
                                maxAge: 86_400_000,
                                httpOnly: true
                            });

                            res.send({
                                message: "login successful",
                                profile: {
                                    email: data.email,
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    age: data.age,
                                    _id: data._id
                                }
                            });
                            return;
                        } else {
                            console.log("user not found");
                            res.status(401).send({ message: "Incorrect email or password" });
                            return;
                        }
                    })

                } else { // user not already exist
                    console.log("user not found");
                    res.status(401).send({ message: "Incorrect email or password" });
                    return;
                }
            } else {
                console.log("db error: ", err);
                res.status(500).send({ message: "login failed, please try later" });
                return;
            }
        })



})
app.post("/logout", (req, res) => {

    res.cookie('Token', '', {
        maxAge: 0,
        httpOnly: true
    });

    res.send({ message: "Logout successful" });
})

app.post("/signup", (req, res) => {

    let body = req.body;

    if (!body.firstName
        || !body.lastName
        || !body.email
        || !body.password
    ) {
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
        );
        return;
    }

    // check if user already exist // query email user
    userModel.findOne({ email: body.email }, (err, data) => {
        if (!err) {
            console.log("data: ", data);

            if (data) { // user already exist
                console.log("user already exist: ", data);
                res.status(400).send({ message: "user already exist,, please try a different email" });
                return;

            } else { // user not already exist

                stringToHash(body.password).then(hashString => {

                    userModel.create({
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: body.email.toLowerCase(),
                        password: hashString
                    },
                        (err, result) => {
                            if (!err) {
                                console.log("data saved: ", result);
                                res.status(201).send({ message: "user is created" });
                            } else {
                                console.log("db error: ", err);
                                res.status(500).send({ message: "internal server error" });
                            }
                        });
                })

            }
        } else {
            console.log("db error: ", err);
            res.status(500).send({ message: "db error in query" });
            return;
        }
    })
});

app.use(function (req, res, next) {
    console.log("req.cookies: ", req.cookies);

    if (!req.cookies.Token) {
        res.status(401).send({
            message: "include http-only credentials with every request"
        })
        return;
    }
    jwt.verify(req.cookies.Token, SECRET, function (err, decodedData) {
        if (!err) {

            console.log("decodedData: ", decodedData);

            const nowDate = new Date().getTime() / 1000;

            if (decodedData.exp < nowDate) {
                res.status(401).send("token expired")
            } else {

                console.log("token approved");

                req.body.token = decodedData
                next();
            }
        } else {
            res.status(401).send("invalid token")
        }
    });
})
/////////////////////////////////////////////////////
app.get("/users", async (req, res) => {

    try {
        let allUser = await userModel.find({}).exec();
        res.send(allUser);

    } catch (error) {
        res.status(500).send({ message: "error getting users" });
    }
})
////////////////////profile////////////////////
app.get("/profile", async (req, res) => {

    try {
        let user = await userModel.findOne({ _id: req.body.token._id }).exec();
        res.send(user);

    } catch (error) {
        res.status(500).send({ message: "error getting users" });
    }
})


/////==============================productSchema
const productSchema = new mongoose.Schema({

    name: { type: String },
    Price: { type: Number, required: true },
    description: { type: String, required: true },
    profilePicture: { type: String, required: true },
    code:{
        type:Number
    },

    createdOn: { type: Date, default: Date.now },
});
const productModel = mongoose.model('Productss', productSchema);
////////////////////////////////////////////////////////////////////////
app.post("/signup", upload.any(), (req, res) => {

    let body = req.body;
    console.log("file: ", req.files[0]);

    if (!body.name
        || !body.email
        || !body.password
    ) {
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "name": "John",
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
        );
        return;
    }


    // https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload-examples
    bucket.upload(
        req.files[0].path,
        {
            destination: `profilePhotos/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
        },
        function (err, file, apiResponse) {
            if (!err) {
                // console.log("api resp: ", apiResponse);

                // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 

                        // delete file from folder before sending response back to client (optional but recommended)
                        // optional because it is gonna delete automatically sooner or later
                        // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder
                        try {
                            fs.unlinkSync(req.files[0].path)
                            //file removed
                        } catch (err) {
                            console.error(err)
                        }


                        // check if user already exist // query email user
                        userModel.findOne({ email: body.email }, (err, user) => {
                            if (!err) {
                                console.log("user: ", user);

                                if (user) { // user already exist
                                    console.log("user already exist: ", user);
                                    res.status(400).send({ message: "user already exist,, please try a different email" });
                                    return;

                                } else { // user not already exist

                                    stringToHash(body.password).then(hashString => {

                                        userModel.create({
                                            name: body.name,
                                            email: body.email.toLowerCase(),
                                            password: hashString,
                                            profilePicture: urlData[0]
                                        },
                                            (err, result) => {
                                                if (!err) {
                                                    console.log("data saved: ", result);
                                                    console.log("user is created:", result )
                                                    res.status(201).send({
                                                        message: "user is created",
                                                        data: {
                                                            name: body.name,
                                                            email: body.email.toLowerCase(),
                                                            profilePicture: urlData[0]
                                                        }
                                                   
                                                    });
                                                } else {
                                                    console.log("db error: ", err);
                                                    res.status(500).send({ message: "internal server error" });
                                                }
                                            });
                                    })

                                }
                            } else {
                                console.log("db error: ", err);
                                res.status(500).send({ message: "db error in query" });
                                return;
                            }
                        })
                    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });
});
////======================last step===========

app.get('/users', async (req,res)=>{
    try{
        let users= await userModel.find({}).exec();
        console.log("all users" , users);

        res.send({
            message:'all users',
            data : users
        });

    }catch{ (err) => {
        res.status(500).send({
            message:'failed to get users'
        });
    }

    }
})

/////=========product===========


app.post("/product",  upload.any(), (req, res) => {

    let body = req.body;

    console.log("body: ", body);
    // console.log("body: ", body.name);
    // console.log("body: ", body.email);
    // console.log("body: ", body.password);

    console.log("file: ", req.files[0]);

   


    // https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload-examples
    bucket.upload(
        req.files[0].path,
        {
            destination: `profilePhotos/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
        },
        function (err, file, apiResponse) {
            if (!err) {
                // console.log("api resp: ", apiResponse);

                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 
                        try {
                            fs.unlinkSync(req.files[0].path)
                            //file removed
                        } catch (err) {
                            console.error(err)
                        }
                    }
                    console.log("product received: ", req.body);
               

    let newProduct = new productModel({
        name:req. body.name,
        description: req.body.description,
        Price: req.body.price,
        code:req. body.code,
        profilePicture: urlData[0]
    })
    try {
        let response =  newProduct.save()
        console.log("product added: ", response);

        res.send({
            message: "product added",
            data: response
        });
    } catch (error) {
        res.status(500).send({
            message: "failed to add product"
        });
    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });









});


app.get("/profile", async (req, res) => {

    try {
        let product = await productModel.findOne({ _id: req.body.token._id }).exec();
        res.send(product);

    } catch (error) {
        res.status(500).send({ message: "error getting product" });
    }
})

////======================last step===========

app.get('/products', async(req,res)=>{
    try{
        let products= await productModel.find({}).exec();
        console.log("all products" , products);

        res.send({
            message:'all products',
            data : products
        });

    }catch{ (err) => {
        res.status(500).send({
            message:'failed to get products'
        });
    }

    }
});

app.delete("/product/:id", async (req, res) => {

    console.log("product received: ", req.body);

    try {
        let deleted = await productModel.deleteOne({ _id: req.params.id })
        console.log("product deleted: ", deleted);

        res.send({
            message: "product deleted",
            data: deleted
        });
    } catch (error) {
        res.status(500).send({
            message: "failed to delete product"
        });
    }
})

///////////////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () { //connected
    console.log("mongoose connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});


process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});

//////////////////////////////////////

// app.post("/signup", (req, res) => {

    //     let body = req.body;
    
    //     if (!body.firstName
    //         || !body.lastName
    //         || !body.email
    //         || !body.password
    //     ) {
    //         res.status(400).send(
    //             `required fields missing, request example: 
    //                 {
    //                     "firstName": "John",
    //                     "lastName": "Doe",
    //                     "email": "abc@abc.com",
    //                     "password": "12345"
    //                 }`
    //         );
    //         return;
    //     }
    
    //     // check if user already exist // query email user
    //     userModel.findOne({ email: body.email }, (err, data) => {
    //         if (!err) {
    //             console.log("data: ", data);
    
    //             if (data) { // user already exist
    //                 console.log("user already exist: ", data);
    //                 res.status(400).send({ message: "user already exist,, please try a different email" });
    //                 return;
    
    //             } else { // user not already exist
    
    //                 stringToHash(body.password).then(hashString => {
    
    //                     userModel.create({
    //                         firstName: body.firstName,
    //                         lastName: body.lastName,
    //                         email: body.email.toLowerCase(),
    //                         password: hashString
    //                     },
    //                         (err, result) => {
    //                             if (!err) {
    //                                 console.log("data saved: ", result);
    //                                 res.status(201).send({ message: "user is created" });
    //                             } else {
    //                                 console.log("db error: ", err);
    //                                 res.status(500).send({ message: "internal server error" });
    //                             }
    //                         });
    //                 })
    
    //             }
    //         } else {
    //             console.log("db error: ", err);
    //             res.status(500).send({ message: "db error in query" });
    //             return;
    //         }
    //     })
    // });}


/////hm jtni b cheze database mai save karege sbke liye schema & model bnana hoga////

// app.post("/signup", (req, res) => {

//   let body = req.body;

//   if (!body.firstName  ////its a validation///
//       || !body.lastName
//       || !body.email
//       || !body.password
//   ) {
//       res.status(400).send(  ////we guide user by givinging eg//
//           `required fields missing, request example: 
//               {
//                   "firstName": "John",
//                   "lastName": "Doe",
//                   "email": "abc@abc.com",
//                   "password": "12345"
//               }`
//       );
//       return;
//   }

//   //////step04//////
//   let dbURI = 'mongodb+srv://abcd:abcd@cluster0.0nsp7aq.mongodb.net/socialmrdiaBase?retryWrites=true&w=majority';
//   mongoose.connect(dbURI);
//   // check if user already exist // query email user
//   userModel.findOne({ email: body.email }, (err, data) => {
//       if (!err) {
//           console.log("data: ", data);

//           if (data) { // user already exist
//               console.log("user already exist: ", data);
//               res.status(400).send({ message: "user already exist,, please try a different email" });
//               return;

//           } else { // user not already exist

//             stringToHash(body.password).then(hashString => {

//                 userModel.create({
//                     firstName: body.firstName,
//                     lastName: body.lastName,
//                     email: body.email.toLowerCase(),
//                     password: hashString
//                 },
//                     (err, result) => {
//                         if (!err) {
//                             console.log("data saved: ", result);
//                             res.status(201).send({ message: "user is created" });
//                         } else {
//                             console.log("db error: ", err);
//                             res.status(500).send({ message: "internal server error" });
//                         }
//                     });
//             })

//         }
//     } else {
//         console.log("db error: ", err);
//         res.status(500).send({ message: "db error in query" });
//         return;
//     }
// })
// });



/////signup
// app.post("/signup", (req, res) => {

//     let body = req.body;
  
//     if (!body.firstName  ////its a validation///
//         || !body.lastName
//         || !body.email
//         || !body.password
//     ) {
//         res.status(400).send(  ////we guide user by givinging eg//
//             `required fields missing, request example: 
//                 {
//                     "firstName": "John",
//                     "lastName": "Doe",
//                     "email": "abc@abc.com",
//                     "password": "12345"
//                 }`
//         );
//         return;
//     }
  
//     //////step04//////
    
//     // check if user already exist // query email user
//     userModel.findOne({ email: body.email }, (err, data) => {
//         if (!err) {
//             console.log("data: ", data);
  
//             if (data) { // user already exist
//                 console.log("user already exist: ", data);
//                 res.status(400).send({ message: "user already exist,, please try a different email" });
//                 return;
  
//             } else { // user not already exist
  
//                 stringToHash(body.password).then(hashString => {
  
//                     let newUser = new userModel({
//                         firstName: body.firstName,
//                         lastName: body.lastName,
//                         email: body.email.toLowerCase(),
//                         password: hashString,
//                         _id: data._id
//                         // password:body.password,
//                     });
//                     newUser.save((err, result) => {
//                         if (!err) {
//                             console.log("data saved: ", result);
//                             res.status(201).send({ message: "user is created" });
//                         } else {
//                             console.log("db error: ", err);
//                             res.status(500).send({ message: "internal server error" });
//                         }
//                     });
//                 })
  
//             }
//         } else {
//             console.log("db error: ", err);
//             res.status(500).send({ message: "db error in query" });
//         }
//     })
//   });


  ////jwt work token verification

// app.use(function (req, res, next) {
//     console.log("req.cookies: ", req.cookies);

//     if (!req.cookies.Token) {
//         res.status(401).send({
//             message: "include http-only credentials with every request"
//         })
//         return;
//     }
//     jwt.verify(req.cookies.Token, SECRET, function (err, decodedData) {
//         if (!err) {

//             console.log("decodedData: ", decodedData);

//             const nowDate = new Date().getTime() / 1000;

//             if (decodedData.exp < nowDate) {
//                 res.status(401).send("token expired")
//             } else {

//                 console.log("token approved");

//                 req.body.token = decodedData
//                 next();
//             }
//         } else {
//             res.status(401).send("invalid token")
//         }
//     });
// })
  /////login///
// app.post("/login", (req, res) => {
//     console.log("error" , error)
//     let body = req.body;

//     if (!body.email || !body.password) { // null check - undefined, "", 0 , false, null , NaN
//         res.status(400).send(
//             `required fields missing, request example: 
//                 {
//                     "email": "abc@abc.com",
//                     "password": "12345"
//                 }`
//         );
//         return;
//     }

//     // check if user already exist // query email user
//     userModel.findOne( { email: body.email },
//         'email firstName lastName age password', ///this is called projection
//         (err, data) => {
//         if (!err) {
//             console.log("data: ", data);

//             if (data) { // user found
//                 varifyHash(body.password, data.password).then(isMatched => {

//                     console.log("isMatched: ", isMatched);

//                     if (isMatched) {
//                         // TODO:  add JWT token

//                         var token = jwt.sign({ ////jwt work
//                             _id: data._id,
//                             email: data.email,
//                             iat: Math.floor(Date.now() / 1000) - 30, ///issue at
//                             exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),////expire
//                         }, SECRET);

//                         console.log("token: ", token);

//                         res.cookie('Token', token, {
//                             maxAge: 86_400_000, ////after 24hours expire
//                             httpOnly: true ////http cookie is secure
//                         });

//                         ///////token---cokies//

//                         res.send({ message: "login successful", 
//                         profile:{
//                         email:data.email,
//                         firstName:data.firstName,
//                        lastName:data.lastName},
//                        _id: data._id
//                     });
                      
//                     } else {
//                         console.log("user not found");
//                         res.status(401).send({ message: "Incorrect email or password" });
//                         return;
//                     }
//                 }   ///ismatched
//                 )   ///.then

//             }   ///if(data)
//              else { // user not already exist
//                 console.log("user not found");
//                 res.status(401).send({ message: "Incorrect email or password" });
//                 return;
//             }
//         }   ///if(!err)
//          else {
//             console.log("db error: ", err);
//             res.status(500).send({ message: "login failed, please try later" });
//             return;
//         }
//     }   ///(err,data)
//     )    ///.findone



// }///login
// )//app.post


///////jwt work///
// app.post("/logout", (req, res) => {

//     res.cookie('Token', '', {
//         maxAge: 0,
//         httpOnly: true
//     });

//     res.send({ message: "Logout successful" });
// })
///////


  



//////////

// app.get("/users", async (req, res) => {

//     try {
//         let allUser = await userModel.find({}).exec();
//         res.send(allUser);

//     } catch (error) {
//         res.status(500).send({ message: "error getting users" });
//     }
// })





// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
/////jwt work//
// app.get("/profile", async (req, res) => {

//     try {
//         let user = await userModel.findOne({ _id: req.body.token._id }).exec();
//         res.send(user);

//     } catch (error) {
//         res.status(500).send({ message: "error getting users" });
//     }
// })
////////////////////////////////////////