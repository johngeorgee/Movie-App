
let params = new URLSearchParams(window.location.search);
let idS = params.get("id");       
let getNumber = params.get("number"); 


let seasonDetails=[]
let seasonDet = []
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

season()
async function season(){
    let myhttpSeason = await fetch(`https://api.themoviedb.org/3/tv/${idS}/season/${getNumber}?language=en-US`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTY5ZTMyZTcwZTYyZDRjZjRmNjE4ZWZiOTU2Y2E5MSIsIm5iZiI6MTczNzkxODg3MS42NDgsInN1YiI6IjY3OTY4OTk3MTZmMGQ5NjBkZjIzOGYzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BtWPlcvtVUdBqnnv3eZTeqKTkzCYWKv4hh1Y4kXsKEc'
        }
      })
     seasonDet = await myhttpSeason.json()
     console.log(seasonDet);
     
    seasonDetails=seasonDet.episodes
    console.log(seasonDetails);
    

    
    displaySeason()
    displayEpisodes()
}
function displaySeason(){
    let x =`           
    <div class="card detailsCard " style="max-width: auto;">
  <div class="row ">
    <div class="col-md-4">
      <img src="https://image.tmdb.org/t/p/w500${seasonDet.poster_path}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title content-title">Name: <span class="content">${seasonDet.name || " "}</span> </h5>
        <h5 class="card-title content-title">Rate: <span class="content">${seasonDet.vote_average || " "}</span> </h5>
        <h5 class="card-text content-title">Over View : </h5>
        <p class= "card-title"><span class="content">${seasonDet.overview || " "}</span></p>


      </div>
    </div>
  </div>
</div>
    
    
    `
    document.getElementById("seasonDetails").innerHTML = x
}
function displayEpisodes(){
    let x=``
    seasonDetails.forEach(episode =>{
        x+=`
         <div class="col-md-6 col-lg-4 d-flex align-items-stretch col-sm-12 my-3">
                <div class="card home-card" style="width:100%">
                    <img src="https://image.tmdb.org/t/p/w200/${episode.still_path}" class="card-img-top" alt="${episode.name}">
                    <div class="card-body">
                        <h5 class="card-title content-title">${episode.name}</h5>
                        <h5 class="season">Episode Number: <span class="content">${episode.episode_number}</span> </h5>
                        <h5 class="season">Air Date: <span class="content">${episode.air_date || "N/A"}</span> </h5>
                        <h5 class="season">Rate : <span class="content">${episode.vote_average || "N/A"}</span> </h5>
                        <h5 class="season">Overview : <span class="content">${sliceText(episode.overview)}</span> </h5>
                        
                    </div>
                </div>
            </div>
        
        
        
        
        `

    })
    document.getElementById("episodes").innerHTML=x
}
function sliceText(text){
  return text.slice(0 , 100) + " ...... "
}
let searchInput = document.getElementById("searchInput")

document.getElementById("searchForm").addEventListener("submit" , (e)=>{
  e.preventDefault()
  if(searchInput.value){
    window.location.replace(`/assests/search.html?query=${searchInput.value}`)
  }
})