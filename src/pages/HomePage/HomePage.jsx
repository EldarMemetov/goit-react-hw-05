import { useEffect, useState } from "react";
import { getMovies } from "../../components/ApiMovies/ApiMovies.jsx";
import MoviesList from "../../components/MovieList/MovieList.jsx";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  console.log("HomePage.jsx > location ", location);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.log(error);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1> Trending movies</h1>
      {loading && <Loader />}
      <div>{movies.length > 0 && <MoviesList movies={movies} />}</div>
    </div>
  );
}
