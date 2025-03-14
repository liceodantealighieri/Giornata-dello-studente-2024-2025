document.addEventListener("DOMContentLoaded", function () {
    let bottone = document.getElementById("prenotaBtn");
    let messaggio = document.getElementById("messaggio");
    ;

    let dataApertura = new Date("2025-03-03T16:00:00");
    console.log("Data di apertura:", dataApertura); // Debug: verifica se la data di apertura è corretta
    
    function controllaOrario() {
        let oraAttuale = new Date();
        console.log("Ora attuale:", oraAttuale);  // Debug: verifica se la funzione viene chiamata
        console.log("Data di apertura:", dataApertura);  // Verifica che la data di apertura sia corretta

        if (oraAttuale >= dataApertura) {
            console.log("Il pulsante viene abilitato!");  // Verifica che la condizione venga soddisfatta
            bottone.disabled = false;
            bottone.style.display = "block";
            messaggio.innerText = ""; 
        } else {
            console.log("Il pulsante viene disabilitato.");  // Verifica che la condizione non venga soddisfatta
            bottone.disabled = true;
            bottone.style.display = "none";
            messaggio.innerText = "Le prenotazioni apriranno lunedì 3 marzo alle 16:00!";
        }

    }

    controllaOrario();  
    setInterval(controllaOrario, 30000);  

    // Aggiorna le lezioni disponibili in base alla giornata selezionata
    document.getElementById("giornata").addEventListener("change", aggiornaLezioni);
    aggiornaLezioni();  
});

// Carica lezioni disponibili
function aggiornaLezioni() {
    let giornata = document.getElementById("giornata").value;
    google.script.run.withSuccessHandler(function(lezioni) {
        let selectLezioni = document.getElementById("lezioni");
        selectLezioni.innerHTML = "";
        lezioni = JSON.parse(lezioni);
        
        lezioni.forEach(function(lezione) {
            let option = document.createElement("option");
            option.value = lezione.nome;
            option.textContent = lezione.nome + " (Posti rimanenti: " + lezione.postiDisponibili + ")";
            if (lezione.postiDisponibili <= 0) {
                option.disabled = true;
            }
            selectLezioni.appendChild(option);
        });
    }).getLezioni(giornata);
}



// Invio dati al foglio Google
function inviaDati() {
    var nome = document.getElementById("nome").value;
    var cognome = document.getElementById("cognome").value;
    var classe = document.getElementById("classe").value;
    var giornata = document.getElementById("giornata").value;
    var lezioni = Array.from(document.getElementById("lezioni").selectedOptions).map(opt => opt.value);

    if (lezioni.length !== 5) {
        alert("Devi scegliere una lezione per ogni ora (5 in totale).");
        return;
    }

    var dati = { nome, cognome, classe, giornata, lezioni };
    console.log("Dati inviati:", dati); // DEBUG: Controllo dati prima dell'invio
   


    google.script.run.withSuccessHandler(function(risultato) {
        alert(risultato);
        aggiornaLezioni();
    }).salvaPrenotazione(dati);
}
document.addEventListener("DOMContentLoaded", function() {
    var pulsante = document.getElementById("prenotaBtr"); 

    if (pulsante) {
        pulsante.addEventListener("click", function() {
            console.log("Pulsante premuto!"); // DEBUG: Controllo se il pulsante funziona
            inviaDati();
        });
    } else {
        console.error("Errore: Pulsante non trovato!");
    }
});
