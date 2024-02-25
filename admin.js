/* 
Pagina di modifica degli articoli. 
 Da fare : DELETE 
 */
const deletedAlert = document.getElementById('deleted-msg');

async function deleteProduct(id) {
   try{
       const res = await fetch(endpointUrl+id, {
        "method" : "DELETE",
        headers : {
            Authorization: authToken,
        }
       });
       deletedAlert.classList.toggle("d-none");
       setTimeout(() => {
        deletedAlert.classList.toggle("d-none");
       }, 5000);
       console.log("cancellato!!!!!!!!!!")
   }catch(error){
       console.log(error)
   }
}
