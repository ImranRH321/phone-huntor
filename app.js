document.getElementById("search_button").addEventListener("click", () => {
  const inputSearch = document.getElementById("inputSearchText");
  const userSearchPhone = inputSearch.value;
  loadData(userSearchPhone)
});

async function loadData(searchText) {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  console.log(url);
  const response = await fetch(url);
  const loadPhones = await response.json();
  const phones = loadPhones.data;
  displayShowingPhones()
   
}

const displayShowingPhones = () => {
  const parenContainerDiv = document.getElementById("");
  
}