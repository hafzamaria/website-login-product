

import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";



function Shop() {

  const [products, setProducts] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(true);
 
  useEffect(() => {
    let getAllProducts = async () => {
      let response = await axios.get("https://crud--crud-app.herokuapp.com/products");
      setProducts(response.data.data.reverse());
    };
    getAllProducts();
  }, [toggleRefresh]);


 
  return (
    <>
      <div className="result">
        <div className="map1">
          {products.map((eachProduct) => (
            <div className="key1" key={eachProduct._id}>
              <div className="img1">
                {" "}
                <img className="pic" src={eachProduct.profilePicture} alt="" />
              </div>
              <div className="detail">
                <p className="name1">{eachProduct.name}</p>
                <br />
                <div>{eachProduct.description}</div>
                <br />
                <div className="price">{eachProduct.Price}</div>
                <br />
                <div>{eachProduct.code}</div>
                <br />
                <div className="buttons">

<button >View product</button>
<button >Add to Cart</button>
</div>
          
              
              </div>
            </div>
          ))}
        </div>

      </div>
      
    </>
  );
}

export default Shop;