import React from "react";
import {Link} from 'react-router-dom';

class Navigation extends React.Component{
    render(){
        return <nav>
                    <Link style={{marginRight: "10px"}} to="/">Home</Link>
                    <Link style={{marginRight: "10px"}} to="/addmovie">Add Movie</Link>
                    <Link style={{marginRight: "10px"}} to="/editmovie">Edit Movie</Link>
                </nav>
                
    }
}

export default Navigation;