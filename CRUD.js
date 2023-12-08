//Wurde mit Hilfe con ChatGPT korrigiert und angepasst
//Wurde mit Hilfe von BingAI korrigiert und angepasst
function addQuote() {
  var quoteInput = document.getElementById("quoteInput").value;
  
  // Validierung des Inputs vor dem Senden der Anfrage
  if (quoteInput == "") {
    alert("Sie sollten etwas eingeben!");
    return;
  }

  fetch("http://localhost:2940/api/v1/entities/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quote: quoteInput }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Quote wurde hinzugefügt");
        updateQuoteList();
      } else {
        console.error("Fehler beim Hinzufügen der Quote");
      }
    })
    .catch((error) => {
      console.error("Fehler beim Hinzufügen der Quote", error);
    });
}

function updateQuoteList() {
  fetch("http://localhost:2940/api/v1/entities/")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Fehler beim Abrufen der Zitate");
        throw new Error("Fehler beim Abrufen der Zitate");
      }
    })
    .then((quotes) => {
      const quoteList = document.getElementById("quoteList");
      quoteList.innerHTML = "";

      quotes.forEach((quote) => {
        console.log(quote);

        const listItem = document.createElement("li");

        const quoteText = quote.quote;

        listItem.textContent = quoteText;

        // Dieser Teil wurde mit ChatGPT gemacht
        // Button zum Löschen des Zitats
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteQuote(quote.id); // Annahme: Das Zitat hat eine eindeutige ID

        // Button zum Ändern des Zitats
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editQuote(quote.id, quote.quote); // Annahme: Das Zitat hat eine eindeutige ID

        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
        quoteList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Fehler beim Aktualisieren der Zitate", error);
    });
}

function deleteQuote(quoteId) {
  fetch(`http://localhost:2940/api/v1/entities/${quoteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Quote wurde gelöscht");
        updateQuoteList();
      } else {
        console.error("Fehler beim Löschen der Quote");
      }
    })
    .catch((error) => {
      console.error("Fehler beim Löschen der Quote", error);
    });
}

function editQuote(quoteId, currentQuoteText) {
  var newQuoteText = prompt("Ändere die Quote:", currentQuoteText);

  fetch(`http://localhost:2940/api/v1/entities/${quoteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quote: newQuoteText }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Quote wurde aktualisiert");
        updateQuoteList();
      } else {
        console.error("Fehler beim Aktualisieren der Quote");
      }
    })
    .catch((error) => {
      console.error("Fehler beim Aktualisieren der Quote", error);
    });
}
//Dieser Teil wurde mit ChatGPT gemacht
// JavaScript-Funktion, um die angeklickte Seite anzuzeigen
function showPage(pageId) {
  // Alle Seiten verstecken
  document.querySelectorAll(".page").forEach((page) => {
    page.style.display = "none";
  });

  // Die ausgewählte Seite anzeigen
  document.getElementById(pageId).style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  showPage("quotenspiel");
});

window.onload = updateQuoteList;
