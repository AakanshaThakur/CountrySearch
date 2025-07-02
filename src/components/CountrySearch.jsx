import React, { useEffect, useState } from "react";
import "../App.css";

const CountrySearch = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched countries:", data);
        setCountries(data);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
      });
  }, []);

  const filteredCountries = countries.filter((country) => {
    const countryName = country.common;
    return (
      countryName && countryName.toLowerCase().includes(search.toLowerCase())
    );
  });

  console.log("Filtered Countries:", filteredCountries);

  return (
    <div className="page-wrapper">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="countries-container">
        {filteredCountries.map((country) => (
          <div className="countryCard" key={country.common}>
            <img
              src={country.png}
              alt={`${country.common ?? "No name"} flag`}
              className="countryFlag"
            />

            <div className="countryName">{country.common}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountrySearch;
