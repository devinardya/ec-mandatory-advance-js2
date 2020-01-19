import React from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Navigation from './Navigation';
import Form from './Form';

let url = "http://3.120.96.16:3001/movies/";

class AddMovie extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          title : "",
          description : "",
          director: "",
          rating: "",
          redirect: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangeDir = this.onChangeDir.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
      }

      componentDidMount() {
        //this.onGetData();
      }


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

       let newInput = {
        title: this.state.title,
        description: this.state.description,
        director: this.state.director,
        rating: this.state.rating,
       }
       axios.post(url, newInput)
       
      .then(function (response) {
        console.log(response); 
      })
      .then( () => {
        this.setState({redirect: status})
      })
      .catch((error) =>{
        console.log(error);
      });
     

   }

    render(){

        if (this.state.redirect){
            return <Redirect to="/" />;
        }

        return <div id="movie-directory">
                    <Helmet>
                        <title>Add Movie</title>
                    </Helmet>
                    <header>
                           <Navigation/>    
                          <h1>Add Movies</h1>
                          <h4>Share your favorite movies with everyone</h4>    
                      </header>
                      <Form
                          onSubmit = {this.onSubmit} 
                          description = {this.state.description} onChangeDesc = {this.onChangeDesc} 
                          director = {this.state.director} onChangeDir = {this.onChangeDir} 
                          rating = {this.state.rating} onChangeRating = {this.onChangeRating} 
                          title = {this.state.title} onChangeTitle = {this.onChangeTitle}
                         
                      />
                   {/*  <form onSubmit={this.onSubmit}>
                        <input className="input-box" type="text" placeholder="Title" title={this.state.value} onChange={this.onChangeTitle}/>
                        <input className="input-box" type="text" placeholder="Description" description={this.state.value} onChange={this.onChangeDesc}/>
                        <input className="input-box" type="text" placeholder="Director" director={this.state.value} onChange={this.onChangeDir}/>
                        <input className="input-box" type="text" placeholder="Rating" rating={this.state.value} onChange={this.onChangeRating}/>
                        <button>Submit</button>
                    </form> */}
                </div>
    }

}

export default AddMovie;