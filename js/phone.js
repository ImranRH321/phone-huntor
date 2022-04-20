// input

const searchLoad = () => {
  const searchFlied = document.getElementById("searchLoad");
  const searchText = searchFlied.value.toLowerCase(); // sob small 
//   console.log(searchText);
  loadTextId(searchText);
  searchFlied.value = "";
};

// display flied
const loadTextId = searchText => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then(res => res.json())
    .then(phone => phoneDisplayLoad(phone.data));
};

// dispay ui data
const phoneDisplayLoad = datas => {
  if (datas.length == []) {
    document.getElementById("error-result").style.display = "block";
  } else {
    // error
    const phoneContainer = document.getElementById("phone_reslut");
    document.getElementById("error-result").style.display = "none";
    phoneContainer.textContent = "";
    datas.forEach(data => {
      //  console.log(data);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
         <div class="card  makeStyle h-100 p-5">
         <img src="${data.image}" class="card-img-top" alt="...">
         <div class="card-body">
           <h5 class="card-title">${data.brand}</h5>
           <h3 class="card-text">${data.phone_name}.</h3>
           <button class=" makeButton p5-3 py-1" onclick="searchingLoadId('${data.slug}')">details</button>
         </div>
       </div>
         `;
      phoneContainer.appendChild(div);
    });
  }
};

// api
const searchingLoadId = phones => {
  // console.log(phones, 'phone now');
  const url = `https://openapi.programming-hero.com/api/phone/${phones}`;
  fetch(url)
    .then(res => res.json())
    .then(data => searchDisplayId(data.data));
};
// id display details api

const searchDisplayId = phone => {
  // console.log(phone);
  const searchIdContainer = document.getElementById("search_id");
  searchIdContainer.textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `
   <div class="row makeStyle p-5">
   <div class="col-lg-6 col-sm-12">
    <div class="w-75 mx-auto">
    <img  src="${phone.image}" class="card-img-top w-100" alt="...">
    <button
    class=" px-5 mt-5 w-100 mx-auto border-5 makeButton ml-5 rounded text-white"
  >
   Enroll
  </button>
    </div>
   </div>
   <div class="col-lg-6 col-sm-12 ">
   <h5 class="card-title">${phone.name}</h5>
   <p class="card-text">${
     phone.releaseDate ? phone.releaseDate : "releaseDate not found"
   }.</p>
   <p>${phone.mainFeatures.chipSet}</p>
   <p>${phone.mainFeatures.displaySize}</p>
   <p>${phone.mainFeatures.memory}</p>
   <p>${phone.mainFeatures.storage}</p>
   <p>${phone.mainFeatures.sensors.map(ele => `<li>${ele}</li>`)}</p>
   <p>${phone.others.Bluetooth}</p>
   <p>${phone.others.GPS}</p>
   <p>${phone.others.USB}</p>
   </div>
   </div>
`;
  searchIdContainer.appendChild(div);
};
