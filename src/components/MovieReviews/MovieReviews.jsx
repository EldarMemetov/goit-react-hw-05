import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsById } from "../ApiMovies/ApiMovies.jsx";
import Loader from "../Loader/Loader.jsx";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchReviewsById() {
      try {
        setLoading(true);
        const data = await getReviewsById(movieId);
        console.log("MovieReviews > data:", data);
        setReviews(data.results);
      } catch (error) {
        console.log(error);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    }
    fetchReviewsById();
  }, [movieId]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {loading && <Loader />}
      {reviews.length === 0 && !loading && (
        <p>Unfortunately, there are no reviews for this film yet...</p>
      )}
      {reviews.map((review) => (
        <div key={review.id}>
          <br />
          <p>{`Author: ${review.author}`}</p>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
}
