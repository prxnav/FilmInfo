import React, { useState, useEffect } from "react";
const api_key = "8685a66fbbfe185ed82e9f5c44b5e7f8";

function Search() {
  const [value, setValue] = useState("");
  const [Result , setResult] = useState(null);
  const movies = useRandomMovies();
  
  const getRes = async (value) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${value}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return setResult(data.map((x)=>{}));
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
      <div className="LandingCards">
        {movies ? <LandingData movies={movies} /> : <div> Loading... </div>}
      </div>
    </div>
  );
}
function useRandomMovies(){
  const [movies, setMovies] = useState(null);
  useEffect(()=>{
    (async function(){
      const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      return setMovies(data.results.map((x) => ({original_title:x.original_title,poster_path: x.poster_path, id:x.id})))
    })();
  }, []) // runs only on mount
  return movies;
}

function LandingData({movies}){
  return movies.map((x) => 
  <div className="listWrapper">
    <div key={x.id}>
      <h3> {x.original_title}</h3>
      <img src={`http://image.tmdb.org/t/p/w500/${x.poster_path}`}></img>
    </div>
  </div>
  )
}


export default Search;