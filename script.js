const link = "https://image.tmdb.org/t/p/w440_and_h660_face";
const api_key = "1bfdbff05c2698dc917dd28c08d41096";
const input = document.getElementById('search');
const form = document.getElementById('top-bar-form');
const container = document.getElementById("container");


form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(input.value);
  search(input.value)
})
const movies = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`);
  const {results} = await res.json();
  const movieCards =  results.map(({backdrop_path, original_title})=>(`
    <div class="content">
      <img src="${link}${backdrop_path}">
      <p>${original_title}</p>
    </div>
    `)).join("")
  container.innerHTML = movieCards;
};

movies()

const search = async (title) => {
  try{
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${title}`);
    const {results} = await res.json();
    console.log(results);
    const movieCards = results.map(({backdrop_path, original_title}) => (`
    <div class="content">
      <img src="${link}${backdrop_path}">
      <p>${original_title}</p>
    </div>
    `)).join("");
    

    if(results.length > 0){
      container.innerHTML = movieCards;
      return
    }
    console.log("WALANG GANON");
    alert("PAKYU")  
    }
  catch (error) {
    console.log(error);
  }
}


