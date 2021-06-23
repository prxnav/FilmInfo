import React, { useState, useEffect } from "react";
const api_key = "8685a66fbbfe185ed82e9f5c44b5e7f8";

function Search() {
  const [value, setValue] = useState("");
  const trending = useTrendingMovies();
  const getRes = async (value) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${value}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  };

  function handleSubmit(e) {
    e.preventDefault();
    getRes(value);
  }

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
      <div className="trendingMovies">
        {trending ? <img src={trending} /> : <div> Loading...</div>}
      </div>
    </div>
  );

  function useTrendingMovies() {
    const [trending, setTrending] = useState(null);
    useEffect(() => {
      (async function () {
        const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return setTrending(
          data.results.map((result) => {
            result.backdrop_path;
          })
        );
      })();
    }, []); //runs on mount
  }
}

export default Search;
