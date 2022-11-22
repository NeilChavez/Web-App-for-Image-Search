import { API_KEY, API_URL } from "../settings/settings";

export function getGifs({
  keyword,
  limit = 10,
  rating,
  page = 0,
  language,
} = {}) {
  console.log(rating);
  const endpoint = `${API_URL}/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=${limit}&offset=${
    limit * page
  }&rating=${rating}&lang=${language}`;

  return fetch(endpoint)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      const { data } = json;
      const gifsData = data.map((singleGif) => {
        const { id, title, images } = singleGif;
        const urlGif = images.downsized_medium.url;
        return { id, title, urlGif };
      });
      return gifsData;
    })
    .catch((err) => console.error(err));
}
