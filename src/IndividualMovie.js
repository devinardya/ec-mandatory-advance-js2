import React from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import Navigation from './Navigation';
import BeautyStars from 'beauty-stars';
import './IndivMovie.css';
import {Link} from 'react-router-dom';
import { MdChevronLeft } from "react-icons/md";
import {Redirect} from 'react-router-dom';

let url = "http://3.120.96.16:3001/movies/";
class IndividualMovie extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          items: {},
          error: false,
          redirect: false
        };
    
      }

    componentDidMount() {
        
      let idPage = this.props.match.params.id;

        axios.get(url+ idPage)
        .then(res => {
          console.log(res)
         const movies = res.data;
         //console.log(movies)
          this.setState({items: movies})
        }).catch((error) => {
          console.log(error);
          this.setState({error: true})
        });

    }

    onDelete(id){
      axios.delete(url+id)
      .then(() => {
        this.setState({redirect: true})
      })
          
  }

    render(){


        console.log(this.state.items);
        let movie = this.state.items;
        let renderPage;
        let idPage = this.props.match.params.id;
        let editUrl = "/editmovie/" + idPage;

        if (this.state.redirect){
          return <Redirect to="/" />;
      }


        if (!this.state.error){
            renderPage = (<div className="content">
                              <h2>{movie.title}</h2>
                              <h5 className="content-dir">Ratings: <span><BeautyStars value={movie.rating} size="15px" inactiveColor="#d1d1d1" activeColor="orange"/></span></h5>
                              <h3 className="content-dir">Director: {movie.director}</h3>
                              <p>{movie.description}</p>
                              <div className="buttons">
                                 <button className="buttons-info delete" onClick = {() => this.onDelete(movie.id)}>Delete</button>
                                 <button className="buttons-info edit" ><Link style={{marginRight: "10px"}} to={editUrl}>Edit</Link></button>
                              </div>
                              <p className="back-button"><Link style={{marginRight: "15px", marginLeft: "0px", color: "rgb(10, 151, 161)"}} to="/"><MdChevronLeft className="nav-icon" size="20px" color="rgb(10, 151, 161)"/> Back to movies directory</Link></p>
                          </div>
                         )
        }else {
           renderPage = (<div className="content">
                              <h2>ERROR 404</h2>
                              <h2>Oops! The movie that you are looking for is not here!</h2>
                              <p>Maybe the link is not complete or the page has been removed.</p>
                              <p className="back-button"><Link style={{marginRight: "15px", marginLeft: "0px", color: "rgb(10, 151, 161)"}} to="/"><MdChevronLeft className="nav-icon" size="20px" color="rgb(10, 151, 161)"/> Back to movies directory</Link></p>
                          </div>
                        )
        }

        return <div id="movie-directory">
                    <Helmet>
                        <title>{movie.title}</title>
                    </Helmet>
                    <header>
                        <Navigation/>  
                         <h1>Movie Info</h1>     
                    </header>
                    {renderPage}
                </div>
    }

}

export default IndividualMovie;