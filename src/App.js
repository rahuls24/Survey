import React, { Component } from 'react';
import './App.css';
import Login from './login';
import RequestTable from './RequestTable';
import Table from './Table';



class App extends Component {

 

  render() {

    return (
      <div style={{maxWidth:'800px'}}>
        <Table />
      </div>
    )
  }
}



export default App;
