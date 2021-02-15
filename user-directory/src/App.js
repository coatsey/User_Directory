import axios from "axios";
import React, { useState, useEffect } from "react";
import './App.css';

function App() {

const [userArray, setUserArray] = useState([]);

const [natArray, setNatArray] = useState([]);

const [filteredArray, setFilteredArray] = useState([]);

useEffect(() => {
  axios
    .get("https://randomuser.me/api/?results=25")
    .then((response) => {
      const responseArray = response.data.results;
      const sortedArray = responseArray.sort((a, b) =>
        a.name.first.localeCompare(b.name.first)
      );
      setUserArray(sortedArray);
      setFilteredArray(sortedArray);

      const natsArray = Array.from(
        new Set(sortedArray.map((x) => x.nat))
      ).sort();

      setNatArray(natsArray);
    })
    .catch((err) => console.log(err));
}, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
