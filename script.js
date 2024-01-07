let ville = document.getElementById("ville");
let civilite = document.getElementById("civilite");
let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let telephone = document.getElementById("telephone");
let submit = document.getElementById("submit");
let compteur = 0;

function remove_options(parent) {
    let length = parent.options.length;
  for (let i = length; i > 0; i--) {
    parent.remove(1);
  }
}

function cookie_array(cookie){
    let cookies= cookie.split(';');
    return cookies;

}


function check_validity(input) {
  let spanError = input.nextElementSibling;
  spanError.innerText = "";
  console.log(input.checkValidity());
  if (input.checkValidity()) {
    verif = true;
    compteur++;
  } else {
    spanError.innerText = input.validationMessage;
  }
}

remove_options(ville);
const req = new XMLHttpRequest();
let url = new URL("https://geo.api.gouv.fr/departements/95/communes");
url.searchParams.set("fields", "nom");
req.responseType = "json";
req.open("GET", url);
req.send();
req.onload = () => {
  let res = req.response;
  res.forEach((element) => {
    let elmt = document.createElement("option");
    elmt.innerText = element.nom;
    ville.appendChild(elmt);
  });
};

nom.classList.add("hidden");
prenom.classList.add("hidden");
telephone.classList.add("hidden");
ville.classList.add("hidden");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let verif = false;
  console.log(compteur);
  for (let i = 0; i < 2; i++) {
    switch (compteur) {
      case 0:
        let regex = /(Monsieur|Madame)/;
        if (regex.test(civilite.value)) {
          civilite.nextElementSibling.innerText = "";
          verif = true;
          compteur++;
        } else {
          civilite.nextElementSibling.innerText =
            "Veuillez renseigner ce champ.";
        }
        break;
      case 1:
        civilite.classList.add("hidden");
        nom.classList.remove("hidden");
        if (i === 0) {
          check_validity(nom);
        }
        break;
      case 2:
        nom.classList.add("hidden");
        prenom.classList.remove("hidden");
        if (i === 0) {
          check_validity(prenom);
        }
        break;
      case 3:
        prenom.classList.add("hidden");
        ville.classList.remove("hidden");
        if (i === 0) {
          check_validity(ville);
        }
        break;
      case 4:
        ville.classList.add("hidden");
        telephone.classList.remove("hidden");
        submit.innerText = "Rejoindre";
        if (i === 0) {
          check_validity(telephone);
        }
        break;
      case 5:
        document.cookie = `civilite=${civilite.value},nom=${nom.value},prenom=${prenom.value},ville=${ville.value},telephone=${telephone.value},expires=Sun, 31 Dec 2024 23:59:59 UTC, path=/, HttpOnly, Secure, SameSite=None,`;
        location.assign("./recap.html");
        break;
    default:
        compteur=0;
    }
  }
});
