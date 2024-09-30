const KEY = "391f1d8dd86b48689a422c58e6a6a036";
const URL = "https://newsapi.org/v2/everything?q=";
var isSOpen = false;
const world = document.querySelector("#world");
const india = document.querySelector("#india");
const tech = document.querySelector("#tech");
const sports = document.querySelector("#sports");
const finance = document.querySelector("#finance");

const whats = document.querySelector("#what-s")
const search = document.querySelector("#search")
const input = document.querySelector(".news-input")
const btn = document.querySelector(".search-btn")


async function fetchNews(query) {
    
    let res = await fetch(`${URL}${query}&sortBy=popularity&apiKey=${KEY}`);
    let result = await res.json();

    console.log(result);

    document.querySelector(".card-container").innerHTML = "";

    result.articles.forEach(article => {
        if(article.urlToImage == null || article.title == null || article.description == null || article.source == null){
            return;
        }
        addToData(article);
    });

}

function addToData(article) {
    let card = document.createElement("div");
    card.classList.add("card");

    let img = article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/360x190';  // Provide fallback if image is null
    let title = article.title ? article.title : 'No Title';
    let desc = article.description ? article.description : 'No Description Available';

    card.innerHTML = `
        <div class="card-header">
            <img src="${img}" alt="" id="news-img">
        </div>

        <div class="card-content">
            <h3 id="news-title">${title}</h3>
            <h6 id="news-src">${article.source.name} ${article.publishedAt.slice(0, 10)}</h6>
            <p id="news-desc">${desc}</p>
        </div>
    `;

    card.addEventListener("click", () => {
        window.open(article.url, '_blank');

    })

    // Append the card to a container (you'll need to have a container in your HTML)
    document.querySelector(".card-container").appendChild(card);
}

//window.addEventListener("load", () => fetchNews("India"));
changeSelection(india)

function changeSelection(wh) {
    // Reset the styles for all buttons (categories)
    const categories = [world, india, tech, sports, finance];
    categories.forEach(cat => {
        cat.style.textDecoration = "none";
        cat.style.fontWeight = "normal";
        cat.style.fontSize = "1rem";  // Reset to default
        cat.style.color = "black";  // Reset to default color
    });

    search.style.display = "none"

    if(wh == null){
        return;
    }
    // Apply styles to the clicked category
    wh.style.textDecoration = "underline";
    wh.style.fontWeight = "bold";
    wh.style.fontSize = "1.1rem";  // Highlighted size
    wh.style.color = "var(--primary-color)";  // Highlighted color
}

// Update the event listeners to call `changeSelection`
world.addEventListener("click", () => {
    fetchNews("World");
    changeSelection(world);
});
sports.addEventListener("click", () => {
    fetchNews("Sports");
    changeSelection(sports);
});
india.addEventListener("click", () => {
    fetchNews("India");
    changeSelection(india);
});
tech.addEventListener("click", () => {
    fetchNews("Technology");
    changeSelection(tech);
});
finance.addEventListener("click", () => {
    fetchNews("Finance");
    changeSelection(finance);
});

btn.addEventListener("click", () => {

    if (window.screen.width <= 571) {
        if(isSOpen) {
            closeSearchBar();
        }else {
        openSearchBar();
        return;
        }
    }


    let txt = input.value;
    if(txt == "" || txt == null){return;}
    changeSelection(null);
    search.style.display = "block";
    whats.textContent = txt;
    fetchNews(txt);
});

function openSearchBar(){
    document.querySelector("#cname").style.display = "none"
    input.style.display = "inline"
    input.parentElement.style.width = "97%"
    input.parentElement.style.margin = "3px auto"    
    input.style.width = "100%"
    isSOpen = true;

}

function closeSearchBar(){
    document.querySelector("#cname").style.display = "flex"
    input.style.display = "none"
    input.parentElement.style.width = "auto"
    input.parentElement.style.margin = "1px"    
    input.style.width = "100%"
    isSOpen = false;

}
