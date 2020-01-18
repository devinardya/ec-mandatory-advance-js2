import React from "react";
import {Link} from 'react-router-dom';
import { MdAddCircle } from "react-icons/md";
import { MdHome } from "react-icons/md";

class Navigation extends React.Component{
    render(){
        return <nav>
                    <Link style={{marginRight: "15px", marginLeft: "15px"}} to="/"><MdHome className="nav-icon" size="20px" color="rgb(10, 151, 161)" /> Home</Link>
                    <Link style={{marginRight: "0px", marginLeft: "15px"}} to="/addmovie"><MdAddCircle className="nav-icon" size="20px" color="rgb(10, 151, 161)" /> Add Movie</Link>
                </nav>
                
    }
}

export default Navigation;