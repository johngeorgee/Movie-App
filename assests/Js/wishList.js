let dark = document.querySelector(".darkMode")
let logoText = document.querySelector(".logo-text")
let html = document.querySelector("html")
let dMode = document.querySelector(".moon")
let wishListIcon = document.querySelector(".wishlist")
let body = document.querySelector("body")
let Wishlist = document.getElementById("wishList")
let wishlistBtn = document.querySelectorAll(".wishlistMovie")
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







let getMID = JSON.parse(localStorage.getItem("movieWishlist"))
let getSID = JSON.parse(localStorage.getItem("tvWishlist"))
console.log(getMID);
console.log(getSID);


let movie = []
let tv=[]
if(JSON.parse(localStorage.getItem("movieWishlist"))){
  displayWishlistMovie()
  
}
if(JSON.parse(localStorage.getItem("tvWishlist"))){
  displayWishlistTV()
  
}

for(let i=0; i<getMID.length; i++){
  wishlistM(getMID[i].id)
  
}
for(let i=0; i<getSID.length; i++){
  wishlistTV(getSID[i].id)
  
}


async function wishlistM(id){
  let myHttpMovies=await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`,options)
  let moviesObject=await myHttpMovies.json()
  movie=moviesObject
  console.log(movie);
  displayWishlistMovie()

  
}
async function wishlistTV(id){
  let myhttpTV=await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`,options)
  let tvObject=await myhttpTV.json()
  tv=tvObject
  console.log(tv);
  displayWishlistTV()
  
}


function displayWishlistMovie(){
  let x=``
  for(let i=0; i<getMID.length; i++){
    x+=`
    <div class="col-3   d-flex align-items-stretch justify-content-center  col-sm-12 col-md-6">
    <div class="card" style="max-width: auto;">
        <img src="https://image.tmdb.org/t/p/w500${getMID[i].backdrop_path}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${getMID[i].title}</h5>
          <div>
              <a href="/assests/detailsM.html?id=${getMID[i].id}" class="btn btn-primary">Details</a>
              <a onclick="removeM(${getMID[i].id})" class="btn btn-danger">Remove from Wishlist</a>
          </div>
            
        </div>
    </div>
  </div>
    
    `
  }
  
  document.getElementById("wishlistMovie").innerHTML=x
}
function displayWishlistTV(){
  let x=``
  for(let i=0; i<getSID.length; i++){
    x+=`
    <div class="col-3   d-flex align-items-stretch justify-content-center col-sm-12 col-md-6" >
    <div class="card home-card" style="max-width: auto;">
        <img src="https://image.tmdb.org/t/p/w500${getSID[i].backdrop_path}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${getSID[i].name}</h5>
          <div>
              <a href="/assests/detailsS.html?id=${getSID[i].id}" class="btn btn-primary">Details</a>
              <a onclick="removeTV(${getSID[i].id})" class="btn btn-danger">Remove from Wishlist</a>
          </div>
            
        </div>
    </div>
  </div>
    
    `
  }
  
  document.getElementById("wishlistSeries").innerHTML=x
}
function removeM(id){
  getMID = getMID.filter( movie => movie.id !== id)
  localStorage.setItem("movieWishlist" , JSON.stringify(getMID))
}

function removeTV(id){
  getSID = getSID.filter ( series => series.id !== id)
  localStorage.setItem("tvWishlist" , JSON.stringify(getSID))
}

