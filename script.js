const API_KEY = "AIzaSyAGPW7ruR-7LFZBt9QXqXWxoWZBhe2qPS0"; // Replace with your GCSE API key
const CX = "b76608c6862b042dd"; // Replace with your custom search engine ID
// Replace with your Custom Search Engine ID

const timeDiv = document.getElementById("searcTime");

let currentStartIndex = 1;
let currentQuery = "";

function getQueryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("search");
}

window.onload = () => {
  const query = getQueryFromURL();
  if (query) {
    document.getElementById("searchBox").value = query;
    currentQuery = query;
    performSearch();
    performImageSearch();
  }
};

function performSearch() {
  if (!currentQuery) return;

  fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(currentQuery)}&start=${currentStartIndex}`)
    .then(res => res.json())
    .then(data => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = "";

      if (data.items) {
        data.items.forEach(item => {
          const div = document.createElement("div");
          div.className = "result";
          div.innerHTML = `
            <a href="${item.link}" target="_blank"><h3>${item.title}</h3></a>
            <p>${item.snippet}</p>            
          `;
          resultsDiv.appendChild(div);
        showButton()                          
        }); 
      
      } else {
        resultsDiv.innerHTML = "<p>No results found.</p>";
      }
    })
    .catch(err => {
      console.error("Search failed", err);
    
    });}

function performImageSearch() {
  if (!currentQuery) return;
    
    fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(currentQuery)}&searchType=image&start=${currentStartIndex}`)
      .then(res => res.json())
      .then(data => {
        const imagesDiv = document.getElementById("images");
        imagesDiv.innerHTML = "";
    
        if (data.items) {
          data.items.forEach(item => {
            const div = document.createElement("div");
            div.className = "image";
            div.innerHTML = `
              <a href="${item.image.contextLink}" target="_blank"><img src="${item.link}" alt="${item.title}"></a>            
            `;
          imagesDiv.appendChild(div);
        showButton() 
        tab()                         
        }); 
          
      } else {
        resultsDiv.innerHTML = "<p>No results found.</p>";
      }
    })
    .catch(err => {
      console.error("image Search failed", err);
        
    });}
function showButton() {  
  document.getElementById("page").style.visibility = "visible"
  document.getElementById("about").style.display = "none"
}
function nextPage() {
  currentStartIndex += 10;
  performSearch();
  performImageSearch();
}

function prevPage() {
  if (currentStartIndex > 1) {
    currentStartIndex -= 10;
    performSearch();
    performImageSearch();
  }
}

function webTab() {
  document.getElementById("results").style.display = "block"
  document.getElementById("images").style.display = "none"
}

function imageTab() {
  document.getElementById("results").style.display = "none"
  document.getElementById("images").style.display = "flex"
}

function tab() {
  document.getElementById("tab").style.visibility = "visible"
}
