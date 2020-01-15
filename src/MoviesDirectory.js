import React from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';



class MovieDirectory extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          items: [],
          redirect: false,
        };

        this.onDelete = this.onDelete.bind(this);
        this.onFetch = this.onFetch.bind(this);
      }
    
    componentDidMount() {

        axios.get("http://3.120.96.16:3001/movies/")
        .then(res => {
          console.log(res)
         const movies = res.data;
         //console.log(movies)
          this.setState({items: movies})
        })
    }

    componentDidUpdate(){
        this.onFetch();
        
    }


    onFetch(){
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios.get("http://3.120.96.16:3001/movies/", {cancelToken: source.token})
        .then(res => {
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

    onDelete(id){
            axios.delete("http://3.120.96.16:3001/movies/"+id)
            this.onFetch();
    }



    render(){

        let movies = this.state.items;
        console.log(movies);
        
        if (this.state.redirect){
            return <Redirect to="/"/>;
        }

        let renderTable = movies.map(movie => {
            let singleUrl = "/editmovie/" + movie.id
            return (
                        <tr key= {movie.id}>
                            <td>{movie.title}</td>
                            <td>{movie.director}</td>
                            <td>{movie.rating}</td>
                            <td>
                                <span><button onClick = {() => this.onDelete(movie.id)}>Delete</button></span>
                                <span><button><Link style={{marginRight: "10px"}} to={singleUrl}>Edit</Link></button></span>
                            </td>
                        </tr>
                    
                    )
        })

        return <div id="movie-directory">
                    <Helmet>
                        <title>Home</title>
                    </Helmet>
                    <h1>Movie Directory</h1>
                    <div className="movie-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Director</th>
                                    <th>Rating</th>
                                    <th>Options</th>
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