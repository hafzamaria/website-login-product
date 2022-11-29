import axios from 'axios';
import { useEffect, useState } from "react";
import "./index.css"


function Product() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [editProduct, setEditProduct] = useState(null)
  const[code,setCode] = useState('')
  const [products, setProducts] = useState([])
  const [toggleRefresh, setToggleRefresh] = useState(true)

  useEffect(() => {

    let getAllProducts = async () => {
      //  let response = await axios.get('https://storage-bucket-production.up.railway.app/products');
      let response = await axios.get('http://localhost:5000/items');

      // setProducts(response.data)
      setProducts(response.data.reverse());
    }
    getAllProducts();

  }, [toggleRefresh])





  const producthandler = async (e) => {
    e.preventDefault();

    var productimage = document.getElementById("productimage");
    console.log("fileInput: ", productimage.files); // local url



    let formData = new FormData();
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax


    formData.append("title", title); // this is how you add some text data along with file
    formData.append("description", description); // this is how you add some text data along with file
    formData.append("price", price); 
    formData.append("code", code);// this is how you add some text data along with file
    formData.append("productimage", productimage.files[0]); // file input is for browser only, use fs to read file in nodejs client


    axios({
      method: 'post',
      //url: "https://storage-bucket-production.up.railway.app/product",
      url: "http://localhost:5000/item",
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    })
      .then(res => {
        console.log(`product added` + res.data);
        document.querySelector("#message").innerHTML = res.data.message;
        setToggleRefresh(!toggleRefresh)
      })
      .catch(err => {
        console.log(err);
      })
  }


  let edithandler = (e) => {
    e.preventDefault();




    axios.put(`http://localhost:5000/item/${editProduct?._id}`,

      // axios.put(`https://storage-bucket-production.up.railway.app/product/${editProduct?._id}`,
      {
        title: editProduct.title,
        price: editProduct.price,
        description: editProduct.description,
         code:editProduct.code
      }
    )
      .then(function (response) {
        console.log("updated: ", response.data);

        setToggleRefresh(!toggleRefresh);
        setEditProduct(null);

      })


      .catch(function (e) {
        console.log("Error in api call: ", e);

      }


      )
  }


  return (
    <div className='flex1'>
      <div className="main">
  <div className='start'>
  <h2 className='product-form'>PRODUCT FORM</h2>
  </div>

        <form onSubmit={producthandler}>
          
          title: <input name="title" type="text" value={title} placeholder="" id='title' onChange={(e) => { setTitle(e.target.value) }} />
          <br />
          description: <input name="description" type="text" placeholder="" id='description' onChange={(e) => { setDescription(e.target.value) }} />
          <br />
          price: <input name="price" type="Number" placeholder="" id='price' onChange={(e) => { setPrice(e.target.value) }} />
          <br />
          code: <input name="code" type="Number" placeholder="" id='code' onChange={(e) => { setCode(e.target.value) }} />
          <br />
          productimage: <input className='' type="file" id="productimage" accept='image/*'
            onChange={() => {
              ////// to display imager instantly on screen
              var productimage = document.getElementById("productimage");
              var url = URL.createObjectURL(productimage.files[0])
              console.log("url: ", url);
              document.getElementById("img").innerHTML = `<img width="170px" src="${url}" alt="" id="img"> `
            }} />


<div className="sign">
        <div width='170PX'  id="img"></div>

        <div className="msg">
          <button className="but" type="submit">
            Submit
          </button>
          <p className="message" id="message"></p>
        </div>
      </div>
        </form>
       
        </div>
    

     


        {(editProduct !== null) ?
          (<div className='main'>
            <form onSubmit={edithandler}>
              <h1>EDIT FORM</h1>
              title : <input type="text" onChange={(e) => {
                setEditProduct({ ...editProduct, title: e.target.value })
              }} value={editProduct?.title} /> <br />

              description : <input type="text" onChange={(e) => {
                setEditProduct({ ...editProduct, description: e.target.value })
              }} value={editProduct?.description} /> <br />

              price : <input type="number" onChange={(e) => {
                setEditProduct({ ...editProduct, price: e.target.value })
              }} value={editProduct?.price} /> <br />

              code : <input type="number" onChange={(e) => {
                setEditProduct({ ...editProduct, code: e.target.value })
              }} value={editProduct?.code} /> <br />

              <button className='but'>edit product</button>
            </form>
          </div>) : null
        }
       


      {/* <h1>Product List: </h1> */}

      <div className='result'>
        <div className="map1">
        {products.map(eachProduct => (
          <div className="key1" key={eachProduct.id}>
            <div className='img1'>
              <img className="pic" width="200px" src={eachProduct.productimage} alt="" /> 
              </div>
              <div className="detail">
              <p className="name1">{eachProduct.title}</p>
              <p className='description'>{eachProduct.description}</p>
              <p className='code'>{eachProduct.code}</p>
              <p className="price"><span className='price'>{eachProduct.price}</span><span>pkr</span></p>
              </div>
              <div className="buttons">
              <button onClick={() => {
                axios({
                  url: `http://localhost:5000/item/${eachProduct._id}`,
                  // url: `https://storage-bucket-production.up.railway.app/product/${eachProduct._id}`,
                  method: "delete",

                })
                  .then(function (response) {
                    console.log(response.data)
                    setToggleRefresh(!toggleRefresh)
                  })
                  .catch(function (error) {
                    console.log('error', error)
                  })



              }

              }>delete</button> <br />
              <button onClick={() => {
                setEditProduct({
                  _id: eachProduct?._id,
                  title: eachProduct?.title,
                  description: eachProduct?.description,
                  price: eachProduct?.price,
                   code:eachProduct.code
                })
              }}>edit product</button>


</div>
              
            </div>
          
        ))}
      </div>




</div>
    </div>
  );
}

export default Product;
