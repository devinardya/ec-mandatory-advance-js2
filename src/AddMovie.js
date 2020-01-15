import React from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import {Redirect} from 'react-router-dom';

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
    } 
    
   onSubmit(e){
       e.preventDefault();
       let newInput = {
        title: this.state.title,
        description: this.state.description,
        director: this.state.director,
        rating: this.state.rating,
       }
       axios.post('http://3.120.96.16:3001/movies', newInput)
       
      .then(function (response) {
        console.log(response); 
      })
      .then( () => {
        this.setState({redirect: true})
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
                    <h1>Add Movie</h1>
                    <form onSubmit={this.onSubmit}>
                        <input className="input-box" type="text" placeholder="Title" title={this.state.value} onChange={this.onChangeTitle}/>
                        <input className="input-box" type="text" placeholder="Description" description={this.state.value} onChange={this.onChangeDesc}/>
                        <input className="input-box" type="text" placeholder="Director" director={this.state.value} onChange={this.onChangeDir}/>
                        <input className="input-box" type="text" placeholder="Rating" rating={this.state.value} onChange={this.onChangeRating}/>
                        <button>Submit</button>
                    </form>
                </div>
    }

}

export default AddMovie;