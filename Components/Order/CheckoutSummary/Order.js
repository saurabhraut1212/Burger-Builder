import React from "react";
import "./Order.css"
const Order =(props)=>{
    const ingredients=[];
    for(let ingredientName in props.ingredients){
        ingredients.push(
            { name:ingredientName,
              amount:props.ingredients[ingredientName]
            });
    }

    const ingredientoutput=ingredients.map(ig=>{
        return <span 
        style={{
            textTransform:'capitalize',
            display:'inline-block',
            margin:'0 8px',
            border:'1px solid #CCC',
            padding:'5px'
        }}
        key={ig.name}>{ig.name} ({ig.amount})</span>; 
    })
    console.log(props.price);
    return(
        <div className="Order">
            <p>Ingredients:{ingredientoutput}</p>
            <p>Price:<strong>USD </strong>{Number.parseFloat(props.price).toFixed(2)}</p>
        </div>
    )
    
}
export default Order;