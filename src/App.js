import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './MoviesDirectory';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import IndividualMovie from './IndividualMovie';

class App extends React.Component {
  render(){
    return (
      <div id="App">
          <Router basename="/">
              <Route exact path="/" component={Home} />
              <Route path="/addmovie" component={AddMovie} />
              <Route path="/editmovie/:id" component={EditMovie} />
              <Route path="/movies/:id" component={IndividualMovie} />
           </Router>
        
      </div>
    );
  }
 
}

export default App;
