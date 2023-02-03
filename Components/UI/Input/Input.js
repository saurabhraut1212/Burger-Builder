import React from "react";
import "./Input.css";
const input =(props)=>{
    let inputElement=null;
    const inputclass=['InputElement'];
    if(props.invalid && props.shouldValidate && props.touched){
        inputclass.push('Invalid')
    }

    switch(props.elementType){
        case ('input'):
            inputElement = <input className={inputclass.join(' ')}{...props.elementConfig} value={props.value} onChange={props.changed} />;
           break;
        case ('textarea'):
            inputElement = <textarea className={inputclass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
           break;
        case ('select'):
            inputElement = <select 
                className={inputclass.join(' ')} 
                value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option=>(
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}

            </select>;
            break;
        default: inputElement = <input className={inputclass.join(' ')}{...props.elementConfig} value={props.value} onChange={props.changed}/>
    }
    return(
        <div className="Input">
          <label className="Label">{props.label}</label>
          {inputElement}
        </div>

    )
}
export default input;