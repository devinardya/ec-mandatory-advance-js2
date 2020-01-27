import React from 'react';
import {Helmet} from "react-helmet";
import './EditMovie.css'
import axios from 'axios';
import Navigation from './Navigation';
import Form from './Form'
import {Link} from 'react-router-dom';
import { MdChevronLeft } from "react-icons/md";


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
          error404: false,
          redirect: false,
          errorNum: 0,
        };

        this.source = undefined;
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

        let CancelToken = axios.CancelToken;
        this.source = CancelToken.source();

        axios.get(url+ idPage, {
            cancelToken: this.source.token
          })
        .then(res => {
          console.log(res)
        const movies = res.data;
        //console.log(movies)
          this.setState({title: movies.title,
                        description: movies.description,
                        rating: movies.rating,
                        director: movies.director,
          })
        }).catch((error) => {
          console.log(error);
          this.setState({error404: true});
        });
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
        
          let idPage = this.props.match.params.id;
          let newInput = {
            title: this.state.title,
            description: this.state.description,
            director: this.state.director,
            rating: this.state.rating,
          }
          axios.put(url+idPage, newInput)
          .then(function (response) {
            console.log(response);
          })
          .then( () => {
            this.setState({status: status})
            this.setState({error: false})
            this.props.history.goBack();
          /*   let idPage = this.props.match.params.id;
            this.onGetData(idPage) */
            //this.setState({redirect: status})
          })
          .catch((error) => {
            console.log(error.response.status);
            this.setState({error: true, errorNum: error.response.status})
          });
          
      }

     componentWillUnmount(){

      axios.get(url, {
        cancelToken: this.source.token
      })
      .catch(function (thrown) {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
        } else {
          // handle error
        }
      }); 
      this.source.cancel('Operation canceled by the user.'); 

    } 

    render(){

        let warning;
        let printData;
        if (!this.state.status && !this.state.error404 && !this.state.error){
            printData = (<Form
                            onSubmit = {this.onSubmit} 
                            description = {this.state.description} onChangeDesc = {this.onChangeDesc} 
                            director = {this.state.director} onChangeDir = {this.onChangeDir} 
                            rating = {this.state.rating} onChangeRating = {this.onChangeRating} 
                            title = {this.state.title} onChangeTitle = {this.onChangeTitle}
                          />
                        )
        } 
        
        if (this.state.error404){
           printData = (<div className="content">
                              <h2>ERROR 404</h2>
                              <h2>Oops! The movie that you are looking for is not here!</h2>
                              <p>Maybe the link is not complete or the page has been removed.</p>
                              <p className="back-button"><Link style={{marginRight: "15px", marginLeft: "0px", color: "rgb(10, 151, 161)"}} to="/"><MdChevronLeft className="nav-icon" size="20px" color="rgb(10, 151, 161)"/> Back to movies directory</Link></p>
                          </div>
                        )
        } 
        
    /*    if(this.state.status && !this.state.error404) {
           printData = (<div className = "confirmation">
                            <h2>Changes has been saved!</h2>
                            <h4 className ="confirmation-title">{this.state.title}</h4>
                            <h5>Rating: <span><BeautyStars value={this.state.rating} size="15px" inactiveColor="#d1d1d1" activeColor="orange"/></span></h5>
                            <h5>Director: {this.state.director}</h5>
                            <p>{this.state.description}</p>
                            <p className="back-button" style={{marginTop: "10px", color: "#737373"}}><Link style={{marginRight: "15px", marginLeft: "0px", color: "rgb(10, 151, 161)"}} to="/"><MdChevronLeft className="nav-icon" size="20px" color="rgb(10, 151, 161)"/> Back to movies directory</Link></p>
                         </div>
                        ) 
           
        } */
      

        if (this.state.error){
            if(this.state.errorNum === 400){
              warning = (<div className = "warning">
                              <p>Error! Changes can not be saved.</p>
                              <p>Please check and make sure all inputs are correct!</p>
                        </div>)
            } else if ( this.state.errorNum === 404 ){
              warning = (<div className = "warning">
                             <p>Error! Changes can not be saved.</p>
                             <p>It seems the page has been removed.</p>
                         </div>)
            }
        
          printData = (<Form
                          onSubmit = {this.onSubmit} 
                          description = {this.state.description} onChangeDesc = {this.onChangeDesc} 
                          director = {this.state.director} onChangeDir = {this.onChangeDir} 
                          rating = {this.state.rating} onChangeRating = {this.onChangeRating} 
                          title = {this.state.title} onChangeTitle = {this.onChangeTitle}
        />
      )
        } else {
          warning = null;
        }

        return <div id="movie-directory">
                    <Helmet>
                        <title>Edit Movie</title>
                    </Helmet>
                    <header>
                         <Navigation/>    
                          <h1>Edit Movie</h1>
                    </header>
                    {warning}
                    {printData}
                </div>
    }

}

export default EditMovie;