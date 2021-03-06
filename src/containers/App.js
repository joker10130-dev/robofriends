import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox.js";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";

import { setSearchField } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)) 
  }
}

const App = ({searchField, onSearchChange}) => {
  const [robots, setRobots] = useState([]);

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((users) => {
        setRobots(users);
      });
  }, [])

  return !robots.length ? (
    <h1>Loading</h1>
  ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
