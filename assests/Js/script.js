let dark = document.querySelector(".darkMode")
let html = document.querySelector("html")
let dMode = document.querySelector(".moon")
let wishListIcon = document.querySelector(".wishlist")
let body = document.querySelector("body")
let title = document.querySelector(".border-dark")
let list = document.querySelectorAll(".list")
let categoryTitle = document.getElementById("Catitle");
let Wishlist = document.getElementById("wishList")
let logoText = document.querySelector(".logo-text")
let wishlistMovie = JSON.parse(localStorage.getItem("movieWishlist")) || []
let wishlistTV = JSON.parse(localStorage.getItem("tvWishlist")) || []
let movie=[]
let tv =[]
if(localStorage.getItem("theme") === "darkMode"){
  dMode.src="/assests/images/moon-fill.svg"
  wishListIcon.src='/assests/images/heart-fill.svg'
  html.setAttribute("data-bs-theme", "dark");
  logoText.style.color = "black"
   list.forEach(item =>{
    item.style.color="black"
   })
}
if(localStorage.getItem("theme") == "lightMode"){
  dMode.src='/assests/images/moon.svg'
  wishListIcon.src='/assests/images/heart.svg'
  html.removeAttribute("data-bs-theme");
  logoText.style.color = "white"
  list.forEach(item =>{
    item.style.color="white"
   })
}
dark.addEventListener("click", () => {
  if (html.getAttribute("data-bs-theme") === "dark") {
    dMode.src='/assests/images/moon.svg'
    wishListIcon.src='/assests/images/heart.svg'
    body.style.backgroundColor = "white"
      logoText.style.color = "white"
      list.forEach(item =>{
        item.style.color="white"
       })
    html.removeAttribute("data-bs-theme");
    localStorage.setItem("theme", "lightMode")
    
  } else {
    dMode.src="/assests/images/moon-fill.svg"
    wishListIcon.src='/assests/images/heart-fill.svg'
    body.style.backgroundColor = "black"
      logoText.style.color = "black"
      list.forEach(item =>{
        item.style.color="black"
       })
    html.setAttribute("data-bs-theme", "dark");
    localStorage.setItem("theme", "darkMode")
  }
});



let allM = []
let allTV = []

const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTY5ZTMyZTcwZTYyZDRjZjRmNjE4ZWZiOTU2Y2E5MSIsIm5iZiI6MTczNzkxODg3MS42NDgsInN1YiI6IjY3OTY4OTk3MTZmMGQ5NjBkZjIzOGYzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BtWPlcvtVUdBqnnv3eZTeqKTkzCYWKv4hh1Y4kXsKEc'
    }
  };

async function fetchCatM(apiLink){
    let response = await fetch(apiLink , options)
    let data = await response.json()
    allM = data.results
    displayMData()
}

function displayMData(){
 let x = ``;
 for( let i=0; i< allM.length; i++){
  x+=` <div class="col-lg-3 column-gap-5  d-flex align-items-stretch col-sm-12 col-md-6">
                <div class="card home-card" style="width:100%">
                    <img src="https://image.tmdb.org/t/p/w500${allM[i].backdrop_path}" class="card-img-top" alt="${allM[i].title}">
                    <div class="card-body">
                        <h5 class="card-title">${allM[i].title}</h5>
                    

                    </div>
                    <div class="d-flex justify-content-around my-2">
                            <a href="/assests/detailsM.html?id=${allM[i].id}" class="btn btn-primary">Details</a>
                        <a onclick="wishlistM(${allM[i].id})" class="btn btn-primary  wishlistMovie">Add to Wishlist</a>
                        </div>
                    
                </div>
            </div>
  `
 }
 document.getElementById("allData").innerHTML = x

}

async function fetchCatS(apiLink){
  let response = await fetch(apiLink , options)
  let data = await response.json()
  allTV = data.results
  displaySData()
}


function displaySData(){
let x = ``;
for( let i=0; i< allTV.length; i++){
x+=` <div class="col-lg-3 column-gap-5 col-sm-12 col-md-6 d-flex align-items-stretch">
              <div class="card home-card" style="width:100%" >
                  <img src="https://image.tmdb.org/t/p/w500${allTV[i].backdrop_path}" class="card-img-top" alt="${allTV[i].name}">
                  <div class="card-body">
                      <h5 class="card-title">${allTV[i].name}</h5>
                      
                  </div>
                  <div class="d-flex justify-content-around my-2">
                            <a href="/assests/detailsS.html?id=${allTV[i].id}" class="btn btn-primary">Details</a>
                        <a onclick="wishlistS(${allTV[i].id})" class="btn btn-primary  wishlistMovie">Add to Wishlist</a>
                  </div>
              </div>
          </div>
`
}
document.getElementById("allData").innerHTML = x

}

function contentLoad(){
  if(localStorage.getItem("category") == "All Movies"){
    categoryTitle.innerHTML = "All Movies"
      fetchCatM("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc")
  }
  if(localStorage.getItem("category") == "Now Playing Movies" ){
    categoryTitle.innerHTML = "Now Playing Movies"
    fetchCatM("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1")
  }
  if(localStorage.getItem("category") == "Trending Movies"){
    categoryTitle.innerHTML = "Trending Movies"
    fetchCatM("https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1")
  }
  if(localStorage.getItem("category") == "Up-coming Movies"){
    categoryTitle.innerHTML = "Up Coming Movies"
    fetchCatM("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1")
  }
  if(localStorage.getItem("category") == "Top-rated Movies"){
    categoryTitle.innerHTML = "Top-Rated Movies"
    fetchCatM("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1")
  }
  if(localStorage.getItem("category") == "Popular Movies"){
    categoryTitle.innerHTML = "Popular Movies"
    fetchCatM("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1")
  }
  if(localStorage.getItem("category") == "All Series"){
    categoryTitle.innerHTML = "All Series"
    fetchCatS("https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc")
  }
  if(localStorage.getItem("category") == "Airing Series"){
    categoryTitle.innerHTML = "Airing Series"
      fetchCatS("https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1")
  }
  if(localStorage.getItem("category" ) == "On the Air"){
    categoryTitle.innerHTML = "On the Air Series"
    fetchCatS("https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1")
  }
  if(localStorage.getItem("category" ) == "Popular Series"){
    categoryTitle.innerHTML = "Popular Series"
    fetchCatS("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1")
  }
  if(localStorage.getItem("category")  == "Top-Rated Series"){
    categoryTitle.innerHTML = "Top-Rated Series"
    fetchCatS("https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1")
  }
  if(localStorage.getItem("category") == "Trending Series"){
    categoryTitle.innerHTML = "Trending Series"
    fetchCatS("https://api.themoviedb.org/3/trending/tv/day?language=en-US")
  }
}



document.addEventListener("DOMContentLoaded", () => {
  contentLoad()
  })


let Links = document.querySelectorAll(".Link")
Links.forEach(Link=>{
  Link.addEventListener("click" , (e)=>{
    
    let element = e.target.id
    if(element == "allMovie"){
      localStorage.setItem("category" , "All Movies")
      categoryTitle.innerHTML = "All Movies"
      fetchCatM("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc")
    } 
    if(element=="nowM"){
      localStorage.setItem("category" , "Now Playing Movies")
      categoryTitle.innerHTML = "Now Playing Movies"
      fetchCatM("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1")
    }
    if(element=="trendM"){
      localStorage.setItem("category" , "Trending Movies")
      categoryTitle.innerHTML = "Trending Movies"
      fetchCatM("https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1")
    }
    if(element=="topM"){
      localStorage.setItem("category" , "Top-rated Movies")
      categoryTitle.innerHTML = "Top-Rated Movies"
      fetchCatM("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1")
    }
    if(element=="upM"){
      localStorage.setItem("category" , "Up-coming Movies")
      categoryTitle.innerHTML = "Up Coming Movies"
      fetchCatM("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1")
    }
    if(element == "popM"){
      localStorage.setItem("category" , "Popular Movies")
      categoryTitle.innerHTML = "Popular Movies"
      fetchCatM("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1")
    }
    if(element=="allS"){
      localStorage.setItem("category" , "All Series")
      categoryTitle.innerHTML = "All Series"
      fetchCatS("https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc")
    }
    if(element=="AiringSeries"){
      localStorage.setItem("category" , "Airing Series")
      categoryTitle.innerHTML = "Airing Series"
      fetchCatS("https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1")
    }
    if(element=="onS"){
      localStorage.setItem("category" , "On the Air")
      categoryTitle.innerHTML = "On the Air Series"
      fetchCatS("https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1")
    }
    if(element=="popS"){
      localStorage.setItem("category" , "Popular Series")
      categoryTitle.innerHTML = "Popular Series"
      fetchCatS("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1")
    }
    if(element=="topS"){
      localStorage.setItem("category" , "Top-Rated Series")
      categoryTitle.innerHTML = "Top-Rated Series"
      fetchCatS("https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1")
    }
    if(element=="trendS"){
      localStorage.setItem("category" , "Trending Series")
      categoryTitle.innerHTML = "Trending Series"
      fetchCatS("https://api.themoviedb.org/3/trending/tv/day?language=en-US")
    }
  })
})


let searchInput = document.getElementById("searchInput")

document.getElementById("searchForm").addEventListener("submit" , (e)=>{
  e.preventDefault()
  if(searchInput.value){
    window.location.replace(`/assests/search.html?query=${searchInput.value}`)
  }
})

wishListIcon.addEventListener("click" , ()=>{
  window.location.replace(`/assests/wishlist.html`)

})
async function wishlistM(id){
  let myHttpMovies=await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`,options)
  let moviesObject=await myHttpMovies.json()
  movie=moviesObject

  
  if(!wishlistMovie.some(item => item.id === movie.id)){
    wishlistMovie.push(movie)
      console.log(wishlistMovie);
      localStorage.setItem("movieWishlist" , JSON.stringify(wishlistMovie))
  }
  }


async function wishlistS(id){
  let myHttpTV=await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`,options)
  let tvObject=await myHttpTV.json()
  tv=tvObject

  if(!wishlistTV.some(item => item.id === tv.id)){
      wishlistTV.push(tv)
      console.log(wishlistTV);
      localStorage.setItem("tvWishlist" , JSON.stringify(wishlistTV))
  }

}
Wishlist.addEventListener("click" , ()=>{
 
  window.location.replace("/assests/wishlist.html")
})
