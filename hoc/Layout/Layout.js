import React,{Component} from "react";
import Aux from "../Auxi/Auxi";
import "./Layout.css";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../Components/Navigation/SideDrawer/SideDrawer"
class Layout extends Component{
    state={
        showSideDrawer:false
    }

    sidedrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{ return{showSideDrawer: !prevState.showSideDrawer}; })
    }
    render(){
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                open={this.state.showSideDrawer}
                closed={this.sidedrawerClosedHandler}/>
                <main className="content">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;