import axios from "axios";

const baseURL = "https://api.themoviedb.org/3";
export const imageBaseURL = "https://image.tmdb.org/t/p/w500";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzcyNjUxMWI3ZGUyMGFiNzI4N2JhZTA4MzY1ZDBmNCIsIm5iZiI6MTcyMTIwNTM1OC44NzM1Miwic3ViIjoiNjY5M2U1YWRlZDc5MjVlNzMwMDI3NGQ4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.B6-RxvGOTBT3_kSWnFSt1rGNcmYVIxjGP4HkYS65hJQ",
    accept: "application/json",
  },
};

export const getMovies = async () => {
  const response = await axios.get(`${baseURL}/trending/movie/day`, options);
  return response.data.results;
};

export const getMovieById = async (movieID) => {
  const response = await axios.get(`${baseURL}/movie/${movieID}`, options);
  return response.data;
};

export const getCreditsById = async (movieID) => {
  const response = await axios.get(
    `${baseURL}/movie/${movieID}/credits`,
    options
  );
  return response.data;
};

export const getReviewsById = async (movieID) => {
  const response = await axios.get(
    `${baseURL}/movie/${movieID}/reviews`,
    options
  );
  return response.data;
};

export const getMoviesByName = async (query) => {
  const response = await axios.get(
    `${baseURL}/search/movie?query=${query}&include_adult=false`,
    options
  );

  return response.data;
};
