let url = window.location.search

let getId=url.split("id=")
let id=getId[getId.length-1]

let homeBtn = document.getElementById("homeBtn")
let movie=[]
let cast = []

let recommendedM = []
let dark = document.querySelector(".darkMode")
let logoText = document.querySelector(".logo-text")
let html = document.querySelector("html")
let dMode = document.querySelector(".moon")
let wishListIcon = document.querySelector(".wishlist")
let body = document.querySelector("body")
let Wishlist = document.getElementById("wishList")

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
}












async function getMData(){
    let myHttpMovies=await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`,options)
    let moviesObject=await myHttpMovies.json()
    movie=moviesObject
    
    displayDataM()

}

async function getCastDataM(){
    let myHttpMovies=await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`,options)
    let moviesObject=await myHttpMovies.json()
    cast=moviesObject.cast
    
    displayCast()

}

function displayDataM(){
    
    let x =`           
    <div class="card detailsCard" style="max-width: auto;">
  <div class="row ">
    <div class="col-md-4">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
      <h5 class="card-title content-title">Name : <span class="content">${movie.title}</span>  </h5>
        <h5 class="card-title content-title">Release Date : <span class="content">${movie.release_date}</span>  </h5>
        <h5 class="card-title content-title">Voters : <span class="content">${movie.vote_count}</span> </h5>
        <h5 class="card-title content-title">Original Country : <span class="content">${movie.origin_country}</span></h5>
       
        <h5 class="card-title content-title" >Spoken Language : <span class="content">${movie.spoken_languages[0].name}</span></h5>
        <h5 class="card-text content-title">Over View : </h5>
        <p class= "card-title content">${movie.overview}</p>
        <div class="text-center d-flex justify-content-between">
                          <a  href="${movie.homepage}"class="btn btn-outline-danger w-25 m-auto">Watch</a>
                          
        </div>

      </div>
    </div>
  </div>
</div>
    
    
    `
    document.getElementById("detailsData").innerHTML= x


}
///assests/wishlist.html?id=${movie.id}
function displayCast() {
    let castHtml = ``;

    cast.slice(0, 6).forEach(actor => { 


        castHtml += `
            <div class="col-md-6 col-lg-4 d-flex align-items-stretch col-sm-12 my-3">
                <div class="card home-card" style="width:100%;">
                    <img src="https://image.tmdb.org/t/p/w200${actor.profile_path}" class="card-img-top" alt="${actor.name}">
                    <div class="card-body">
                        <h5 class="card-title">${actor.name}</h5>
                        <p>Character: ${actor.character}</p>
                        
                    </div>
                </div>
            </div>`;
    });

    
    
    document.getElementById("castData").innerHTML = castHtml;
}   

async function getRecommendedMovies(){
  let myhttprecommend = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options)
  let recommendM = await myhttprecommend.json()
  recommendedM = recommendM.results

  displayRecommendedM()

}

function displayRecommendedM(){
  let x=``
  recommendedM.slice(0, 6).forEach(recommend =>{
    x+=`
    
    <div class="col-md-6 col-lg-4 d-flex align-items-stretch col-sm-12 my-3">
                <div class="card home-card" style="width:100%;">
                    <img src="https://image.tmdb.org/t/p/w200${recommend.backdrop_path}" class="card-img-top" alt="${recommend.title}">
                    <div class="card-body">
                        <h5 class="card-title">${recommend.title}</h5>
                        <a href="/assests/detailsM.html?id=${recommend.id}" class="btn btn-primary">Details</a>
                    </div>
                </div>
            </div>
    `


  })
  document.getElementById("recommendedM").innerHTML=x
}

getRecommendedMovies()
getMData()
getCastDataM()    
    
let searchInput = document.getElementById("searchInput")

document.getElementById("searchForm").addEventListener("submit" , (e)=>{
  e.preventDefault()
  if(searchInput.value){
    window.location.replace(`/assests/search.html?query=${searchInput.value}`)
  }
}) 




