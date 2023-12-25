const link = "https://image.tmdb.org/t/p/w440_and_h660_face";
const api_key = "1bfdbff05c2698dc917dd28c08d41096"

const movies = async () => {
  let movieData = [];
  const data = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`);
  movieData.push(await data.json());
  console.log(movieData);
  const movieCards = movieData.map(data => `
    ${data.results.map((data)=>(`
    <div class="content">
      <img src="${link}${data.backdrop_path}">
      <p>${data.original_title}</p>
    </div>
    `)).join("")}
  `);
  document.getElementById("container").innerHTML = movieCards;
};

movies()
