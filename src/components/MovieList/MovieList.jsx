
import MovieItem from '../MovieItem/MovieItem';
import styles from './MoviesList.module.css';

export default function MoviesList({ movies }) {
  return (
    <ul className={styles.moviesList}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieListItem}>
          <MovieItem movie={movie} />
        </li>
      ))}
    </ul>
  );
}
