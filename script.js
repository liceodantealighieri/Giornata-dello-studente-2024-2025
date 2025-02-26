document.addEventListener("DOMContentLoaded", function () {
    let oggi = new Date();
    let dataInizio = new Date("2025-03-03T16:00:00"); 
    let bottone = document.getElementById("prenota");

    if (oggi < dataInizio) {
        bottone.disabled = true;
        bottone.textContent = "Prenotazioni disponibili da lunedì alle 08:00";
        
       
        let intervallo = setInterval(() => {
            if (new Date() >= dataInizio) {
                bottone.disabled = false;
                bottone.textContent = "Prenotati";
                clearInterval(intervallo);
            }
        }, 60000); 
    }
});
window.onload = function() {
    const oggi = new Date();
    const apertura = new Date("2025-03-03T16:00:00"); 
  
    if (oggi < apertura) {
      document.getElementById("prenotaBtn").disabled = true;
      document.getElementById("messaggio").innerText = "Le prenotazioni apriranno lunedì 3 Marzo alle 16:00!.";
    }
  };
  document.addEventListener("DOMContentLoaded", function () {
    const pulsante = document.getElementById("pulsantePrenotazione");

   
    const apertura = new Date("2025-03-03T16:00:00");

    function controllaOrario() {
        const adesso = new Date();
        if (adesso >= apertura) {
            pulsante.style.display = "block"; 
        } else {
            pulsante.style.display = "none";
        }
    }

    controllaOrario();

    setInterval(controllaOrario, 30000);
});
