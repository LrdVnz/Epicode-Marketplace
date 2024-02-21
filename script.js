/* Marketplace di prova. Niente funzione di pagamento. 
1. Crea un frontend dove mostrare tutti i prodotti.
2. Crea un back end in cui aggiungere nuovi prodotti e modificare quelli esistenti. 
3. Crea una pagina di dettaglio del prodotto. 

Piano : 

1. Frontend base (es. libri! )
   - Casella di input di tipo search.
     - Vicino alla casella di search ci sarà la casella di creazione di un nuovo prodotto. 
   - Spazio per i contenuti creati dinamicamente. 
   - Ogni contenuto / articolo sarà in una card. 
     - Ogni card avrà spazio per tasti di modifica e delete. 
   - Pagina di dettaglio. 

2. Backend : 
   - Fetch base per renderizzare i contenuti iniziali. 
     - Funzione di ricerca contenuto / articolo. (live search)
   - Funzioni collegate all'api :  
     - Funzione di creazione nuovo prodotto. 
     - Funzione di cancellazione prodotto. 
   - Creazione di pagina di dettaglio.
   
  contenuto di esempio: !! Già caricato !!
   const simpleContent = {
    name: "contentino",
    description: "un piccolo contenuto",
    brand: "nokia",
    imageUrl:
      "https://images.unsplash.com/photo-1708384761254-32964bd16c49?q=80&w=2018&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 999,
  }; 

*/

const endpointUrl = "https://striveschool-api.herokuapp.com/api/product/";
const authToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzY2VkYzI0ZjYwNTAwMTkzN2Q1MTciLCJpYXQiOjE3MDgzNzk4NjgsImV4cCI6MTcwOTU4OTQ2OH0.71W487-Veydagx0166g0G8xmrhie04KU0_Vs2AxYbq4";
const contentBox = document.getElementById("content-area");

window.onload = getContent();

async function getContent() {
  try {
    const res = await fetch(endpointUrl, {
      headers: {
        Authorization: authToken,
      },
    });
    const json = await res.json();
    cycleContent(json);
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

let showContent = ({ name, description, brand, imageUrl, price }) => {
  /// Usare i metodi javascript per la creazione di nodi del dom.
  let outerCol = document.createElement("div");
  outerCol.classList.add("col-6", "col-md-3");

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

  let cardBtnsBody = document.createElement("div")
  cardBtnsBody.classList.add("card-body", "d-flex", "justify-content-between", "py-1")
  cardWrapper.appendChild(cardBtnsBody)

  let cardDetails = document.createElement("a")
  cardDetails.classList.add("btn", "btn-primary", "ms-1")
  cardDetails.innerText = 'Details'
  cardBtnsBody.appendChild(cardDetails)
  
  /* Icona fontAwesome dell'icona plus: 
  <i class="fa-solid fa-circle-plus" style="color: #dfdddd;"></i>
   */
  let cardDetailsIcon = document.createElement("i")
  cardDetailsIcon.classList.add("fa-solid", "fa-circle-plus", "mx-2")
  cardDetailsIcon.style = "color : #dfdddd"
  cardDetails.appendChild(cardDetailsIcon)

  let cardDelete = document.createElement("a")
  cardDelete.classList.add("btn", "btn-danger", "ms-1")
  cardDelete.innerText = 'Delete'
  cardBtnsBody.appendChild(cardDelete)

  /* Icona di fontawesome del trash bin : 
  <i class="fa-solid fa-trash-can" style="color: #ffffff;"></i>
  */
  let cardDelIcon = document.createElement("i")
  cardDelIcon.classList.add("fa-solid", "fa-trash-can", "mx-2")
  cardDelIcon.style = "color : #ffffff"
  cardDelete.appendChild(cardDelIcon)

  contentBox.appendChild(outerCol);

  console.log(outerCol)
};

let createContent = () => {
  /// Messo sull'onclick del pulsante 'crea'
  /// prendere i vari input dell'utente e creare un oggetto con essi.

  console.log("creating....");

  let content_name = document.getElementById("article-name").value;
  let content_desc = document.getElementById("article-desc").value;
  let content_brand = document.getElementById("article-brand").value;
  let content_img = document.getElementById("article-img").value;
  let content_price = document.getElementById("article-price").value;

  let newContent = {
    name: content_name,
    description: content_desc,
    brand: content_brand,
    imageUrl: content_img,
    price: content_price,
  };

  uploadContent(newContent);
  getContent();
};

async function uploadContent(newContent) {
  /// Funzione con richiamo di tipo POST per creazione di contenuto sul server.
  /// Da fare : creazione dinamica con user input !!!

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
