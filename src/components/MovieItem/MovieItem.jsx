import { Link } from "react-router-dom";
import { imageBaseURL } from "../../components/ApiMovies/ApiMovies.jsx";
import styles from "./MovieItem.module.css";

export default function MovieItem({ movie }) {
  return (
    <div className={styles.movieItem}>
      {movie.poster_path && (
        <img
          src={`${imageBaseURL}${movie.poster_path}`}
          alt={movie.title}
          className={styles.moviePoster}
        />
      )}
      <Link to={`/movies/${movie.id}`} className={styles.movieLink}>
        <button className={styles.movieButton}>Go to movie</button>
      </Link>
    </div>
  );
}
