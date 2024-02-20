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
*/

const endpointUrl = "https://striveschool-api.herokuapp.com/api/product/";
const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzY2VkYzI0ZjYwNTAwMTkzN2Q1MTciLCJpYXQiOjE3MDgzNzk4NjgsImV4cCI6MTcwOTU4OTQ2OH0.71W487-Veydagx0166g0G8xmrhie04KU0_Vs2AxYbq4";

window.onload = getContent(); 

async function getContent() {
  try {
    const res = await fetch(endpointUrl, {
      headers: {
        Authorization: authToken 
      }
    });
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

async function createContent() {
  /// Funzione con richiamo di tipo POST per creazione di contenuto sul server.
  /// contenuto di prova: !! Già caricato !!
/*   const simpleContent = {
    name: "contentino",
    description: "un piccolo contenuto",
    brand: "nokia",
    imageUrl:
      "https://images.unsplash.com/photo-1708384761254-32964bd16c49?q=80&w=2018&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 999,
  }; */

  /// Da fare : creazione dinamica con user input !!! 

  try {
    const res = await fetch(endpointUrl, {
      method: "POST",
      body: JSON.stringify(simpleContent),
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

