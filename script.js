window.addEventListener("load", sidenvises);

function sidenvises() {
    console.log("siden vises");

    //læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visproduktliste);
}

function visproduktliste(listen) {
    console.table(listen);
    listen.forEach(visprodukt);
}

function visprodukt(produkt) {
    console.log("produkt")
        // Klon produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);
    // indsæt data i klon

    // append klon til .produkt_liste

    document.querySelector(".produktliste").appendChild(klon);
}
