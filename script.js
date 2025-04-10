const API_KEY = "AIzaSyAtZFCfta4V-SyQXenQYI6wElUcos5kULs"; // Replace with your GCSE API key
const CX = "568b6415b7aa74ca9"; // Replace with your custom search engine ID

function search() {
  const query = document.getElementById("searchInput").value;
  if (!query) return;

  fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = "";
      if (data.items) {
        data.items.forEach(item => {
          const el = document.createElement("div");
          el.className = "result-item";
          el.innerHTML = `
            <a href="${item.link}" target="_blank"><h3>${item.title}</h3></a>
            <p>${item.snippet}</p>
          `;
          resultsDiv.appendChild(el);
        });
      } else {
        resultsDiv.innerHTML = "<p>No results found.</p>";
      }
    })
    .catch(() => {
      document.getElementById("results").innerHTML = "<p>Error retrieving results.</p>";
    });
}
