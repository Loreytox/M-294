function loginAndShowApp() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Docker API URL für Authentifizierung
  const dockerAuthUrl = "http://localhost:2941/auth/login";

  fetch(dockerAuthUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      const { accessToken } = data;

      // Überprüfen, ob der AccessToken gültig ist
      if (accessToken) {
        // AccessToken im SessionStorage speichern
        sessionStorage.setItem("accessToken", accessToken);

        // Login verstecken und Website zeigen
        document.getElementById("loginFormContainer").style.display = "none";

        // Hinzufügen-Funktion freischalten
        enableAddQuoteFunction();

        fetchAndCreateButtons();
        refreshPageAfter30s();
      } else {
        // Fehlermeldung anzeigen, wenn kein AccessToken zurückgegeben wird
        document.getElementById("wrongPasswordLabel").style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Login failed:", error);
      document.getElementById("wrongPasswordLabel").style.display = "block";
    });
}

function enableAddQuoteFunction() {
  document.getElementById("addQuoteForm").style.display = "block";
  const buttonsToDisable = document.querySelectorAll(".disable-on-login");
  buttonsToDisable.forEach((button) => (button.disabled = false));
}

function refreshPageAfter30s() {
  setTimeout(function () {
    alert("Diese Session ist abgelaufen. Der AccessToken ist nur 30s gültig.");
    location.reload();
  }, 30000);
}
