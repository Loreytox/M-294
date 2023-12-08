function loginAndShowApp() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const dockerAuthUrl = "http://localhost:2941/auth/login";
  // Validierung des Titels vor dem Senden der Anfrage
  if (username == "") {
    alert("Sie sollten etwas eingeben!");
    return;
  }
  if (password == "") {
    alert("Sie sollten etwas eingeben!");
    return;
  }

  fetch(dockerAuthUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    //Mit Hilfe von Marek von Rogall programmiert
    .then((response) => response.json())
    .then((data) => {
      const { accessToken } = data;

      if (accessToken) {
        sessionStorage.setItem("accessToken", accessToken);

        document.getElementById("loginFormContainer").style.display = "none";

        enableAddQuoteFunction();

        fetchAndCreateButtons();
        refreshPageAfter30s();
      } else {
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
//Mit Hilfe von Marek von Rogall programmiert
function refreshPageAfter30s() {
  setTimeout(function () {
    alert("Diese Session ist abgelaufen. Der AccessToken ist nur 30s gültig.");
    location.reload();
  }, 30000);
}
