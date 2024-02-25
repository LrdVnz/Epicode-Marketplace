/// Creazione pagina di dettaglio

const endpointUrl = "https://striveschool-api.herokuapp.com/api/product/";

const authToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzY2VkYzI0ZjYwNTAwMTkzN2Q1MTciLCJpYXQiOjE3MDg4NjA2NjcsImV4cCI6MTcxMDA3MDI2N30.A0eCbRbZ0RoM6ARP4PFBO_3JjZcXYac1X7zeAXoZ5cY";

const detailBox = document.getElementById("content-area");

const params = new URLSearchParams(window.location.search);
const queryValue = params.get("q");

const editedAlert = document.getElementById("update-msg");
const warningAlert = document.getElementById("warning-msg");

let articleName = document.getElementById("article-name");
let articleDesc = document.getElementById("article-desc");
let articleBrand = document.getElementById("article-brand");
let articleImg = document.getElementById("article-img");
let articlePrice = document.getElementById("article-price");

window.onload = getQuery();

async function getQuery() {
  console.log(queryValue);

  try {
    const res = await fetch(endpointUrl + queryValue, {
      headers: {
        Authorization: authToken,
      },
    });
    const json = await res.json();
    console.log(json);
    showContent(json);
  } catch (error) {
    console.log(error);
  }
}


let showContent = ({ _id, name, description, brand, imageUrl, price }) => {
  /// Usare i metodi javascript per la creazione di nodi del dom.

  let pageTitle = document.getElementById("page-title");
  pageTitle.innerText = name.toUpperCase();

  let outerImgCol = document.createElement("div");
  outerImgCol.classList.add("col-6");

  let cardImg = document.createElement("img");
  cardImg.classList.add("card-img");
  cardImg.src = imageUrl;
  cardImg.alt = description;
  outerImgCol.appendChild(cardImg);

  let outerTextCol = document.createElement("div");
  outerTextCol.classList.add("col-6");

  let cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card", "h-100");
  outerTextCol.appendChild(cardWrapper);

  let cardBody = document.createElement("div");
  cardBody.classList.add(
    "card-body",
    "text-center",
    "d-flex",
    "flex-column",
    "justify-content-evenly"
  );
  cardWrapper.appendChild(cardBody);

  let cardDesc = document.createElement("h2");
  cardDesc.classList.add("card-text", "description");
  cardDesc.innerHTML = "Description: <b> " + description + "</b>";
  cardBody.appendChild(cardDesc);

  let cardBrand = document.createElement("h3");
  cardBrand.classList.add("card-text", "brand");
  cardBrand.innerHTML = "Brand: <b>" + brand + "</b>";
  cardBody.appendChild(cardBrand);

  let cardPrice = document.createElement("h3");
  cardPrice.classList.add("card-text", "price");
  cardPrice.innerHTML = "Price: <b>" + price + " € </b>";
  cardBody.appendChild(cardPrice);

  detailBox.appendChild(outerImgCol);
  detailBox.appendChild(outerTextCol);
};
