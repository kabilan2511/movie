import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [genres, setGenres] = useState([]);

  // Fetch movies data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularMovies = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=68b4fe2a513155a58dd0af4adacb281b"
        );
        setMovies(popularMovies.data.results);
        setFilteredMovies(popularMovies.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchGenres = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2JiOTg4NzgxMzQ5OThlYTMzYWE4NjNmNGMyYjc3YiIsInN1YiI6IjY1NjYzNGY0YzJiOWRmMDEzYWUzZmI3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5toOGuckWzItGlZlwGJoKLlSgyLELQpqvzsCam8SNWo",
          },
        };
        const genreResponse = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          options
        );
        const genreData = await genreResponse.json();
        setGenres(genreData.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchData();
    fetchGenres();
  }, []);

  console.log("movies", movies);

  // Function to filter movies based on search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        (movie.genre_ids && movie.genre_ids.includes(parseInt(query, 10)))
    );
    setFilteredMovies(filtered);
  };

  // Function to filter movies based on search query and selected genre
  const handleGenreFilter = (selectedGenreId) => {
    const filtered = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!selectedGenreId ||
          (movie.genre_ids &&
            movie.genre_ids.includes(parseInt(selectedGenreId, 10))))
    );
    setFilteredMovies(filtered);
  };

  // Function to sort movies by date or popularity
  const handleSort = (sortBy) => {
    setSortBy(sortBy);
    const sorted = [...filteredMovies].sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.release_date) - new Date(a.release_date);
      } else if (sortBy === "popularity") {
        return b.popularity - a.popularity;
      }
      return 0;
    });
    setFilteredMovies(sorted);
  };

  return (
    <div className="home">
      <h1>Movies</h1>
      <input
        type="text"
        placeholder="Search by movie name"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
      />
      <div>
        <button onClick={() => handleSort("date")} className="sort-button">
          Sort by Date
        </button>
        <button
          onClick={() => handleSort("popularity")}
          className="sort-button"
        >
          Sort by Popularity
        </button>
      </div>
      {/* Display genres */}
      <div className="genre-list">
        <h2>Genres:</h2>
        <ul>
          {genres.map((genre) => (
            <li key={genre.id} onClick={() => handleGenreFilter(genre.id)}>
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="movies">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-block">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h3 style={{ minHeight: "45px" }}>{movie.title}</h3>
            <p>{`Popularity: ${movie.popularity}`}</p>
            <p>{`Vote Count: ${movie.vote_count}`}</p>
            <hr />
            <span className="releseDate">
              <span className="left">{`${movie.release_date}`}</span>
              <span className="right">
                <span>&#9733;</span>
                {`${movie.vote_average.toFixed(1)}`}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
