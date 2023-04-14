const processingSearch = (limit) => {
  toggleSpinner(true);
  const inputSearch = document.getElementById("inputSearchText");
  const userSearchPhone = inputSearch.value;
  // inputSearch.value = "";
  loadData(userSearchPhone, limit);
};

// search button click
document.getElementById("search_button").addEventListener("click", () => {
  processingSearch(10);
});

// search filed enter //
document.getElementById("inputSearchText").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    processingSearch(10);
  }
});

//load data  //
async function loadData(searchText, limit) {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const response = await fetch(url);
  const loadPhones = await response.json();
  const phones = loadPhones.data;
  displayShowingPhones(phones, limit);
}

// ** single item display  **
const displayShowingPhones = (phones, limit) => {
  const parenContainerDiv = document.getElementById("parenContainerDiv");
  parenContainerDiv.innerHTML = "";
  const noFound = document.getElementById("no-found");
  // search value no found then show error message
  if (phones.length === 0) {
    noFound.classList.remove("d-none");
  } else {
    noFound.classList.add("d-none");
  }

  const showButton = document.getElementById("show_button");

  if (limit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showButton.classList.remove("d-none");
  } else {
    showButton.classList.add("d-none");
  }

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
       <div class="card newClassBg">
    <div class="img-div p-2">
      <img src="${phone.image}" class=" card-img " alt="images-loading">
    </div>
    <div class="card-body text-center">
    <p class="card-title">${phone.brand}</p>
    <h6 class="card-text">${phone.phone_name.slice(0, 20)}.</h6>

    <button onclick= loadDetailsPhones('${
      phone.slug
    }') type="button" class="btn btn-dark"
     data-bs-toggle="modal" data-bs-target="#myPhoneModal">
  showDetails
</button>
  </div>
</div>
         `;
    parenContainerDiv.appendChild(div);
  });
  // stop spinner //
  toggleSpinner(false);
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

// loading spinner //
const toggleSpinner = (isLoading) => {
  // stating search loading and show all phone display then stop loading
  const spinnerTag = document.getElementById("spinner_div");
  if (isLoading) {
    spinnerTag.classList.remove("d-none");
  } else {
    spinnerTag.classList.add("d-none");
  }
};

// show button data all //
document.getElementById("showData_button").addEventListener("click", () => {
  processingSearch();
});

/* 
1.Load data using Phone Hunter API 
2.Display phones and implement search functionality
3.Toggle no phone found message based on search result data
4.Show and hide loading spinner while loading API data
5.Implement Show All button to display all data
6.Dynamic API Data Load and search on keyboard enter button
*/
