



    let inputData= "";
    let page=1;
    const acess="5Fn1BsE-bUrTPwVG3YEkWPP6EpcvRDfLbBKlcpRSchY"
    const formEl=document.querySelector("form");
    const inputEl=document.getElementById("search-image");
    const searchRes=document.querySelector(".search-results");
    const loadMore = document.getElementById("load-more");

async function searchImages() {
  console.log(inputEl.value);
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${acess}`;

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;
  if (page === 1) {
    searchRes.innerHTML = "";
  }

  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchRes.appendChild(imageWrapper);

  });

  page++;
  if (page > 1) {
    loadMore.style.display = "block";
  }
}

formEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    page = 1;
    await searchImages(); 
  })
  
loadMore.addEventListener("click", () => {
    searchImages();
})