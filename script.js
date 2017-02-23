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

    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));

    klon.querySelector(".data_rabat").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "/imgs/medium/" + produkt.billede + "-md.jpg";

    if (produkt.udsolgt == false) {
        // produktet er ikke udsolgt
        // udsolgtekst skal fjernes

        var udsolgtekst = klon.querySelector(".udsolgtekst");
        udsolgtekst.parentNode.removeChild(udsolgtekst);

    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    // append klon til .produkt_liste

    document.querySelector(".produktliste").appendChild(klon);
}
