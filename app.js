document.getElementById("search_button").addEventListener("click", () => {
  const inputSearch = document.getElementById("inputSearchText");
  const userSearchPhone = inputSearch.value;
  // loadData(userSearchPhone);
  loadData('oppo');
});

async function loadData(searchText) {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  console.log(url);
  const response = await fetch(url);
  const loadPhones = await response.json();
  const phones = loadPhones.data;
  displayShowingPhones(phones);
}

const displayShowingPhones = (phones) => {
  const parenContainerDiv = document.getElementById("parenContainerDiv");
  console.log(phones);
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
       <div class="card card-custom">
    <div class="img-div p-2">
      <img src="${phone.image}" class=" card-img " alt="images-loading">
    </div>
    <div class="card-body text-center">
    <p class="card-title">${phone.brand}</p>
    <h6 class="card-text">${phone.phone_name.slice(0,20)}.</h6>
    <button class=" buttonD p5-3 py-1" onclick="searchingLoadId('${phone.slug}')">details</button>
  </div>
</div>
         `;
    parenContainerDiv.appendChild(div);
  });
};
