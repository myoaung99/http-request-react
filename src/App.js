import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films");

      // response တန်း ရရချင်း error ကို throw ရမယ်
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      const transformedMovie = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      setMovies(transformedMovie);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  // stages of validating user interface
  // No movie (fetch မလုပ်ရသေးတဲ့ default state)
  // Movies (fetch ‌အောင်မြင်သွားပြီး data ရလာတဲ့ state)
  // error (fetch မအောင်မြင်ပဲ response ကနေ error throw လာတဲ့ state)
  // loading (fetch ခလုပ်နိပ်လိုက်ပြီး fetching လုပ်နေတဲ့ state)

  let content = <p>Found no movie....</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  } else if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = error;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
