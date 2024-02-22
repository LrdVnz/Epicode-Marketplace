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

  let pageTitle = document.getElementById("page-title");
  pageTitle.innerText = name.toUpperCase();

  let outerImgCol = document.createElement("div");
  outerImgCol.classList.add("col-6");
  
  let cardImg = document.createElement("img");
  cardImg.classList.add("card-img-top");
  cardImg.src = imageUrl;
  cardImg.alt = description;
  outerImgCol.appendChild(cardImg);

  let outerTextCol = document.createElement("div");
  outerTextCol.classList.add("col-6");
  
  let cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card", "h-100");
  outerTextCol.appendChild(cardWrapper);

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "text-center", "d-flex", "flex-column", "justify-content-evenly");
  cardWrapper.appendChild(cardBody);

  let cardDesc = document.createElement("h5");
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

  detailBox.appendChild(outerImgCol)
  detailBox.appendChild(outerTextCol);
};