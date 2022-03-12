import "./search.css";

import React, { useEffect, useState } from "react";

const api_key = "8685a66fbbfe185ed82e9f5c44b5e7f8";

function Search() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const movies = useRandomMovies();

  const getRes = async (value) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${value}&page=1`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(result);
    return setResult(
      data.results.map((x) => ({
        id: x.id,
        original_title: x.original_title,
        poster_path: x.poster_path,
        voter_average: x.voter_average,
      }))
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    getRes(value);
  }

  return (
    <div className="wrapper">
       <form onSubmit={handleSubmit}>
      <div className="s-form">
          <input
              type="search"
              value={value}
              placeholder="Search for a movie"
              name="query"
              onChange={(e) => setValue(e.target.value)}
            />
          <i class="fa fa-search"></i>
      </div>
      </form>
      {result ? 
      (<div className="title">
        <h1 className="search" style={{marginBottom:0}}><b>{value}</b></h1><h3 style={{marginTop:0 , marginLeft:-21}}>SEARCH RESULTS</h3></div>) 
      : 
      (<div className="title">
      <h1 style={{marginBottom:0}}> POPULAR</h1><h3 style={{marginTop:0, marginLeft:-65}}>MOVIES</h3></div>)}
      
      {result ? 
      (<LandingData movies={result} />) 
      : 
      (<div className="MovieCards">
        {movies ? <LandingData movies={movies} /> : <div> Loading... </div>}
      </div>)}
    </div>  
  );
}

function useRandomMovies() {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    (async function () {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      return setMovies(
        data.results.map((x) => ({
          original_title: x.original_title,
          poster_path: x.poster_path,
          id: x.id,
          vote:x.vote_average
        }))
      );
    })();
  }, []); // runs only on mount
  return movies;
}

function LandingData({ movies }) {
  return <div className="listWrapper">
      {movies.map((x)=>(
        <div className="listItems" key={x.id}>
          <img 
          src={`http://image.tmdb.org/t/p/w200/${x.poster_path}`}/>
          <h3 style={{letterSpacing:1, fontSize:15}}> {x.original_title}</h3>
          <p style={{fontSize:20}}>{x.vote} <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" fill="#10d5eb"/></svg></p>
          
        </div>
      ))}
  </div> 
}

export default Search;
