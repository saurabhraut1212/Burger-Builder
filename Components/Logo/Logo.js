import React from "react";
import burgerImage from "../../assets/Images/burger.png"
import "./Logo.css"
const Logo =(props)=>(
 <div className="Logo" style={{height:props.height}}>
   <img src={burgerImage} alt="Myburger"/>
 </div>
)
export default Logo;

