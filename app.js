document.getElementById("search_button").addEventListener("click", () => {
  const inputSearch = document.getElementById("inputSearchText");
  const userSearchPhone = inputSearch.value;
  loadData(userSearchPhone);
});

async function loadData(searchText) {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const response = await fetch(url);
  const loadPhones = await response.json();
  const phones = loadPhones.data;
  displayShowingPhones(phones);
}

// ** single item display  **
const displayShowingPhones = (phones) => {
  const parenContainerDiv = document.getElementById("parenContainerDiv");
  parenContainerDiv.innerHTML = "";
  const noFound = document.getElementById("no-found");
  if (phones.length === 0) {
    noFound.classList.remove("d-none");
  } else {
    noFound.classList.add("d-none");
  }

  phones = phones.slice(0, 5);

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
       <div class="card bg-secondary">
    <div class="img-div p-2">
      <img src="${phone.image}" class=" card-img " alt="images-loading">
    </div>
    <div class="card-body text-center">
    <p class="card-title">${phone.brand}</p>
    <h6 class="card-text">${phone.phone_name.slice(0, 20)}.</h6>

    <button onclick= loadDetailsPhones('${
      phone.slug
    }') type="button" class="btn btn-success"
     data-bs-toggle="modal" data-bs-target="#myPhoneModal">
  showDetails
</button>
  </div>
</div>
         `;
    parenContainerDiv.appendChild(div);
  });
};

// ** load single details phone **
const loadDetailsPhones = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const phones = await res.json();
  if (phones.status) {
    displayDetailsModalShowPhones(phones.data);
  }
};

// ** single  details phone ** //
const displayDetailsModalShowPhones = (phones) => {
  const { image, brand, name, releaseDate, others } = phones;
  const { Bluetooth, GPS, NFC, Radio, USB } = others;

  document.querySelector(".modal-title").innerHTML = brand;
  document.querySelector(".modal-body").innerHTML = `
    <div class="w-50 mx-auto my-4">
    <img class="w-100" src=${image} alt="image loading dt">
    </div>
   <div class="px-4">
   <h4>${name}</h4>
   <p>${releaseDate ? releaseDate : "no releaseDate found"}</p>
   <p>Bluetooth: ${Bluetooth}</p>
   <p> GPS: ${GPS}</p>
   <p>USB: ${USB}</p>
   <p>Radio: ${Radio}</p>
   <p>NFC: ${NFC}</p>
   </div>
  `;
};


/* 
1.load phone
1.load details phone.
 1.phone search no result found then error data is no found 
 2.phone search data found then no found hide  
*/
