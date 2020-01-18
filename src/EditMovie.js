import React from 'react';
import {Helmet} from "react-helmet";
import './EditMovie.css'
import axios from 'axios';
import Navigation from './Navigation';
import BeautyStars from 'beauty-stars';
import Form from './Form'

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

let url = "http://3.120.96.16:3001/movies/";

class EditMovie extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          title : "",
          description : "",
          director: "",
          rating: 0,
          items: {},
          status: false,
          error: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangeDir = this.onChangeDir.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onGetData = this.onGetData.bind(this);
    
      }

      componentDidMount() {
        let idPage = this.props.match.params.id;
      
        this.onGetData(idPage);

    }

      onGetData(idPage){
        axios.get(url+ idPage)
        .then(res => {
          console.log(res)
        const movies = res.data;
        //console.log(movies)
          this.setState({title: movies.title,
                        description: movies.description,
                        rating: movies.rating,
                        director: movies.director,
          })
        })
      }
/* 
      onChangeTitle(e){
          this.setState({title: e.target.value});
      } 

      onChangeDesc(e){
          this.setState({description: e.target.value});
      } 

      onChangeDir(e){
          this.setState({director: e.target.value});
      } 

      onChangeRating(e){
          this.setState({rating: e.target.value});
      }  */
      
      onChangeTitle(value){
        this.setState({title: value});
    } 

      onChangeDesc(value){
          this.setState({description: value});
      } 

      onChangeDir(value){
          this.setState({director: value});
      } 

      onChangeRating(value){
          this.setState({rating: value});
      } 
      
    onSubmit(status){
       
        let idPage = this.props.match.params.id;
        let newInput = {
          title: this.state.title,
          description: this.state.description,
          director: this.state.director,
          rating: this.state.rating,
        }
        axios.put(url+idPage, newInput, {
          cancelToken: source.token
        })
        
        .then(function (response) {
          console.log(response);
        })
        .then( () => {
          this.setState({status: status})
          this.setState({error: false})
          let idPage = this.props.match.params.id;
          this.onGetData(idPage)
        })
        .catch((error) => {
          console.log(error);
          this.setState({error: true})
        });
        

    }

    render(){
    /* 
        let oldMovieData = this.state.items;
        console.log(oldMovieData.title)

        let localDataToEdit = [];
        
        if (oldMovieData !== undefined){
          localDataToEdit.push(oldMovieData);
        } */

        let warning;
        let printData;
        if (!this.state.status){
            printData = (<Form
                            onSubmit = {this.onSubmit} 
                            description = {this.state.description} onChangeDesc = {this.onChangeDesc} 
                            director = {this.state.director} onChangeDir = {this.onChangeDir} 
                            rating = {this.state.rating} onChangeRating = {this.onChangeRating} 
                            title = {this.state.title} onChangeTitle = {this.onChangeTitle}
                          />
                        )
        } else {
            printData = (<div className = "confirmation">
                            <h2>Changes has been saved!</h2>
                            <h4>{this.state.title}</h4>
                            <h5>Rating: <span><BeautyStars value={this.state.rating} size="15px" inactiveColor="#d1d1d1" activeColor="orange"/></span></h5>
                            <h5>Director: {this.state.director}</h5>
                            <p>{this.state.description}</p>
                         </div>
                        )
        }

        if (this.state.error){
          warning = (<div className = "warning">
                        <p>Error! Changes can not be saved.</p>
                  </div>)
        } else {
          warning = (<div className = "warning">
                        <p></p>
                  </div>)
        }

        return <div id="movie-directory">
                    <Helmet>
                        <title>Edit Movie</title>
                    </Helmet>
                    <header>
                         <Navigation/>    
                          <h1>Edit Movie</h1>
                          <h4>Share your favorite movies with everyone</h4>  
                    </header>
                    {warning}
                    {printData}
                </div>
    }

}

export default EditMovie;