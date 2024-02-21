/// Creazione pagina di dettaglio

const endpointUrl = "https://striveschool-api.herokuapp.com/api/product/";

const authToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzY2VkYzI0ZjYwNTAwMTkzN2Q1MTciLCJpYXQiOjE3MDgzNzk4NjgsImV4cCI6MTcwOTU4OTQ2OH0.71W487-Veydagx0166g0G8xmrhie04KU0_Vs2AxYbq4";

const detailBox = document.getElementById('content-area')

if (window.location.search) {
  getQuery();
}

async function getQuery() {
  let params = new URLSearchParams(window.location.search);
  let queryValue = params.get("q");
  console.log(queryValue)

  try {
    const res = await fetch(endpointUrl + queryValue, {
      headers: {
        Authorization: authToken,
      },
    });
    const json = await res.json();
    console.log(json)
    showContent(json)
  } catch (error) {
    console.log(error);
  }
}


function showContent({ _id, name, description, brand, imageUrl, price }) {
  /// Usare i metodi javascript per la creazione di nodi del dom.
  let outerCol = document.createElement("div");
  outerCol.classList.add("offset-3" , "col-6");

  let cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card", "overflow-hidden");
  outerCol.appendChild(cardWrapper);

  let cardImg = document.createElement("img");
  cardImg.classList.add("card-img-top");
  cardImg.src = imageUrl;
  cardImg.alt = description;
  cardWrapper.appendChild(cardImg);

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardWrapper.appendChild(cardBody);

  let cardTitle = document.createElement("p");
  cardTitle.classList.add("card-text", "title");
  cardTitle.innerText = name;
  cardBody.appendChild(cardTitle);

  let cardDesc = document.createElement("p");
  cardDesc.classList.add("card-text", "description");
  cardDesc.innerText = description;
  cardBody.appendChild(cardDesc);

  let cardBrand = document.createElement("p");
  cardBrand.classList.add("card-text", "brand");
  cardBrand.innerText = brand;
  cardBody.appendChild(cardBrand);

  let cardPrice = document.createElement("p");
  cardPrice.classList.add("card-text", "price");
  cardPrice.innerText = `${price} €`;
  cardBody.appendChild(cardPrice);

  let cardBtnsBody = document.createElement("div");
  cardBtnsBody.classList.add(
    "card-body",
    "d-flex",
    "justify-content-between",
    "py-1"
  );
  cardWrapper.appendChild(cardBtnsBody);

  let cardDetails = document.createElement("a");
  cardDetails.classList.add("btn", "btn-primary", "ms-1");
  cardDetails.innerText = "Details";
  cardDetails.href = `details.html?q=${_id}`
  cardBtnsBody.appendChild(cardDetails);

  /* Icona fontAwesome dell'icona plus: 
    <i class="fa-solid fa-circle-plus" style="color: #dfdddd;"></i>
     */
  let cardDetailsIcon = document.createElement("i");
  cardDetailsIcon.classList.add("fa-solid", "fa-circle-plus", "mx-2");
  cardDetailsIcon.style = "color : #dfdddd";
  cardDetails.appendChild(cardDetailsIcon);

  let cardDelete = document.createElement("a");
  cardDelete.classList.add("btn", "btn-danger", "ms-1");
  cardDelete.innerText = "Delete";
  cardBtnsBody.appendChild(cardDelete);

  /* Icona di fontawesome del trash bin : 
    <i class="fa-solid fa-trash-can" style="color: #ffffff;"></i>
    */

  let cardDelIcon = document.createElement("i");
  cardDelIcon.classList.add("fa-solid", "fa-trash-can", "mx-2");
  cardDelIcon.style = "color : #ffffff";
  cardDelete.appendChild(cardDelIcon);

  detailBox.appendChild(outerCol);
};