const API_KEY = "AIzaSyAtZFCfta4V-SyQXenQYI6wElUcos5kULs"; // Replace with your GCSE API key
const CX = "568b6415b7aa74ca9"; // Replace with your custom search engine ID
// Replace with your Custom Search Engine ID

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
        });
      } else {
        resultsDiv.innerHTML = "<p>No results found.</p>";
      }
    })
    .catch(err => {
      console.error("Search failed", err);
    });
}

function nextPage() {
  currentStartIndex += 10;
  performSearch();
}

function prevPage() {
  if (currentStartIndex > 1) {
    currentStartIndex -= 10;
    performSearch();
  }
}
