import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { useLocation, useSearchParams } from "react-router-dom";
import MoviesList from "../../components/MovieList/MovieList";
import { getMoviesByName } from "../../components/ApiMovies/ApiMovies";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams({ query: "" });
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = (newSearchCriteria) => {
    if (newSearchCriteria.trim() === "") {
      setError("Search query cannot be empty.");
      return;
    }
    setSearchParams({ query: newSearchCriteria });
    setError(null);
  };

  const location = useLocation();
  console.log("MoviesPage.jsx > location ", location);

  useEffect(() => {
    async function fetchMoviesByName(queryString) {
      if (queryString === "") {
        return;
      }
      try {
        setLoading(true);
        setNoResults(false);
        const data = await getMoviesByName(queryString);
        const results = data.results;
        setMovies(results);
        if (results.length === 0) {
          setNoResults(true);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    }
    fetchMoviesByName(searchParams.get("query"));
  }, [searchParams]);

  return (
    <div>
      <Formik
        initialValues={{ searchCriteria: "" }}
        onSubmit={(values, actions) => {
          handleSearch(values.searchCriteria);
          actions.resetForm();
        }}
      >
        <Form>
          <Field
            name="searchCriteria"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {error && <div className="error-message">{error}</div>}
      {loading && <Loader />}
      {!loading && noResults && <p>No movies found for your search query.</p>}
      <MoviesList movies={movies} />
    </div>
  );
}
