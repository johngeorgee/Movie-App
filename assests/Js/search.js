let link = window.location.search
let getValue=link.split("query=")
let query=getValue[getValue.length-1]
let searchTitle = document.getElementById("searchText")
let homeBtn = document.getElementById("home")
let wishlistMovie = JSON.parse(localStorage.getItem("movieWishlist")) || []
let wishlistTV = JSON.parse(localStorage.getItem("tvWishlist")) || []
 let searchR = []
 let movie = []
let tv=[]
 let dark = document.querySelector(".darkMode")
 let logoText = document.querySelector(".logo-text")
 let html = document.querySelector("html")
 let dMode = document.querySelector(".moon")
 let wishListIcon = document.querySelector(".wishlist")
 let body = document.querySelector("body")
 let Wishlist = document.getElementById("wishList")



 const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTY5ZTMyZTcwZTYyZDRjZjRmNjE4ZWZiOTU2Y2E5MSIsIm5iZiI6MTczNzkxODg3MS42NDgsInN1YiI6IjY3OTY4OTk3MTZmMGQ5NjBkZjIzOGYzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BtWPlcvtVUdBqnnv3eZTeqKTkzCYWKv4hh1Y4kXsKEc'
  }
}
 
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
 

searchResult()
          async function searchResult(){
            let myHttpsearch = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1` , options)
             let response = await myHttpsearch.json()
             searchR = response.results
           
             displaySearch()

          }
         
         function displaySearch(){
          searchTitle.innerHTML=`Showing results for : ${query}`
           let x=``
           let resultTV  = ``
           for(let i=0; i<searchR.length; i++){
             if(searchR[i].media_type=="movie"){
               x+=`
               <div class="card detailsCard" style="max-width: auto;">
            <div class="row ">
              <div class="col-md-4">
                <img src="https://image.tmdb.org/t/p/w500${searchR[i].poster_path}" class="img-fluid rounded-start" alt="${searchR[i].original_title}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title content-title">Name : <span class="content card-text">${searchR[i].original_title}</span>  </h5>
                  <h5 class="card-title content-title">Release Date : <span  class="content card-text">${searchR[i].release_date}</span>  </h5>
                  <h5 class="card-title content-title">Voters : <span  class="content card-text">${searchR[i].vote_count}</span> </h5>
                  <h5 class="card-title content-title">Type : <span  class="content card-text">${searchR[i].media_type}</span></h5>
                 
                  
                  <h5 class="card-title content-title">Over View : </h5>
                  <p class= "card-text content">${searchR[i].overview}</p>
                  <div class="text-center d-flex justify-content-between">
                                   <a onclick="wishlistM(${searchR[i].id})" class="btn btn-outline-primary w-25 m-auto">Add to Wishlist</a>
                                    <a href="/assests/detailsM.html?id=${searchR[i].id}" class="btn btn-outline-success w-25 m-auto">Detailed ${searchR[i].media_type}</a>
                  </div>
          
                </div>
              </div>
            </div>
          </div>
              
          
              `
         
         
         
             }
             document.getElementById("searchMResults").innerHTML=x
         
           }
           for(let i=0; i<searchR.length; i++){
             if(searchR[i].media_type=="tv"){
               resultTV+=`
               
               <div class="card detailsCard" style="max-width: auto;">
            <div class="row ">
              <div class="col-md-4">
                <img src="https://image.tmdb.org/t/p/w500${searchR[i].backdrop_path}" class="img-fluid rounded-start" alt="${searchR[i].name}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title content-title">Name : <span  class="content card-text">${searchR[i].name}</span>  </h5>
                  <h5 class="card-title content-title">Release Date : <span  class="content card-text">${searchR[i].first_air_date}</span>  </h5>
                  <h5 class="card-title content-title">Voters : <span  class="content card-text">${searchR[i].vote_count}</span> </h5>
                  <h5 class="card-title content-title">Type : <span  class="content card-text">${searchR[i].media_type}</span></h5>
                 
                  
                  <h5 class="card-title">Over View : </h5>
                  <p class= "card-text  class="content"">${searchR[i].overview}</p>
                  <div class="text-center d-flex justify-content-between">
                                    <a onclick="wishlistS(${searchR[i].id})" class="btn btn-outline-primary w-25 m-auto">Add to Wishlist</a>
                                    <a href="/assests/detailsS.html?id=${searchR[i].id}" class="btn btn-outline-success w-25 m-auto">Detailed ${searchR[i].media_type}</a>
                  </div>
          
                </div>
              </div>
            </div>
          </div>`
             }
           } 
             document.getElementById("searchSResults").innerHTML=resultTV
         }


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

wishListIcon.addEventListener("click" , ()=>{
  window.location.replace("/assests/wishlist.html")
})