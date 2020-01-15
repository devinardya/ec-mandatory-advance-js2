import React from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

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
         
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangeDir = this.onChangeDir.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
    
      }

      componentDidMount() {
        let idPage = this.props.match.params.id;
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        axios.get("http://3.120.96.16:3001/movies/"+ idPage, {
          cancelToken: source.token
        }).then(res => {
          console.log(res)
         const movies = res.data;
         //console.log(movies)
          this.setState({items: movies})
        }).catch(function (thrown) {
          if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
          } else {
            // handle error
          }
        });

        
        // cancel the request (the message parameter is optional)
        source.cancel('Operation canceled by the user.');
     
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
       let idPage = this.props.match.params.id;
       let newInput = {
        title: this.state.title,
        description: this.state.description,
        director: this.state.director,
        rating: this.state.rating,
       }
       axios.put('http://3.120.96.16:3001/movies/'+idPage, newInput, {
        cancelToken: source.token
      })
       
      .then(function (response) {
        console.log(response);
        
      })
      .then(() => {
        this.setState({status: true})
      })
      .catch((error) => {
        console.log(error);
      });
      

   }

    render(){
    
        let oldMovieData = this.state.items;
        console.log(oldMovieData.title)

        let warning;
        if (this.state.status){
            warning = <p>Changes Success!</p>;
        } else {
            warning = <p>Changes Failed!</p>;
        }

        return <div id="movie-directory">
                    <Helmet>
                        <title>Edit Movie</title>
                    </Helmet>
                    <h1>Edit Movie</h1>
                    <form onSubmit={this.onSubmit}>
                        <input className="input-box" type="text" placeholder={oldMovieData.title} title={this.state.value} onChange={this.onChangeTitle}/>
                        <input className="input-box" type="text" placeholder={oldMovieData.description} description={this.state.value} onChange={this.onChangeDesc}/>
                        <input className="input-box" type="text" placeholder={oldMovieData.director} director={this.state.value} onChange={this.onChangeDir}/>
                        <input className="input-box" type="text" placeholder={oldMovieData.rating} rating={this.state.value} onChange={this.onChangeRating}/>
                        <button>Submit</button>
                    </form>
                    {warning}
                </div>
    }

}

export default EditMovie;