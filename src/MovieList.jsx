import React, { useState, useEffect } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzIzZjY4NWVlNDFiNzAzNDQ5NmM4ZjQ4ZDJjMTY4MiIsInN1YiI6IjYyZWYzNGQ5ODEzY2I2MDA4MDZkMTY4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7-BpRXNHk8ECCaJr_b_BKqa8-ZqyQpG6wjWqZKuW6EA",
      },
    };

    if (search.length === 0) {
      fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      )
        .then((response) => response.json())
        .then((response) => setMovies(response.results))
        .catch((err) => console.error(err));
    } else {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`, options
      )
        .then((response) => response.json())
        .then((response) => setMovies(response.results))
        .catch((err) => console.error(err));
    }
  },[search]);
  return (
    <div>
      <div>
        <h1>Movie List</h1>
        <input
          type="text"
          placeholder="Search here"
          className="search"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="container">
        {movies.map((movie) => (
          <div className="card" key={movie.id}>
            <div className="card-content">
              <img
                className="card-poster"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
              />{" "}
              <button class="card-play-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </button>
              <h3 className="card-title">{movie.title}</h3>
              <p>
                <small>RELEASE DATE: {movie.release_date}</small>
              </p>
              <p>
                <small>RATING: {movie.vote_average}/10</small>
              </p>
              <p className="card-desc">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
