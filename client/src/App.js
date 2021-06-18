import React, {useState,useEffect,useContext} from 'react';
import { BrowserRouter as Router,Route,Switch } from'react-router-dom'
//import {Index} from './components/Index'
//import axios from 'axios'
//import {GlobalContext} from './context/GlobalState'
import {About} from './components/About'
import {ConstantCheck} from './components/ConstantCheck'
import {Home} from './components/Home'
import {Create} from './components/Create'
import {Edit} from './components/Edit'
import {ViewPost} from './components/ViewPost'
import {Posts} from './components/Posts'
import {Registration} from './components/Registration'
import {Login} from './components/Login'
import {Dashboard} from './components/Dashboard'
import {Checkpoint} from './components/Checkpoint'
import {SearchedPosts } from './components/SearchedPosts'


import {Navigation} from './components/Navigation'
import {ShowPostsOfCategory} from './components/ShowPostsOfCategory'

import {GlobalProvider}  from './context/GlobalState'
import {Container}  from 'react-bootstrap'
//import bootstrap from 'react-bootstrap'


import './App.css';

function App() {
    
  return (
    <GlobalProvider>
    <ConstantCheck />
     <Router>
      <Container className="container-fluid mb-4 mt-4">
      <Navigation />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/posts/searchedPosts" component={SearchedPosts }/>
          <Route exact path="/posts/create" component={Create}/>
          <Route exact path="/posts/category/:category/:id" component={ShowPostsOfCategory}/>
          <Route exact path="/posts/edit/:id" component={Edit}/>
          <Route exact path="/posts/post/:id" component={ViewPost}/>
          <Route exact path="/posts/:id" component={Posts}/>
          <Route exact path="/posts" component={Posts}/>
          

          <Route exact path="/users/register" component={Registration}/>
          <Route exact path="/users/login" component={Login}/>
          {/* <Route exact path="/users/dashboard" component={Dashboard}/> */}
          <Route exact path="/users/dashboard" render={(props) => <Checkpoint compname="dashboard" {...props} /> }/>
          {/* render={(props) => <Greeting text="Hello, " {...props} />} */}
          
          
         
        </Switch>
      </Container>
    </Router>
    </GlobalProvider>
  );
}

export default App;
