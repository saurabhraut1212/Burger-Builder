import React from "react";
import "./Burger.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
//import BurgerBuilder from "../../Container/BurgerBuilder/BurgerBuilder"
const Burger =(props)=>{

    let TransformedIngredients=Object.keys(props.ingredients)
    .map(igkey=>{
        return [...Array(props.ingredients[igkey])].map((_,i)=>{return <BurgerIngredients key={igkey+i} type={igkey}/>

        });

    }).reduce((arr,el)=>{return arr.concat(el)},[]);

    if(TransformedIngredients.length===0){
            TransformedIngredients=<p>Please start adding ingredients</p>
    }
    return(
        
        <div className="burger">
            <BurgerIngredients type="bread-top"/>
            {TransformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    )
}
export default Burger;
