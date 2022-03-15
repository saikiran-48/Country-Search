import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [countries, setCountries] = React.useState([]);
  const [countryMatch, setCountryMatch] = React.useState([]);

  React.useEffect(() => {
    const loadCountries = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
    };
    loadCountries();
  }, []);

  const searchCountries = (text) => {
    let matches = countries.filter((country) => {
      const regex = new RegExp(`${text}`, "gi");
      return country.name.common.match(regex);
    });
    setCountryMatch(matches);
  };

  const condition = (e) => {
    if (e.target.value.length >= 3) {
      searchCountries(e.target.value);
    } else {
      setCountryMatch([]);
    }
  };

  return (
    <div className="App">
      <h1> Search Countries </h1>
      <input
        style={{ width: "40%", height: "33px", marginTop: "10px" }}
        onChange={condition}
      />
      {countryMatch ? (
        <div className="list">
          {countryMatch.map((item, idx) => (
            <div className="card" key={idx} style={{ marginTop: "10px" }}>
              Country :{item.name.common}
              <br />
              Capital : {item.capital}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default App;
