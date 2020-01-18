import React from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';
import { MdRemoveCircle } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import BeautyStars from 'beauty-stars';


let url = "http://3.120.96.16:3001/movies/";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

class MovieDirectory extends React.Component{
      constructor(props) {
        super(props);
        this.state = {
          items: [],
          redirect: false,
        };
        this.interval = null;
        this.messageList = React.createRef();
        this.onDelete = this.onDelete.bind(this);
        this.onFetch = this.onFetch.bind(this);
        this.onGetData = this.onGetData.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
      }

      componentDidMount() {
        this.onGetData();
      }

      onGetData(){
          axios.get(url)
          .then(res => {
            console.log(res)
          const movies = res.data;
          console.log(movies)
            this.setState({items: movies})
          })
      }

      componentDidUpdate(){
         this.interval = setInterval(() => {
            this.onFetch();
          }, 2000);
         
          this.scrollToBottom();   
      }


      onFetch(){
          
          axios.get(url)
          .then(res => {
            console.log(res)
            const movies = res.data;
            //console.log("res dataa", movies[movies.length-1].id);
            let savedListMovie = this.state.items;
            //console.log('this items', this.state.items[this.state.items.length-1]);

            if (movies[movies.length-1].id !== savedListMovie[savedListMovie.length-1].id){
              this.setState({items: movies});
            } 
          })   
      } 

      onDelete(id){
          axios.delete(url+id)
          .then(() => {
            this.onGetData();
          })
              
      }

      scrollToBottom(){
        const scrollHeight = this.messageList.current.scrollHeight;
        this.messageList.current.scrollTop = scrollHeight;
      }

      componentWillUnmount(){
        clearInterval(this.interval);

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

          let movies = this.state.items;
          console.log(movies);

          let localDataMovies = [];

          movies.map( movieData => {
               return localDataMovies.push(movieData);
          }) 

          console.log(localDataMovies);

          let renderTable = localDataMovies.map(movie => {
              let editUrl = "/editmovie/" + movie.id;
              let eachUrl = "/movies/" + movie.id;
              return (
                          <tr key= {movie.id}>
                              <td><Link style={{marginRight: "10px"}} to={eachUrl}>{movie.title}</Link></td>
                              <td>{movie.director}</td>
                              <td><BeautyStars value={movie.rating} size="15px" inactiveColor="#d1d1d1" activeColor="orange"/></td>
                              <td>
                                  <span><button className="options-button" onClick = {() => this.onDelete(movie.id)}><MdRemoveCircle className="options-icon"  size="15px" color="red" /> Delete</button></span>
                                  <span><button className="options-button" ><Link style={{marginRight: "10px"}} to={editUrl}><MdEdit className="options-icon" size="15px" color="green" />Edit</Link></button></span>
                              </td>
                          </tr>
                      
                      )
          })

          return <div id="movie-directory">
                      <Helmet>
                          <title>Home - Movies Directory</title>
                      </Helmet>
                      <header>
                         <Navigation/>    
                          <h1>Movies Directory</h1>
                          <h4>Share your favorite movies with everyone</h4>     
                      </header>
                      <div className="search-box">
                        <form className="search">
                            <input type="text" placeholder="search movie"/>
                            <button><MdSearch size="15px" color="grey"/></button>
                        </form>
                      </div>
                      <div className="movie-list" ref={this.messageList}>
                          <table>
                              <thead>
                                  <tr>
                                      <th>Title</th>
                                      <th>Director</th>
                                      <th>Rating</th>
                                      <th></th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {renderTable}
                              </tbody>
                          </table>
                      </div>
                </div>
     
  }

}

export default MovieDirectory 