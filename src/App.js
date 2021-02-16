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

function handleListChange(e) {
  switch (e.target.value) {
    case "Select Country":
      setFilteredArray(userArray);
      break;
    default:
      // filters displayed array by user nationality
      const employeeFilteredArray = userArray.filter((element) => {
        return e.target.value === element.nat;
      });
      setFilteredArray(employeeFilteredArray);
  }
}
  return (
    <div className="App">
      <header>
        <h1>Employee Directory</h1>
      </header>
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={handleListChange}
      >
        <option defaultValue>Select Country</option>
        {natArray.map((result, index) => (
          <option key={index} value={result}>
            {result}
          </option>
        ))}
      </select>
      <div className="container-sm">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">First</th>
              <th scope="col">last</th>
              <th scope="col">Email</th>
              <th scope="col"> Nationality</th>
            </tr>
          </thead>
          <tbody>
            {filteredArray.map((result) => (
              <tr key={result.login.uuid}>
                <td>{result.name.first}</td>
                <td>{result.name.last}</td>
                <td>{result.email}</td>
                <td>{result.nat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
