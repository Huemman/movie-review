const link = "https://image.tmdb.org/t/p/w440_and_h660_face";
const api_key = "1bfdbff05c2698dc917dd28c08d41096";
const input = document.getElementById('search');
const form = document.getElementById('top-bar-form');
const container = document.getElementById("container");
const notFound = document.getElementById('not-found');
const detailsContainer = document.getElementById('details');
const nxtBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
let page = 1;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  search(input.value)
})

function nxtPage() {
  page++;
  movies()
}

function prevPage() {
  if(page > 1){
    page--;
  }
  movies()
}

const movies = async () => {  
  const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=${page}`);
  const {results} = await res.json();
  const movieCards =  results.map(({poster_path, title, id})=>(`
    <div ondblclick="movieDetails(${id})" class="content">
        <img src="${link}${poster_path}">
        <p>${title}</p>
    </div>
    `)).join("")  
  container.innerHTML = movieCards; 
};
movies()

const movieDetails = async (id) => {
  try {
    const details = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`);
    const similar = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api_key}&language=en-US&page=1`);
    const {results} = await similar.json();
    const {backdrop_path, overview, vote_average, vote_count} = await details.json();
    const deck = `
    <div class="overview">
      <img src="${link}${backdrop_path}" class="clicked-img"> 
      <div class="text-ov">
        <h2>About</h2>  
        <p>${overview}</p>
      </div>
    </div> 
    <p>Rating: <strong>${vote_average}/10</strong>  ${vote_count}voted</p>
    <h2>Similar Deck o'Movie Cards</h2>
    `;
    const similars = results.map(({poster_path, title, id}) => (`
    <div ondblclick="movieDetails(${id})" class="content">
      <img src="${link}${poster_path}">
      <p>${title}</p> 
    </div> 
    `)).join("");
    container.innerHTML = similars;
    detailsContainer.innerHTML = deck;
    nxtBtn.style.display = 'none';
    prevBtn.style.display = 'none';
  } catch (error) {
    console.log('Change code');
  }
  
};

const search = async (movieName) => {
  try{
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movieName}`);
    const {results} = await res.json();
    const movieCards = results.map(({poster_path, title, id}) => (`
    <div ondblclick="movieDetails(${id})" class="content">
      <img src="${link}${poster_path}">
      <p>${title}</p>
    </div>
    `)).join("");
    

    if(results.length > 0){
      container.innerHTML = movieCards;
      return
      } else {
    container.innerHTML = "";
    notFound.innerHTML = `<div class='not-found'>
    <p><span class="word-2">Deck</span> Not Found</p>
    </div>`;
      }
    nxtBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    }
  catch (error) {
    console.log(error);
  }
}

