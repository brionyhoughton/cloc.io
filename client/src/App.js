import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import TimeTable from "./components/user/Rota_Timesheet/TimeTable";
import LoginView from "./views/user/LoginView";
import HomeScreenView from "./views/user/HomeScreenView";
import AddUserView from "./views/user/AddUserView";
// import ClockInOutView from "./views/user/ClockInOutView";
import "./App.css";
// import ClockInOutView from "./views/user/ClockInOutView";

// import NotificationCont from './components/user/Notifications/NotificationCont'

class App extends Component {
  state = {
    forename: null,
    surname: null,
    username: null,
    password: null,
    auth_lvl: null,
    job_role: null,
    manager: null,
    forename_new: null,
    surname_new: null,
    username_new: null,
    password_new: null,
    auth_lvl_new: null,
    job_role_new: null,
    manager_new: null,
    selected_username: null
  };

  createUser = (event) => {
    event.preventDefault();
    return fetch(`http://localhost:5000/createuser`, {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        forename: this.state.forename_new,
        surname: this.state.surname_new,
        username: this.state.username_new,
        password: this.state.password_new,
        auth_lvl: this.state.auth_lvl_new,
        job_role: this.state.job_role_new,
        manager: this.state.manager_new
      })
    });
  };

  clockIn = (event) => {
    event.preventDefault();

    console.log('clockin')

    let currentTime = new Date();
    let id = this.state.username;
    return fetch(`http://localhost:5000/rota/${id}`)
    .then(response => {
      // console.log(response)
      return response.json();
    })
    .then(myJson => {
      return JSON.stringify(myJson);
    })
    .then(data => {
      let returnData = JSON.parse(data);
      this.setState({ in_time: returnData[0].in_time });
      return fetch(`http://localhost:5000/rota`, {
      method: "put",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        in_time: currentTime,
      })
    });
    });
  };

  clockOut = (event) => {
    event.preventDefault();

    let currentTime = new Date();
    let id = this.state.username;
    return fetch(`http://localhost:5000/rota/${id}`)
    .then(response => {
      // console.log(response)
      return response.json();
    })
    .then(myJson => {
      return JSON.stringify(myJson);
    })
    .then(data => {
      let returnData = JSON.parse(data);
      this.setState({ out_time: returnData[0].out_time });
      return fetch(`http://localhost:5000/rota`, {
      method: "put",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        out_time: currentTime,
      })
    });
    });
  };

  compareDB = e => {
    e.preventDefault();

    let id = this.state.username;
    let password = this.state.password;

    return fetch(`http://localhost:5000/login/${id}&${password}`)
      .then(response => {
        // console.log(response)
        return response.json();
      })
      .then(myJson => {
        return JSON.stringify(myJson);
      })
      .then(data => {
        let returnData = JSON.parse(data);
        this.setState({ forename: returnData[0].forename, surname: returnData[0].surname, username: returnData[0].username, password: returnData[0].password, auth_lvl: returnData[0].auth_lvl, job_role: returnData[0].job_role, manager: returnData[0].manager });
      });

    // return console.log(this.state.username);
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    const addUserView = props => {
      return (
        <AddUserView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          createUser={this.createUser}
          value={this.state.value}
        />
      );
    };

    const loginView = props => {
      return (
        <LoginView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          compareDB={this.compareDB}
          value={this.state.value}
        />
      );
    };

    const homeScreenView = props => {
      return( 
        <HomeScreenView auth_lvl={this.state.auth_lvl}
        clockIn={this.clockIn}
        clockOut={this.clockOut}
      />
      );
    };

    const clockInView = props => {
      return( 
        <HomeScreenView
        auth_lvl={this.state.auth_lvl}
        clockIn={this.clockIn}
        clockOut={this.clockOut}
      />
      );
    };

    return (
      <div className="App">
        <Router>
          <Route path="/home" render={homeScreenView} />
          <Route path="/createuser" render={addUserView} />
          <Route path="/login" render={loginView} />
          <Route path="/rota" render={clockInView} />
        </Router>

        {/* <NotificationCont/>  */}
      </div>
    );
  }
}

export default App;
