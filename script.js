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
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));

    klon.querySelector("data_rabatpris").innerHTML = rabatpris;

    // append klon til .produkt_liste

    document.querySelector(".produktliste").appendChild(klon);
}
