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
          error: false,
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
        this.setState({error: false})
      })
      .catch((error) =>{
        console.log(error);
        this.setState({error: true})
      });
   }

   componentWillUnmount(){

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();  

    axios.get(url, {
      cancelToken: source.token
    })
    .catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      } else {
        // handle error
      }
    }); 
    source.cancel('Operation canceled by the user.'); 

  }

    render(){
     
       let warning;

        if (this.state.redirect){
            return <Redirect to="/" />;
        }

        if (this.state.error){
          warning = (<div className = "warning">
                        <p>Error! Movie can not be saved.</p>
                  </div>)
        } else {
          warning = null;
        }

        return <div id="movie-directory">
                    <Helmet>
                        <title>Add Movie</title>
                    </Helmet>
                    <header>
                           <Navigation/>    
                          <h1>Add Movies</h1>
                          <h3>Share your favorite movies with everyone</h3>    
                      </header>
                      {warning}
                      <Form
                          onSubmit = {this.onSubmit} 
                          description = {this.state.description} onChangeDesc = {this.onChangeDesc} 
                          director = {this.state.director} onChangeDir = {this.onChangeDir} 
                          rating = {this.state.rating} onChangeRating = {this.onChangeRating} 
                          title = {this.state.title} onChangeTitle = {this.onChangeTitle}
                         
                      />
                  
                </div>
    }

}

export default AddMovie;