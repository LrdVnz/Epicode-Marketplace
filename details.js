/// Creazione pagina di dettaglio

const endpointUrl = "https://striveschool-api.herokuapp.com/api/product/";

const authToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzY2VkYzI0ZjYwNTAwMTkzN2Q1MTciLCJpYXQiOjE3MDgzNzk4NjgsImV4cCI6MTcwOTU4OTQ2OH0.71W487-Veydagx0166g0G8xmrhie04KU0_Vs2AxYbq4";

const detailBox = document.getElementById('content-area')

const params = new URLSearchParams(window.location.search);
const queryValue = params.get("q");

let articleName = document.getElementById("article-name")
let articleDesc = document.getElementById("article-desc")
let articleBrand = document.getElementById("article-brand")
let articleImg = document.getElementById("article-img")
let articlePrice = document.getElementById("article-price")

window.onload = getQuery();

async function getQuery() {
  console.log(queryValue)

  try {
    const res = await fetch(endpointUrl + queryValue, {
      headers: {
        Authorization: authToken,
      },
    });
    const json = await res.json();
    console.log(json)
    modifyInputs(json)
    showContent(json)
  } catch (error) {
    console.log(error);
  }
}


async function modifyContent (modifiedProduct) {
  try {
    const res = await fetch(endpointUrl + queryValue, {
      method: "PUT",
      headers : {
        Authorization: authToken,
      },
      body: JSON.stringify(modifiedProduct)
    });
  } catch(error) {
    console.log(error)
  }
}

let modifyInputs = ({name, description, brand, imageUrl, price}) => {
  articleName.value = name;
  articleDesc.value = description;
  articleBrand.value = brand; 
  articleImg.value = imageUrl;
  articlePrice.value = price;
}

let showContent = ({ _id, name, description, brand, imageUrl, price }) => {
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