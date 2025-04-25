import axios from "axios";

//from TMDB API
const headers = {
  accept: 'application/json',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjQzYzU2MzVhYjcxZGI5NWEwOGUwNjE3ZjMxNDQ4ZCIsIm5iZiI6MTc0NTQxODg3OC4zNDgsInN1YiI6IjY4MDhmYTdlMTVhMWQ1YTYxNGFhZDk2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RseQssaO7kg7RKUd3KEnffAJaYv9gzY6hAoBB5hJQpY'
}

//- home page -
export const actionGetNewProduct = async ()=>{

  const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: headers
  };

  return await axios.get(url, options)
}

export const actionGetHotProduct = async ()=>{

  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: headers
  };

  return await axios.get(url, options)
}

export const actionGetBestRateProduct = async ()=>{

  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: headers
  };

  return await axios.get(url, options)
}
//- end homepage -

export const actionGetProduct = async (category,keyword)=>{

  let url
  if(category=="All"){
    url = `https://api.themoviedb.org/3/search/movie?page=1&query=${keyword}`;
  }else {
    url = `https://api.themoviedb.org/3/${category}/${keyword}?language=en-US&page=1`
  }

  const options = {
    method: 'GET',
    headers: headers
  };
  return await axios.get(url, options)
}


export const actionGetMovieDetail = async (id)=>{

  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const options = {
    method: 'GET',
    headers: headers
  };

  return await axios.get(url, options)
}
