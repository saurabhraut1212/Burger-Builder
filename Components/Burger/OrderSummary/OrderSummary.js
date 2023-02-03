import React,{Component} from "react";
import Aux from "../../../hoc/Auxi/Auxi";
import Button from "../../UI/Button/Button"
class OrderSummary extends Component{

    componentDidUpdate(){
        
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igkey => {
             return <li key={igkey}> 
             <span style={{ textTransform: 'capitalize' }}>{igkey}</span>:{this.props.ingredients[igkey]}</li> });
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price:{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button clicked={this.props.purcahseCancled}>CANCEL</Button>
                <Button clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>

        )
    }
}

export default OrderSummary;