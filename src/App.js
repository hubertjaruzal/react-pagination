import React, { Component } from 'react';
import Pagination from './Pagination';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      itemsCount: 100,
      itemsPerPage: 10,
      currentPage: 1
    }
  }

  changePage(page) {
    this.setState({currentPage: page})
  }

  render() {
    return (
      <Pagination
        itemsCount={this.state.itemsCount}
        itemsPerPage={this.state.itemsPerPage}
        currentPage={this.state.currentPage}
        onChange={(page) => this.changePage(page)}
      />
    );
  }
}

export default App;
