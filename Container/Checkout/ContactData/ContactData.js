import React ,{Component} from "react";
import Button from "../../../Components/UI/Button/Button";
import "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/Input/Input"
class ContactData extends Component{
  state={
    orderForm:{
      
        name: {
          elementType:'input',        //input type ,no need to write in html tag,it is dynamically handled
          elementConfig:{
            type:'text',
            placeholder:'Your name'
          },
          value:'',
          validation:{
            required:true
          },
          valid:false,
          touched:false
        },
       
     
      street: {
        elementType: 'input',        //input type ,no need to write in html tag,it is dynamically handled
        elementConfig: {
          type: 'text',
          placeholder: 'street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }, 
      Zipcode: {
        elementType: 'input',        //input type ,no need to write in html tag,it is dynamically handled
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode'
        },
        value: '',
        validation: {
          required: true,
          minlength:5,
          maxlength:5
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',        //input type ,no need to write in html tag,it is dynamically handled
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',        //input type ,no need to write in html tag,it is dynamically handled
        elementConfig: {
          type: 'text',
          placeholder: 'Your country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliverymode: {
        elementType: 'select',        //input type ,no need to write in html tag,it is dynamically handled
        elementConfig: {
        options:[
          {value:'fastest',displayValue:'Fastest'},
          { value: 'cheapest', displayValue: 'Cheapest'}
         ]
        },
        value: '',
        validation:{},
        valid:true
        
      }
      },
       formIsValid:false,
       loading:false

  }

  orderHandler=(event)=>{
    event.preventDefault();
    const formdata={};
    for(let formElementIdentifier in this.state.orderForm){
      formdata[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
     this.setState({loading:true})
     let order={
      ingredients:this.props.ingredients,
      price:this.props.price,
      orderdata:formdata
      
     
     }
     axios.post('/orders.json',order).then(response=>{
      this.setState({loading:false}); this.props.history.push('/')}).catch(error=>{
        this.setState({loading:false})
      });
     
  }

  checkValidity(value,rules){
    let isValid=true;
    if(!rules){
      return true;
    }
    if(rules.required){
      isValid=value.trim()!==''&& isValid;            //trim removes white spaces
    
    }
    if(rules.minlength){
      isValid = value.length >= rules.minlength && isValid;
    }
    if(rules.maxlength){
      isValid = value.length <= rules.maxlength && isValid
    }
    return isValid;

  }

  inputChangeHandler=(event,inputIdentifier)=>{
    const updatedForm={
      ...this.state.orderForm
    }
    const updatedFormElement={...updatedForm[inputIdentifier]};
    updatedFormElement.value=event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedForm[inputIdentifier]=updatedFormElement;
    console.log(updatedFormElement);
    updatedFormElement.touched=true;
    let formIsValid=true;
    for (let inputIdentifier in updatedForm){
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({orderForm:updatedForm,formIsValid:formIsValid})
  }
  render(){
    const orderElementArray=[];
    for (let key in this.state.orderForm) {        //key is here properties inside the orderform exa.name,country ,etc
      orderElementArray.push({
        id:key,
        config:this.state.orderForm[key]       //confing is a object created here in which all orderform info is stored in it
      });
    }      
      let form = (
      <form onSubmit={this.orderHandler}>
         
        {orderElementArray.map(element=>(
          <Input key={element.id}
          elementType={element.config.elementType}
          elementConfig={element.config.elementConfig}
          value={element.config.value}
          invalid={!element.config.valid}
          shouldValidate={element.config.validation}
          touched={element.config.touched}
          changed={(event)=>this.inputChangeHandler(event,element.id)}
          />
        )

        )}
          <Button disabled={!this.state.formIsValid}>ORDER</Button>
      </form>);
    if(this.state.loading){
        form=<Spinner/>
    }
    return(
        <div className="ContactData">
            <h4>Enter your Contact Data</h4>
           {form}
        </div>
    )
  }
}

export default ContactData;