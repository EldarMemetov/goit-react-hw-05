import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import {
  getCreditsById,
  imageBaseURL,
} from "../../components/ApiMovies/ApiMovies.jsx";

export default function MovieCast() {
  const { movieId } = useParams();
  const [castData, setCastData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCastDataById() {
      try {
        setLoading(true);
        const data = await getCreditsById(movieId);
        setCastData(data.cast);
      } catch (error) {
        console.log(error);
        setError("Failed to load cast information.");
      } finally {
        setLoading(false);
      }
    }
    fetchCastDataById();
  }, [movieId]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {loading && <Loader />}
      {castData.length === 0 && !loading && (
        <p>Unfortunately, there are no info about cast for this film...</p>
      )}
      {castData.map((credit) => (
        <div key={credit.id}>
          <br />
          <p>{credit.name}</p>
          {credit.character && (
            <p>
              <span>Character: </span>
              {credit.character}
            </p>
          )}
          <img
            src={`${imageBaseURL}/${credit.profile_path}`}
            alt={`${credit.name}'s photo`}
            style={{ maxWidth: 200 }}
          />
        </div>
      ))}
    </div>
  );
}
