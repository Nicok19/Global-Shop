import React from "react";
import Products from "./Api";
import "./ProductsStyles.css";

const SectionProducts = ()=>{
return(
    <div className="indexElements">
    <h2>
     Our Products
    </h2>
    <Products/>
    </div>
)
}

export default SectionProducts