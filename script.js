window.addEventListener("load", sidenvises);


function sidenvises() {
    console.log("siden vises");

    //læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visproduktliste);


    document.querySelector(".filterknap_vegetar").addEventListener("click", filtrervegetar);
    document.querySelector(".filterknap_udsolgt").addEventListener("click", filtrerudsolgt);
    document.querySelector(".filterknap_rabatsats").addEventListener("click", filtrerrabatsats);
    document.querySelector(".filterknap_alkoholprocent").addEventListener("click", filtreralkoholprocent);

}



function filtrervegetar(event) {
    console.log("klik på vegetar-filter");

    // find all ikke vegetar-produkter
    var liste = document.querySelectorAll(".produkt:not(.vegetar)");

    //skjul dem - tilfører klassen hide
    liste.forEach(div => div.classList.toggle("hide"));

    document.getElementById("checkbox").checked = true;

    //ved preventdefault så scroller siden ikke op til toppen ved klik på filterknappen.

    event.preventDefault();
}


function filtrerudsolgt(event) {
    console.log("klik på udsolgt-filter");

    // find all ikke vegetar-produkter
    var liste = document.querySelectorAll(".produkt:not(.udsolgt)");

    //skjul dem - tilfører klassen hide
    liste.forEach(div => div.classList.toggle("hide"));

    document.getElementById("checkbox").checked = true;

    //ved preventdefault så scroller siden ikke op til toppen ved klik på filterknappen.
    event.preventDefault();
}


function filtrerrabatsats(event) {
    console.log("klik på rabat-filter");

    // find all ikke vegetar-produkter
    var liste = document.querySelectorAll(".produkt:not(.rabatsats)");

    //skjul dem - tilfører klassen hide
    liste.forEach(div => div.classList.toggle("hide"));

    document.getElementById("checkbox").checked = true;

    //ved preventdefault så scroller siden ikke op til toppen ved klik på filterknappen.
    event.preventDefault();
}

function filtreralkoholprocent(event) {
    console.log("klik på alkohol-filter");

    // find all ikke vegetar-produkter
    var liste = document.querySelectorAll(".produkt:not(.alkoholprocent)");

    //skjul dem - tilfører klassen hide
    liste.forEach(div => div.classList.toggle("hide"));

    document.getElementById("checkbox").checked = true;

    //ved preventdefault så scroller siden ikke op til toppen ved klik på filterknappen.
    event.preventDefault();
}



function visproduktliste(listen) {
    console.table(listen);

    // TODO: filtrer udsolgte produkter fra ...

    listen = listen.filter(produkt => !produkt.udsolgt);


    listen.forEach(visprodukt);


    // != er det samme som at sige at man ikke returner produktet
    //    function fjernudsolgte(produkt) {
    //        return !produkt.udsolgt:
    //    }
    //}
    /*function fjernudsolgte(produkt) {
        if (produkt.udsolgt == true) {
            //produktet skal fjernes
            return false;
        } else
        //produktet skal forblive i listen
            return true;
    }*/
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

    klon.querySelector(".data_billede").src = "imgs/medium/" + produkt.billede + "-md.jpg";

    if (produkt.udsolgt == false) {
        // produktet er ikke udsolgt
        // udsolgtekst skal fjernes

        var udsolgtekst = klon.querySelector(".udsolgtekst");
        udsolgtekst.parentNode.removeChild(udsolgtekst);

    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }
    if (produkt.udsolgt == true || produkt.rabatsats == 0) {
        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        klon.querySelector(".pris").classList.add("rabat");
    }

    // tilfør klasser til produkt

    if (produkt.vegetar == true) {
        klon.querySelector(".produkt").classList.add("vegetar");
    }

    if (produkt.udsolgt) {
        klon.querySelector(".produkt").classList.add("udsolgt")
    }

    if (produkt.rabatsats > 0) {
        klon.querySelector(".produkt").classList.add("rabatsats")
    }

    if (produkt.alkoholprocent > 0) {
        klon.querySelector(".produkt").classList.add("alkoholprocent")
    }
    // tilfør produkt ID til modalknap

    klon.querySelector(".modalknap").dataset.produkt = produkt.id;
    //registere klik på modalknap

    klon.querySelector(".modalknap").addEventListener("click", modalknapklik);

    // append klon til .produkt_liste

    //    document.querySelector(".produktliste").appendChild(klon);
    if (produkt.kategori == "forretter") {
        document.querySelector(".forretterliste").appendChild(klon);
    } else
    if (produkt.kategori == "hovedretter") {
        document.querySelector(".hovedretliste").appendChild(klon);
    } else
    if (produkt.kategori == "desserter") {
        document.querySelector(".dessertliste").appendChild(klon);
    } else
    if (produkt.kategori == "drikkevarer") {
        document.querySelector(".drikkevarerliste").appendChild(klon);
    } else
    if (produkt.kategori == "sideorders") {
        document.querySelector(".sideordersliste").appendChild(klon);
    }

    //    if (produkt.vegetar == true) {
    //        klon.querySelector(".produkt").classList.add(".vegetar")
    //    }
}

function modalknapklik(event) {
    console.log("knapklik", event);

    // find det produkt id, hvis knap der blev trykket på
    var produktid = event.target.dataset.produkt;
    console.log("Klik på produkt: ", produktid);

    $.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?", {
        id: produktid
    }, vismodalprodukt);
}

function vismodalprodukt(produkt) {
    console.log("vis modal for", produkt);

    // find modal_template - klon den
    var klon = document.querySelector("#modal_template").content.cloneNode(true);
    // put data i klonen

    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;
    klon.querySelector(".data_langbeskrivelse").innerHTML = produkt.langbeskrivelse;
    klon.querySelector(".data_oprindelse").innerHTML = produkt.oprindelsesregion;



    // sletter det der stod i modal-content
    document.querySelector(".modal-content").innerHTML = "";

    // append klonen til modal-content

    document.querySelector(".modal-content").appendChild(klon);
}

// append klon til .produkt_liste

// document.queryselector(".produktliste").appendchild(klon);

// hvis kategori var forret, append til forretliste


// hvis kategori var hovedret, append til hovedretliste
$('a[href^="#"]').on('click', function (event) {

    var target = $(this.getAttribute('href'));

    if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }

});


if (window.matchMedia('(max-width: 970px)').matches) {
    $('.q-question').show();
    $('.clickr').load(function () {
        $('.q-question').slideToggle();
    });
    $('.clickr').click(function () {
        $('.q-question').slideToggle();
    });

} else {
    $('.q-question').hide();

    $('.clickr').hover(function () {
        $('.q-question').slideToggle();
    });
}
