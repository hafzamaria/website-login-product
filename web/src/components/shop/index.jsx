import axios from 'axios';
import { useEffect, useState } from "react";
import "./index.css"
import {Link} from 'react-router-dom'

function Shop() {

  const [products, setProducts] = useState([])
  const [toggleRefresh, setToggleRefresh] = useState(true)

  useEffect(() => {

    let getAllProducts = async () => {
      //  let response = await axios.get('https://storage-bucket-production.up.railway.app/products');
      let response = await axios.get('http://localhost:5000/items');

      setProducts(response.data.reverse())
    }
    getAllProducts();

  }, [toggleRefresh])











 

  return (
    <div className='flex1'>
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
               <button ><Link to='/cart'>Add to cart</Link></button>
              <hr />
            </div>
          
        ))}
      </div>




</div>
    </div>
  );
}

export default Shop;