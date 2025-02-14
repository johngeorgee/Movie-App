let url = window.location.search

let getId=url.split("id=")
let id=getId[getId.length-1]


let seasons = []
let series =[]
let cast = []
let recommendS = []
let wishlistTV = document.querySelectorAll(".wishlistTV")
let dark = document.querySelector(".darkMode")
let logoText = document.querySelector(".logo-text")
let html = document.querySelector("html")
let dMode = document.querySelector(".moon")
let wishListIcon = document.querySelector(".wishlist")
let body = document.querySelector("body")
let Wishlist = document.getElementById("wishList")
let content = document.querySelectorAll(".content")
console.log(content);


if(localStorage.getItem("theme") === "darkMode"){
  dMode.src="/assests/images/moon-fill.svg"
  wishListIcon.src='/assests/images/heart-fill.svg'
  html.setAttribute("data-bs-theme", "dark");
  logoText.style.color = "black"



}
if(localStorage.getItem("theme") == "lightMode"){
  dMode.src='/assests/images/moon.svg'
  wishListIcon.src='/assests/images/heart.svg'
  html.removeAttribute("data-bs-theme");
  logoText.style.color = "white"


}
dark.addEventListener("click", () => {
  if (html.getAttribute("data-bs-theme") === "dark") {
    dMode.src='/assests/images/moon.svg'
    wishListIcon.src='/assests/images/heart.svg'
    body.style.backgroundColor = "white"
      logoText.style.color = "white"

  
    html.removeAttribute("data-bs-theme");
    localStorage.setItem("theme", "lightMode")
    
  } else {
    dMode.src="/assests/images/moon-fill.svg"
    wishListIcon.src='/assests/images/heart-fill.svg'
    body.style.backgroundColor = "black"
      logoText.style.color = "black"

    html.setAttribute("data-bs-theme", "dark");
    localStorage.setItem("theme", "darkMode")
  }
});

const options = {
  method: 'GET',
  headers: {
  accept: 'application/json',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTY5ZTMyZTcwZTYyZDRjZjRmNjE4ZWZiOTU2Y2E5MSIsIm5iZiI6MTczNzkxODg3MS42NDgsInN1YiI6IjY3OTY4OTk3MTZmMGQ5NjBkZjIzOGYzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BtWPlcvtVUdBqnnv3eZTeqKTkzCYWKv4hh1Y4kXsKEc'
  }
};

async function getSData(){
    let myHttpSeries=await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`,options)
    let seriesObject=await myHttpSeries.json()
    series=seriesObject
     seasons = seriesObject.seasons
    console.log(seasons);
    
    

    displayDataS()
    displaySeasons()
}
async function getCastDataS(){
    let myHttpTV=await fetch(`https://api.themoviedb.org/3/tv/${id}/credits`,options)
    let tvObject=await myHttpTV.json()
    cast=tvObject.cast

    displayCast()
    

}
async function getRecommendSeries(){
  let myhttpSrecommend = await fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`, options)
  let seriesR = await myhttpSrecommend.json()
  recommendS= seriesR.results

  displayRecommendedS()
}
function displayRecommendedS(){
  let x = ``
  recommendS.slice(0,6).forEach( recommend =>{
    x+=`
    <div class="col-md-6 col-lg-4 d-flex align-items-stretch col-sm-12 my-3">
                <div class="card home-card" style="width:100%;">
                    <img src="https://image.tmdb.org/t/p/w200${recommend.backdrop_path}" class="card-img-top" alt="${recommend.name}">
                    <div class="card-body">
                        <h5 class="card-title">${recommend.name}</h5>
                        <a href="/assests/detailsS.html?id=${recommend.id}" class="btn btn-primary">Details</a>
                    </div>
                </div>
            </div>
    
    
    
    
    
    
    
    `



  })
  document.getElementById("recommendS").innerHTML=x
}
function displayDataS(){
    let x =`           
    <div class="card detailsCard" style="max-width: auto;">
  <div class="row ">
    <div class="col-md-4">
      <img src="https://image.tmdb.org/t/p/w500${series.poster_path}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title content-title">Name: <span class="content">${series.original_name}</span> </h5>
        <h5 class="card-title content-title">First Air Date : <span class="content">${series.first_air_date}</span> </h5>
        <h5 class="card-title content-title">Last Air Date : <span class="content">${series.last_air_date}</span> </h5>
        <h5 class="card-title content-title">Episode Time : <span class="content">${series.episode_run_time}</span> </h5>
        <h5 class="card-title content-title">Number of Seasons : <span class="content">${series.number_of_seasons}</span> </h5>
        <h5 class="card-title content-title">Number of Episodes : <span class="content">${series.number_of_episodes}</span> </h5>
        <h5 class="card-title content-title">Voters : <span class="content">${series.vote_count}</span></h5>
        <h5 class="card-title content-title">Original Country : <span class="content">${series.origin_country}</span> </h5>
        <h5 class="card-title content-title">Spoken Language : <span class="content">${series.spoken_languages[0].name}</span> </h5>
        <h5 class="card-title content-title">Type : <span class="content">${series.type}</span> </h5>
        <h5 class="card-text content-title">Over View : </h5>
        <p class= "card-title content-title"><span class="content">${series.overview}</span></p>
        <div class="text-center d-flex justify-content-between">
                          <a  href="${series.homepage}"class="btn btn-outline-danger w-25 m-auto">Watch</a>
                          <a href="/assests/wishlist.html?id=${series.id}"  class="btn btn-outline-primary w-25 m-auto wishlistTV" >Add to Wishlist</a>
        </div>

      </div>
    </div>
  </div>
</div>
    
    
    `
    document.getElementById("detailsData").innerHTML = x
}
function displayCast() {
    let castHtml = ``;

    cast.slice(0, 6).forEach(actor => { 


        castHtml += `
            <div class="col-md-6 col-lg-4 d-flex align-items-stretch col-sm-12 my-3" >
                <div class="card" style="width: 100%">
                    <img src="https://image.tmdb.org/t/p/w200${actor.profile_path}" class="card-img-top" alt="${actor.name}">
                    <div class="card-body">
                        <h5 class="card-title content-title">Name: <span class="content">${actor.name}</span> </h5>
                        <h5 class="content-title">Character: <span class="content">${actor.character}</span></h5>
                        <h5 class="content-title">Role: <span class="content">${actor.known_for_department}</span></h5>
                    </div>
                </div>
            </div>`;
    });

    
    
    document.getElementById("castData").innerHTML = castHtml;
}   
function displaySeasons() {
    let x = ``;
    seasons.forEach(season => {
        x += `
            <div class="col-md-6 col-lg-4 d-flex align-items-stretch col-sm-12 my-3">
                <div class="card" style="width: 100%">
                    <img src="https://image.tmdb.org/t/p/w200/${season.poster_path}" class="card-img-top" alt="${season.name}">
                    <div class="card-body">
                        <h5 class="card-title content-title">${season.name}</h5>
                        <h5 class="season">Number of Episodes: <span class="content">${season.episode_count}</span></h5>
                        <h5 class="season">Air Date: <span class="content">${season.air_date || "N/A"}</span> </h5>
                        <a href="/assests/detailsSeason.html?id=${series.id}&number=${season.season_number}" class="btn btn-primary">Details</a>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("seasons").innerHTML = x;
}
getRecommendSeries()
getSData()
getCastDataS()

let searchInput = document.getElementById("searchInput")

document.getElementById("searchForm").addEventListener("submit" , (e)=>{
  e.preventDefault()
  if(searchInput.value){
    window.location.replace(`/assests/search.html?query=${searchInput.value}`)
  }
})