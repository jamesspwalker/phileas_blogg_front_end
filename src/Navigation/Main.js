import React, {Component} from "react";
import Home from "./Home";
import NavBar from "./NavBar";
import './Main.css'
import ReviewBox from "../Reviews/Containers/ReviewBox"
import UserForm from "../Users/Components/UserForm"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Main extends Component{
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      topUser: []
    }

    this.postData = this.postData.bind(this);
  }

  componentDidMount() {
    let allUsersURL = "http://localhost:8080/users"
    fetch(allUsersURL)
      .then(res => res.json())
      .then(userData => this.setState({ users: userData._embedded.users }))
      .catch(err => console.err)

    let topUsersURL = "http://localhost:8080/users/ranking"
    fetch(topUsersURL)
    .then(res => res.json())
    .then(topUserData => this.setState({ topUsers: topUserData }))
    .catch(err => console.err)
  }

  postData(data) {
    return fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(userData => this.setState(prevState => {
        return {users: [...prevState.users, userData]}
      }))
  }
  

  render(){
    return(<Router>
        <main className="layout">
        <header>
         <a href="/"><img id="logo" src="/images/balloon.png" path="/" component={Home}/></a>
          <NavBar className="main-nav"/>
        </header>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/add-user" render={() => <UserForm onFormSubmit = {this.postData}/>}/>
                <Route path="/add-user" component={UserForm}/>
                <Route path="/add-review" component={ReviewBox}/>
            </Switch>
        </main>
    </Router>
  )
  }
}

export default Main;
