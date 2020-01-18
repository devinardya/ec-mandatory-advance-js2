import React from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import Navigation from './Navigation';
import BeautyStars from 'beauty-stars';
import './IndivMovie.css';

class IndividualMovie extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          items: {},
        };
    
      }

    componentDidMount() {
        let idPage = this.props.match.params.id;
      

        axios.get("http://3.120.96.16:3001/movies/"+ idPage)
        .then(res => {
          console.log(res)
         const movies = res.data;
         //console.log(movies)
          this.setState({items: movies})
        })

    }

    render(){

        console.log(this.state.items);
        let movie = this.state.items;

        return <div id="movie-directory">
                    <Helmet>
                        <title>{movie.title}</title>
                    </Helmet>
                    <header>
                        <Navigation/>  
                         <h1>Movie Info</h1>     
                    </header>
                    <div className="content">
                        <h2>{movie.title}</h2>
                        <span><BeautyStars value={movie.rating} size="15px" inactiveColor="#d1d1d1" activeColor="orange"/></span>
                        <h3>Director: {movie.director}</h3>
                        <p>{movie.description}</p>
                    </div>
                </div>
    }

}

export default IndividualMovie;