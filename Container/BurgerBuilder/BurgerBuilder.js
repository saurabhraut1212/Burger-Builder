import React ,{Component} from "react";
import Aux from "../../hoc/Auxi/Auxi";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";



const INGREDIENTS_PRICES={
 salad:0.5,
 cheese:0.4,
 meat:1.3,
 bacon:0.7

}

class BurgerBuilder extends Component{
     state={
       ingredients: null,
       TotalPrice: 4,
       purchasable: false,
       purchasing: false,
       loading: false,
       error: false,
     }
        
      
    componentDidMount(){
      
      axios.get('https://burgerdemo-8baec-default-rtdb.firebaseio.com/orders/ingredients.json')
      .then(response=>{
        this.setState({ingredients:response.data})
      }).catch(error=>{
        this.setState({error:true})
      })
    }

    updatePurchaseSate (ingredients){
    
     const sum=Object.keys(ingredients).map(igkey=>{return ingredients[igkey]}).reduce((sum,el)=>{return sum+el},0);
     this.setState({purchasable:sum>0});
    }

    addIngredientsHandler=(type)=>{
     const oldcount=this.state.ingredients[type];
     const updatedCount=oldcount+1;
     const updatedIngredients={
      ...this.state.ingredients
     };
     updatedIngredients[type]=updatedCount;
      const priceAddition = INGREDIENTS_PRICES[type];
      const oldprice=this.state.TotalPrice;
      const newPrice=oldprice+priceAddition;
      this.setState({TotalPrice:newPrice ,ingredients:updatedIngredients})
      this.updatePurchaseSate(updatedIngredients)
    }

    removeIngredientsHandler=(type)=>{
      const oldcount = this.state.ingredients[type];
      if(oldcount<=0){
        return;
      }
      const updatedCount = oldcount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENTS_PRICES[type];
      const oldprice = this.state.TotalPrice;
      const newPrice = oldprice - priceDeduction;
      this.setState({ TotalPrice: newPrice, ingredients: updatedIngredients })
      this.updatePurchaseSate(updatedIngredients)
    }

    purchaseHandler=()=>{
      this.setState({purchasing:true})
    }

    purchaseCancleHandler=()=>{
      this.setState({purchasing:false})
    }
  
    purchaseContinueHandler=()=>{
   

      //console.log(this.props)
      // let history=useHistory();
      // history.push('/checkout')
      // this.props.history.push({
      //   pathname:'/checkout'
      // });
   
    //  this.setState({loading:true})
    //  const order={
    //   ingredients:this.state.ingredients,
    //   cost:this.state.TotalPrice,
    //   customer:{
    //       name:"saurabh",
    //       age:21,
    //       address:{
    //         city:'Indaour',
    //         pincode:413106
    //       },
    //       email:'test@test.com'
    //   },
    //   deliverymode:'fastest'
    //  }
    //  axios.post('/orders.json',order).then(response=>{
    //   this.setState({loading:false,purchasing:false})}).catch(error=>{
    //     this.setState({loading:false,purchasing:false})
    //   });
    //   alert('You continue!')
    const queryparams=[]
    for(let i in this.state.ingredients){
      queryparams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
      
    }
      queryparams.push('price='+ this.state.TotalPrice)
      const queryString = queryparams.join('&');
      this.props.history.push({
        pathname:'/checkout',
        search:'?'+ queryString
      })
    }
    render(){

      const disabledInfo={
        ...this.state.ingredients
      }

      for(let key in disabledInfo){
        disabledInfo[key]=disabledInfo[key]<=0  //return true or false
      }
      let ordersummary=null
       

        let burger=this.state.error?<p>Ingredients can't be loaded</p>:<Spinner/>
         if(this.state.ingredients){
            burger = (
             <Aux>
               <Burger ingredients={this.state.ingredients} />
               <BuildControls
                 ingredientAdded={this.addIngredientsHandler}
                 ingredientRemoved={this.removeIngredientsHandler}
                 purchasable={this.state.purchasable}
                 disabled={disabledInfo}
                 ordered={this.purchaseHandler}
                 price={this.state.TotalPrice} />
             </Aux>
           );
              ordersummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.TotalPrice}
                purcahseCancled={this.purchaseCancleHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
         }

      if (this.state.loading) {
        ordersummary = <Spinner />;
      }
         

        return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
          {ordersummary}
        </Modal>
        {burger}
      </Aux>

        )
    }
}
export default withErrorHandler(BurgerBuilder,axios);