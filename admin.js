const endpointUrl = "https://striveschool-api.herokuapp.com/api/product/";

const authToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzY2VkYzI0ZjYwNTAwMTkzN2Q1MTciLCJpYXQiOjE3MDgzNzk4NjgsImV4cCI6MTcwOTU4OTQ2OH0.71W487-Veydagx0166g0G8xmrhie04KU0_Vs2AxYbq4";

const contentBox = document.getElementById("content-area");

let productsList = undefined;

window.onload = getContent();

async function getContent() {
  try {
    const res = await fetch(endpointUrl, {
      headers: {
        Authorization: authToken,
      },
    });
    const json = await res.json();
    productsList = json;
    cycleContent(json);
  } catch (error) {
    console.log(error);
  }
}

let createContent = () => {
  /// Messo sull'onclick del pulsante 'crea'
  /// prendere i vari input dell'utente e creare un oggetto con essi.

  console.log("creating....");

  let content_name = document.getElementById("article-name").value;
  let content_desc = document.getElementById("article-desc").value;
  let content_brand = document.getElementById("article-brand").value;
  let content_img = document.getElementById("article-img").value;
  let content_price = document.getElementById("article-price").value;

  if (
    content_name &&
    content_desc &&
    content_brand &&
    content_img &&
    content_price
  ) {
    let newContent = {
      name: content_name,
      description: content_desc,
      brand: content_brand,
      imageUrl: content_img,
      price: content_price,
    };

    uploadContent(newContent);
    getContent();
  } else {
    alert("Compila tutti i campi!!");
  }
};

async function uploadContent(newContent) {
  /// Funzione con richiamo di tipo POST per creazione di contenuto sul server.

  try {
    const res = await fetch(endpointUrl, {
      method: "POST",
      body: JSON.stringify(newContent),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        Authorization: authToken,
      },
    });
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

let cycleContent = (json) => {
  contentBox.innerHTML = "";

  json.forEach((single_article) => {
    showContent(single_article);
  });
};

/// Tasti per l'alert che chiede conferma all'utente sulla cancellazione di un prodotto.
const dangerAlert = document.getElementById("danger-msg");
const confirmBtn = document.getElementById("confirm-delete");
let currentId = undefined;

//Chiedere conferma per la cancellazione : mostrare modale con "Do you really want to delete ? "
// Mettere nel modale tasto ok o tasto annulla. Agire di conseguenza.
confirmBtn.addEventListener("click", () => {
  deleteProduct(currentId);
});

let passId = (id) => {
  currentId = id;
};

const deletedAlert = document.getElementById("deleted-msg");
async function deleteProduct(id) {
  try {
    const res = await fetch(endpointUrl + id, {
      method: "DELETE",
      headers: {
        Authorization: authToken,
      },
    });
    getContent();
    deletedAlert.classList.toggle("d-none");
    setTimeout(() => {
      deletedAlert.classList.toggle("d-none");
    }, 5000);
    console.log("cancellato!!!!!!!!!!");
  } catch (error) {
    console.log(error);
  }
}

// Messa alla fine perché è la funzione più lunga di tutte.
function showContent({ _id, name, description, brand, imageUrl, price }) {
  /// Usare i metodi javascript per la creazione di nodi del dom.
  let outerCol = document.createElement("div");
  outerCol.classList.add("col-6", "col-md-3");

  let cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card", "h-100", "overflow-hidden", "rounded");
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
  cardBtnsBody.classList.add("card-body", "d-flex", "align-items-end", "py-1");
  cardWrapper.appendChild(cardBtnsBody);

  /// Details per la pagina di dettaglio senza funzione di modifica.
  let cardDetails = document.createElement("a");
  cardDetails.classList.add("btn", "btn-primary", "ms-1");
  cardDetails.innerText = "Modify";
  cardDetails.href = `edit.html?q=${_id}`;
  cardBtnsBody.appendChild(cardDetails);

  /* Icona fontAwesome dell'icona plus: 
    <i class="fa-solid fa-circle-plus" style="color: #dfdddd;"></i>
         */
  let cardDetailsIcon = document.createElement("i");
  cardDetailsIcon.classList.add("fa-solid", "fa-circle-plus", "mx-2");
  cardDetailsIcon.style = "color : #dfdddd";
  cardDetails.appendChild(cardDetailsIcon);

  let cardDelete = document.createElement("button");
  cardDelete.type = "button";
  cardDelete.classList.add("btn", "btn-danger", "ms-1");
  cardDelete.innerText = "Delete";
  cardDelete.onclick = passId(_id);
  /* Aggiungi funzione apertura modale di conferma delete 
   data-bs-toggle="modal" data-bs-target="#deleteModal"
   */
  cardDelete.setAttribute("data-bs-toggle", "modal");
  cardDelete.setAttribute("data-bs-target", "#deleteModal");

  cardBtnsBody.appendChild(cardDelete);
  /* Icona di fontawesome del trash bin : 
    <i class="fa-solid fa-trash-can" style="color: #ffffff;"></i>
    */

  let cardDelIcon = document.createElement("i");
  cardDelIcon.classList.add("fa-solid", "fa-trash-can", "mx-2");
  cardDelIcon.style = "color : #ffffff";
  cardDelete.appendChild(cardDelIcon);

  contentBox.appendChild(outerCol);
}