window.addEventListener("load", sidenvises);

function sidenvises() {
    console.log("siden vises");
    visprodukt();
}

function visprodukt() {
    // Klon produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);
    // indsæt data i klon

    // append klon til .produkt_liste

    document.querySelector(".produktliste").appendChild(klon);
}
