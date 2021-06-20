import React, { useState } from "react";

const Search = () => {
  const [value, setValue] = useState("");
  const getRes = async (value) => {
    const api_key = "8685a66fbbfe185ed82e9f5c44b5e7f8";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${value}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRes(value);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <span className="box">
          <input
            type="text"
            value={value}
            placeholder="Search for a movie"
            name="query"
            onChange={(e) => setValue(e.target.value)}
          />
          <input type="submit" />
        </span>
      </form>
    </div>
  );
};

export default Search;
