

$(document).ready(function () {
    // podaci od znacaja 
    var host = window.location.host;
    var token = null;
    var headers = {};
    var objekatKorisnik = {};
    var objekatKorisnikPromenaUloge = {};
    var korisnik = " ";
    var korisnikId = 0;
    var stringIdKorisnik = 0;
    var administrator = " ";
    var stringImeFilma = '';
    var tipAkcije = "";
    var tabela = "";

    var sedista = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'C3', 'C4', 'C5'];
    var brojslobodnihSedista = 0;
    var ukupanBrojSedista = 15;
    var izabranaSedista = [];
    var stringFilmID = 0;
    var stringsalaId = 0;
    var projekcijaId = 0;
    var kupujemIzProjekcije = "";
    var KupiKartuprojekcijaId = 0;
    var sedisteId = 0;
    var cenaKarte = 0;

    pocetnaStranica();
    load();


    $("#buttonRegistracija").click(registrujStranica);
    $("#buttonPrijava").click(prijavaStranica);
    $("#buttonfilmovi").click(filmoviStranica);
    $("#buttonKorisnici").click(stranicaKorisnici);
    $("#buttonDodajProjekciju").click(prikaziFormuDodajProjekciju);
    $("#buttonDodajFilm").click(dodajFilm);
    $("#buttonBrisanjeFilma").click(obrisiFilm);
    $("#buttonIzmenaFilma").click(izmeniFilm);
    $("#buttonBrisanjeProjekcije").click(brisanjeProjekcije);
    $("#buttonIzmenaKorisnika").click(promenaUlogeKorisnika);
    $("#buttonizmenaLozinke").click(promenaLozinkeKorisnika);

    $("body").on("click", "#buttonfilmId", filmStranica);
    $("body").on("click", "#buttonKorisnickoIme", korisnikStranica);
    $("body").on("click", "#nalog", korisnikStranica);
    $("body").on("click", "#buttonProjekcijaId", projekcijaStranica);
    $("body").on("click", "#nazadDugme", nazad);
    $("body").on("click", "#nazadRacun", nazadIzRacuna);
    $("#odjava").click(odjava);

    //=======================================================================================UCITAVANJE POCETNE STRANICE =========
    function load() {
        url1 = 'https://' + host + '/api/Projekcije';
        url2 = 'https://' + host + '/api/Korisnik';
        $.getJSON(url2, RegistracijaKorisnikaIzBaze)
        $.getJSON(url1, popuniTabelu);
    };
    //================RegistracijaKorisnikaIzBaze ======================
    function RegistracijaKorisnikaIzBaze(data, status) {
       
       
        if (status == 'success' && ucitani == null) {
            for (var i = 0; i < data.length; i++) {
                console.log(data[i], status);
                $("#username").val(data[i].KorisnickoIme);
                $("#mailREG").val(data[i].KorisnickoIme.toString() + "@mail");
                $("#loz1REG").val(data[i].Lozinka);
                $("#loz2REG").val(data[i].Lozinka);
                var username = $("#username").val();
                var email = $("#mailREG").val();
                var loz1 = $("#loz1REG").val();
                var loz2 = $("#loz2REG").val();
                var sendData = {
                    "UserName": username,
                    "Email": email,
                    "Password": loz1,
                    "ConfirmPassword": loz2
                };
                $.ajax({
                    type: "POST",
                    url: 'https://' + host + "/api/Account/Register",
                    data: sendData
                }).done(function (data) {
 
                }).fail(function (data) {
                    return; 
                });
            }
        }
    }
    //===  pocetna stranica =========================================================POCETNA STRANA ==============
    function pocetnaStranica() {
        $("#prijavaRegitracija").show();
        $("#tabelaSaSortiranjem").show()
        $("#prijavaRegitracija").show();
        $("#filmoviDiv").show();

        $("#stranicaFilmDiv").hide();
        $("#infoDiv").hide();
        $("#prijavaDiv").hide();
        $("#registracijaDiv").hide();
        $("#adminButton").hide();
        $("#stranicaSviFilmovi").hide();
        $("#dodavanjeProjekcije").hide();
        $("#stranicaSviKorisnici").hide();
        $("#stranicaKorisnik").hide();
        $("#stranicaProjekcija").hide();
        $("#adminKorisnikProjekcije").hide();
        $("#adminbuttonFilmovi").hide();
        $("#formaPromenaUloge").hide();
        $("#formaPromenaLozinke").hide();
        $("#stranicaKupiKartu1").hide();
        $("#stranicaKupiKartu2").hide();
        $("#stranicaKupiKartu3").hide();

        $("#image").html('');
      
    }
    //============================================================================ stranica POSLE PRIJAVE  ==============
    function stranicaPoslePrijave() {
        // zavisi ko se prijavio , za  user ide : dugme nalog (klik);dugme odjava(klik)  , za admina plus dugmad 
        $("#tabelaSaSortiranjem").show();
        $("#infoDiv").show();
        $("#filmoviDiv").show();

        $("#registracijaDiv").hide();
        $("#prijavaDiv").hide();
        $("#prijavaRegitracija").hide();

        if (korisnik == "admin") {

            $("#adminButton").show();

        }
        
    }
    //==========dugme odjava ===========
    function odjava() {
        pocetnaStranica();
        $("#infoDiv").hide();
        $("#korisnik").html("NEPRIJAVLJEN");
        $("#nalog").html("TVOJ NALOG");
        korisnik = " ";
        korisnikId = 0;
        token = null;
        load();
    };
    //============dugme nazad ==============
    function nazad() {
        $("#infoDiv").show();
        if (korisnik == 'user' || korisnik == 'admin') {
            stranicaPoslePrijave();
            $("#stranicaSviKorisnici").hide();
            $("#stranicaProjekcija").hide();
            $("#dodavanjeProjekcije").hide();
            $("#stranicaKorisnik").hide();
            $("#stranicaFilmDiv").hide();
            $("#stranicaSviFilmovi").hide();
            $("#buttonfilmovi").show();
            $("#filmoviDiv").show();
        } else {
            pocetnaStranica();
        }
        load();
    }
    //===============dugme registracija =============
    function registrujStranica() {
        $("#registracijaDiv").show();
        $("#tabelaSaSortiranjem").hide();
        $("#prijavaRegitracija").hide();
        $("#buttonfilmovi").hide();
        $("#filmoviDiv").hide();
    }
    // =============== dugme   prijava ==================
    function prijavaStranica() {
        $("#registracijaDiv").hide();
        $("#tabelaSaSortiranjem").hide();
        $("#prijavaDiv").show();
        $("#prijavaRegitracija").hide();
        $("#filmoviDiv").hide();
    }
        //=============stranica jednog filma ======================================= JEDAN FILM =================
    function filmStranica() {
    
        $("#infoDiv").show();
        $("#stranicaFilmDiv").show();
        $("#buttonStranicaFilm").show();
       
        $("#prijavaRegitracija").hide();
        $("#prijavaDiv").hide();
        $("#registracijaDiv").hide();
        $("#tabelaSaSortiranjem").hide();
        $("#buttonKupiKartuFilm").hide();
        $("#buttonIzmenaFilma").hide();
        $("#buttonBrisanjeFilma").hide();
        $("#stranicaKorisnik").hide();
        $("#filmoviDiv").hide();
        stringImeFilma = this.name;
        url = 'https://' + host + '/api/Filmovi/?name=' + stringImeFilma;
        $.getJSON(url, ucitajFilm);
    }
    //=========================================================================ucitaj film ==================
    function ucitajFilm(data, status) {
        var container = $("#podaciFilm");
        container.empty();
        if (status == "success") {
            var div = $("<div></div>")
            var h1 = $(" <h3> Film </h3>");
            div.append(h1);
            var podaciFilma = $("<label> Naziv filma        :" + data.Naziv + " </label><br/>" +
                "<label> Reziser            :" + data.Reziser + " </label><br/>" +
                "<label> Glumci              :" + data.Glumci + " </label><br/>" +
                "<label>Zanr                 :" + data.Zanr + " </label><br/>" +
                "<label>Trajanje             :" + data.Trajanje + " </label><br/>" +
                "<label>Distributer          :" + data.Distributer + " </label><br/>" +
                "<label> Zemlja              :" + data.Zemlja + " </label><br/>" +
                "<label> Godina proizvodnje  :" + data.GodinaProizvodnje + " </label><br/>" +
                "<label> Opis                :" + data.Opis + " </label><br/>");
            container.append(podaciFilma);
            if (token != null && korisnik == "admin") {
                $("#buttonIzmenaFilma").show();
                $("#buttonBrisanjeFilma").show();
            }
            if (token != null && korisnik == "user") {
                $("#buttonKupiKartuFilm").show();
            }
        }
        else {
            var div = $("<div></div>");
            var h1 = $(" <h1>   desila se greska prilikom ucitavanja tabele</h1>");
            div.append(h1);
            container.append(div);
        }
    }
    //========================================================================FILMOVI ===================
    function filmoviStranica() {
        $("#infoDiv").show();
        $("#prijavaRegitracija").hide();
        $("#prijavaDiv").hide();
        $("#registracijaDiv").hide();
        $("#tabelaSaSortiranjem").hide();
        $("#stranicaFilmDiv").hide();
        $("#buttonkupikartu").hide();
        $("#buttonIzmenaFilma").hide();
        $("#buttonBrisanjeFilma").hide();
        $("#filmoviDiv").hide();
        $("#stranicaSviFilmovi").show();
        $("#formaDodajFilm").hide();
        if (korisnik == 'admin') {
            $("#adminbuttonFilmovi").show();
        }
        url4 = 'https://' + host + '/api/filmovi';
        $.getJSON(url4, filmoviTabela)

    };
    //=========================================================================DODAJ FILM ==============
    function dodajFilm() {

        $("#formaDodajFilm").show();
        var lista = ["komedija", "horor", "Akcioni", "SF"];
        dropZanrovi(lista);
    }
    //============= submit film ==============
    $("#formaDodajFilm").submit(function (e) {
        e.preventDefault();
        var naziv = $("#nazivDodajFilm").val();
        var reziser = $("#reziserFilma").val();
        var glumci = $("#glumciFilm").val();
        var zanr = $("#zanrFilma").val();
        var trajanje = $("#trajanjeFilm").val();
        var distributer = $("#distributerFilm").val();
        var zemlja = $("#zemljaFilm").val();
        var godinaProizvodnje = $("#godinaProizvodnjeFilm").val();
        var opis = $("#opisFilm").val();
       
        if (tipAkcije == "izmena") {
           
            var httpAction = "PUT";
            var url = "https://" + host + '/api/filmovi/' + stringFilmID.toString();
            var sendData = {
                "Id": stringFilmID.toString(),
                "Naziv": naziv,
                "Reziser": reziser,
                "Glumci": glumci,
                "Zanr": zanr,
                "Trajanje": trajanje,
                "Distributer": distributer,
                "Zemlja": zemlja,
                "GodinaProizvodnje": godinaProizvodnje,
                "Opis": opis
            };
        } else {
            var httpAction = "POST";
            var url = "https://" + host + '/api/filmovi/';
           var sendData = {

                "Naziv": naziv,
                "Reziser": reziser,
                "Glumci": glumci,
                "Zanr": zanr,
                "Trajanje": trajanje,
                "Distributer": distributer,
                "Zemlja": zemlja,
                "GodinaProizvodnje": godinaProizvodnje,
                "Opis": opis
            };
        }
        $.ajax({
            type: httpAction,
            url: url,
            data: sendData
        }).done(function (data) {
            osveziUnosFilma();
            $("#formaDodajFilm").hide();
        }).fail(function (data) {
            osveziUnosFilma();
            alert(" doslo je do greske prilikom unosa filma", data);
        });

    });
    //==================================================================================OBRISI FILM ==================
    function obrisiFilm() {
        var httpAction1 = "GET";
        var url1 = 'https://' + host + '/api/Filmovi/?name=' + stringImeFilma;  //prvo dobavim film na osnovu naziva ,treba mi ID 
        $.ajax({
            type: httpAction1,
           url: url1
        }).done(function (data) {
            console.log(data);
            stringFilmID = data.Id;                                          
            //================================
            var httpAction2 = "DELETE";
            var url2 = 'https://' + host + '/api/Filmovi/' + stringFilmID.toString();
            $.ajax({
                type: httpAction2,
                url: url2
            }).done(function (data) {
                stranicaPoslePrijave();
                load();
            }).fail(function (data) {
                osveziUnosFilma();
                alert(" doslo je do greske prilikom brisanja filma", data);
            });
            //=============================

        }).fail(function (data) {

            alert(" doslo je do greske prilikom trazenja filma po imenu", data);
        });
    }
    //=======================================================================================IZMENA FILMA ===============
    function izmeniFilm() {

        $("#stranicaSviFilmovi").show();
       
        $("#tabelaFilmovi").hide();
        $("#adminbuttonFilmovi").hide();
        $("#nazadDiv").hide();
        tipAkcije = "izmena";
        $("#dodajFilm").html("IZMENI FILM ");
        var httpAction1 = "GET";
        var url1 = 'https://' + host + '/api/Filmovi/?name=' + stringImeFilma;
        $.ajax({
            type: httpAction1,
            url: url1
        }).done(function (data) {
            console.log(data);
            stringFilmID = data.Id;
            
            $("#nazivDodajFilm").val(data.Naziv);
            $("#reziserFilma").val(data.Reziser);
            $("#glumciFilm").val(data.Glumci);
            $("#zanrFilma").val(data.Zanr);
            $("#trajanjeFilm").val(data.Trajanje);
            $("#distributerFilm").val(data.Distributer);
            $("#zemljaFilm").val(data.Zemlja);
            $("#godinaProizvodnjeFilm").val(data.GodinaProizvodnje);
            $("#opisFilm").val(data.Opis);

            dodajFilm();
        }).fail(function (data) {

            alert(" doslo je do greske prilikom unosa podataka za  izmenu filma", data);
        });

    }
    //=========osvezi unos filma ===============
    function osveziUnosFilma() {
        $("#nazivDodajFilm").val('');
        $("#reziserFilma").val('');
        $("#glumciFilm").val('');
        $("#zanrFilma").val('');
        $("#trajanjeFilm").val('');
        $("#distributerFilm").val('');
        $("#zemljaFilm").val('');
        $("#godinaProizvodnjeFilm").val('');
        $("#opisFilm").val('');
    };
    //==========  zanrovi filma ==============

    function dropZanrovi(lista) {
        var container2 = $("#zanrFilma");
        $("#zanrFilma").empty();
        console.log(lista);
        for (i = 0; i < lista.length; i++) {
            $('#zanrFilma').append($('<option></option>').val(lista[i]).html(lista[i]));
        }
    };
    //================================================================================ UCITAJ  FILMOVE ================
    function filmoviTabela(data, status) {
        var container = $("#tabelaFilmovi");
        container.empty();
       
        if (status == "success") {
            var div = $("<div></div>")
            var h1 = $(" <h3> Filmovi </h3>");
            div.append(h1);
            var table = $("<table  class='table table-bordered'></table>");
            var header = $("<thead  style='background-color:aquamarine '><tr > <td>Naziv filma </td> <td> Zanr </td>  <td>Trajanje</td>  <td>Distributer</td> <td>Zemlja</td><td>Godina proizvodnje</td><tr></thead>");
            table.append(header);
           
            for (var i = 0; i < data.length; i++) {
                var row = "<tbody><tr class='success'>";
                var displayData = "<td>" + data[i].Naziv + "</td><td>" + data[i].Zanr + "</td><td>" + data[i].Trajanje + "</td><td>" + data[i].Distributer + "</td><td>" + data[i].Zemlja + "</td><td>" + data[i].GodinaProizvodnje + "</td>";
                row += displayData + "</tr></tbody>";
                table.append(row);
            }
            div.append(table);
            container.append(div);
        } else {
            var div = $("<div></div>");
            var h1 = $(" <h1>   desila se greska prilikom ucitavanja tabele</h1>");
            div.append(h1);
            container.append(div);
        }
    }
   
  
    //============ tabela projekcija  =================
    function popuniTabelu(data, status) {

        var container = $("#unosTabeleDiv");
        container.empty();

        if (status == "success") {

            var div = $("<div></div>")
            var h1 = $(" <h3> Projekcije </h3>");
            div.append(h1);
            var table = $("<table  class='table table-bordered'></table>");

            var header = $("<thead  style='background-color:aquamarine '><tr > <td>FILM</td> <td>DATUM I VREME  </td> <td>TIP PROJEKCIJE</td>  <td>SALA</td> <td>CENA</td><tr></thead>");

            table.append(header);
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                var row = "<tbody><tr class='success'>";
                var stringProjekcijaId = data[i].Id.toString();
                var stringNazivFilma = data[i].Film.Naziv.toString();
                var datum = data[i].DatumVreme;
                
                var displayData = "<td><button id=buttonfilmId class=btn-default name=" + stringNazivFilma + ">" + data[i].Film.Naziv + "</button></td><td><button id=buttonProjekcijaId class= btn-default name=" + stringProjekcijaId + ">" + datum + "</button></td><td>" + data[i].Tip.Naziv + "</td><td>" + data[i].Sala.Naziv + "</td><td>" + data[i].CenaKarte + "</td>";
                var displayOdaberi = "<td><button id=buttonKupiKartu class=btn-default name=" + stringProjekcijaId + ">[KUPI KARTU]</button></td>";

                if (tabela == "kupikartu") {
                    row += displayData + displayOdaberi + "</tr></tbody>";
                }
                else {
                    row += displayData + "</tr></tbody>";
                }

                table.append(row);
            }
            div.append(table);
            container.append(div);

        } else {
            var div = $("<div></div>");
            var h1 = $(" <h1>   desila se greska prilikom ucitavanja tabele</h1>");
            div.append(h1);
            container.append(div);
        }
    };
    // ======================================================================================PRIJAVA ==============
    $("#formaPrijava").submit(function (e) {
        e.preventDefault();
        var username = $("#usernamePr").val();
        var loz = $("#lozPr").val();
        var sendData = {
            "grant_type": "password",
            "username": username,
            "password": loz
        };

            $.ajax({
                "type": "GET",
                "url": 'https://' + host + '/api/korisnik/?name=' + username,
            }).done(function (data) {
                objekatKorisnik = data;
                korisnik = data.Uloga.toString();
                korisnikId = data.Id;
            
            }).fail(function (data) {
                alert(" korisnik se NE nalazi u bazi podataka ");
            });
       $.ajax({
            "type": "POST",
            "url": 'https://' + host + "/Token",
            "data": sendData
        }).done(function (data) {
           
           
            $("#nalog").html(data.userName);
            $("#korisnik").html(korisnik);

            token = data.access_token;
            administrator = data.userName.toString();
   
            osveziPrijavu();
            stranicaPoslePrijave();
            load();
        }).fail(function (data) {
            osveziPrijavu();
            alert(" doslo je do greske prilikom prijavljivanja", data);
        });
   });
    //===============================================================================REGISTRACIJA  + (dodavanje Korisnika u bazu )================
    $("#formaRegistracija").submit(function (e) {
        e.preventDefault();
        var username = $("#username").val();
        var email = $("#mailREG").val();
        var loz1 = $("#loz1REG").val();
        var loz2 = $("#loz2REG").val();
        var d = Date();
        var sendData = {
            "UserName": username,
            "Email": email,
            "Password": loz1,
            "ConfirmPassword": loz2

        };
        $.ajax({
            type: "POST",
            url: 'https://' + host + "/api/Account/Register",
            data: sendData
        }).done(function (data) {

            //============dodajem u bazu korisnika =====
            httpaction = "post";
            url = 'https://' + host + "/api/korisnik/";
            senddata = {
                "KorisnickoIme": username,
                "Lozinka": loz1,
                "DatumRegistracije": new Date().toJSON(),
                "Uloga": "user"
            };
            $.ajax({
                url: url,
                type: httpaction,
                data: senddata
            }).fail(function (data, status) {

                alert("desila se greska unosa korisnika u bazu !");
            })
            //===============================================
            osveziRegistraciju();
            $("#registracijaDiv").hide();
            $("#prijavaDiv").show();
            $("#tabelaSaSortiranjem").show();
        }).fail(function (data) {
            osveziRegistraciju();
            console.log(data, email.toString(), loz1);
            alert(" nije izvrsena registracija", data);
        });
    });

    //====osvezi registraciju ===========
    function osveziRegistraciju() {
        $("#mailREG").val("");
        $("#loz1REG").val("");
        $("#loz2REG").val("");
        $("#username").val("");
    }
    //=============osvezi prijavu ===========
    function osveziPrijavu() {
        $("#usernamePr").val("");
        $("#lozPr").val("");
    }

    //================osvezi dodavanje projekcije =====
    function osveziDodProjekcije() {
        $("#datumProjekcije").val("");
        $("#cenaKarte").val("");

        $("#imeFilma").val("");
        $("#tipoviDrop").val("");
        $("#salaDrop").val("");
    }
    //========pretraga projekcija ===================
    $("#pretraga").submit(function (e) {
        e.preventDefault();
        var nazivFilma = $("#nazivFilma").val();
        var sala = $("#sala").val();
        var datumivreme1 = $("#datumivreme1").val();
        var datumivreme2 = $("#datumivreme2").val();
        var tipprojekcije = $("#tipprojekcije").val();
        var cenakarte1 = $("#cenakarte1").val();
        var cenakarte2 = $("#cenakarte2").val();
        httpaction = "POST";
        url = 'https://' + host + "/api/Projekcije/Pretraga";
        senddata = {
            "NazivFilma": nazivFilma,
            "Sala": sala,
            "DatumOd": datumivreme1,
            "DatumDo": datumivreme2,
            "TipSale": tipprojekcije,
            "CenaOd": cenakarte1,
            "CenaDo": cenakarte2
        };
       
        $.ajax({
            url: url,
            type: httpaction,
            data: senddata
        }).done(function (data, status) {
            popuniTabelu(data, status);
        }).fail(function (data, status) {

            alert("desila se greska unosa korisnika u bazu  !");
        })
    })

    //==============  dodaj projekciju  admin =================================================================PROJEKCIJA  DODAJ  FORMA============
    function prikaziFormuDodajProjekciju() {
        $("#dodavanjeProjekcije").show();
        //=============ucitavanje filmova ====================
        urlF = "https://" + host + '/api/filmovi';
        $.getJSON(urlF, dropdownFilmovi)
        //==============ucitavanje sala ===================
        urlS = "https://" + host + '/api/sale';
        $.getJSON(urlS, dropdownSale)
    }
    //  =============== drop Filmovi=============
    function dropdownFilmovi(data, status) {
        var container2 = $("#dropMestoId");
        $("#imeFilma").empty();
        if (status == "success") {
            console.log(data);
            for (i = 0; i < data.length; i++) {
                $('#imeFilma').append($('<option></option>').val(data[i].Id).html(data[i].Naziv));

            }
        }
        else {
            var div = $("<div></div>");
            var h1 = $("<h1>Greška prilikom preuzimanja fimova</h1>");
            div.append(h1);
            container2.append(div);
        }
    }
    //=================drop Sale=============
    function dropdownSale(data, status) {

        var container2 = $("#salaDrop");
        $("#salaProjekcije").empty();
        if (status == "success") {
            console.log(data);
            for (i = 0; i < data.length; i++) {
               $('#salaProjekcije').append($('<option></option>').val(data[i].Id).html(data[i].Naziv));
            }
        }
        else {
            var div = $("<div></div>");
            var h1 = $("<h1>Greška prilikom preuzimanja Mesta</h1>");
            div.append(h1);
            container2.append(div);
        }
        //============ucitavanje tip sale ==============
        salaId = $("#salaProjekcije").val();
        var urlTipoviSale = "https://" + host + '/api/sale/?salaid=' + salaId;
        $.getJSON(urlTipoviSale, dropdownTipoviSale);
        
    }
    //================drop tipoviSale ==============
    $("#salaProjekcije").change(function () {
        salaId = $("#salaProjekcije").val();
        var urlTipoviSale = "https://" + host + '/api/sale/?salaid=' + salaId;

        $.getJSON(urlTipoviSale, dropdownTipoviSale);
      
     });
    function dropdownTipoviSale(data, status) {

        var container3 = $("#tipoviDrop");
        $("#tipProjekcije").empty();
        if (status == "success") {
            for (i = 0; i < data.length; i++) {
                $('#tipProjekcije').append($('<option></option>').val(data[i].Id).html(data[i].Naziv));
            }
        }
        else {
            var div = $("<div></div>");
            var h1 = $("<h1>Greška prilikom preuzimanja Mesta</h1>");
            div.append(h1);
            container3.append(div);
        }
    }
    //===============  dodaj projekciju  =================================================================PROJEKCIJA DODAVANJE =================
    $("#formaDodajProjekciju").submit(function (e) {

        e.preventDefault();
        var datum = $("#datumProjekcije").val();
        var cena = $("#cenaKarte").val();
        var admin = administrator;
        var filmId = $("#imeFilma").val();
        var tipId = $("#tipProjekcije").val();
        var salaId = $("#salaProjekcije").val();
        var httpAction = "POST";
        var url = "https://" + host + '/api/projekcije/';
        var sendData = {
            "DatumVreme": datum,
            "CenaKarte": cena,
            "Administrator": admin,
            "FilmId": filmId,
            "TipId": tipId,
            "SalaId": salaId
        };
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            url: url,
            type: httpAction,
            headers: headers,
            data: sendData
        }).done(function (data, status) {
            load();
            osveziDodProjekcije();
            $("#dodavanjeProjekcije").hide();

        }).fail(function (data, status) {
            alert("Desila se greska unosa projekcije !");
        })

    });
    //==================ispis svih korisnika ======================================================KORISNICI =========
    function stranicaKorisnici() {


        $("#infoDiv").show();
        $("#prijavaRegitracija").hide();
        $("#prijavaDiv").hide();
        $("#registracijaDiv").hide();
        $("#tabelaSaSortiranjem").hide();
        $("#stranicaFilmDiv").hide();
        $("#buttonfilmovi").hide();
        $("#buttonkupikartu").hide();
        $("#buttonIzmenaFilma").hide();
        $("#buttonBrisanjeFilma").hide();
        $("#stranicaSviFilmovi").hide();
        $("#stranicaSviKorisnici").show();
        $("#dodavanjeProjekcije").hide();

       // $.getJSON(url, tabelaKorisnici)
        url = 'https://' + host + '/api/korisnik';
        httpAction = "GET";
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }

        $.ajax({
            url: url,
            type: httpAction,
            headers: headers,
           
        }).done(function (data, status) {
            tabelaKorisnici(data, status);
           

        }).fail(function (data, status) {
            alert("Desila se greska  unosa korisnika  !");
        })
      
    };
    //============tabela korisnici =============
    function tabelaKorisnici(data, status) {
        //   na svim stranicama dugme korisnici ,korisnicko ime datum registracije uloga 
        var container = $("#tabelaKorisnici");
        
        container.empty();

        if (status == "success") {

            var div = $("<div></div>")
            var h1 = $(" <h3> Korisnici </h3>");
            div.append(h1);
            var table = $("<table  class='table table-bordered'></table>");

            var header = $("<thead  style='background-color:aquamarine '><tr> <td> korisnicko ime  </td>  <td>Datum registracije</td>  <td>Uloga </td><tr> </thead>");

            table.append(header);

            for (var i = 0; i < data.length; i++) {
                var stringKorisnikId = data[i].Id.toString();
                var row = "<tbody><tr class='success'>";
                var displayData = "<td><button id='buttonKorisnickoIme' class=btn-default name=" + stringKorisnikId + ">" + data[i].KorisnickoIme + "</button></td><td>" + data[i].DatumRegistracije + "</td><td>" + data[i].Uloga + "</td></td>";
                row += displayData + "</tr></tbody>";
                table.append(row);
            }

            div.append(table);
            container.append(div);
        } else {
            var div = $("<div></div>");
            var h1 = $(" <h1>   desila se greska prilikom ucitavanja tabele</h1>");
            div.append(h1);
            container.append(div);
        }

    }//====================dolazak stranica Korisnik posle klika na TVOJ NALOG ========== (treba mi id korisnika )=====
   
    //========================================================================================== KORISNIK ================
    function korisnikStranica() {
        
        $("#infoDiv").show();
        $("#stranicaKorisnik").show();

        $("#prijavaRegitracija").hide();
        $("#prijavaDiv").hide();
        $("#registracijaDiv").hide();
        $("#tabelaSaSortiranjem").hide();
        $("#stranicaFilmDiv").hide();
        $("#stranicaSviFilmovi").hide();
        $("#buttonKupiKartuFilm").hide();
        $("#buttonfilmovi").hide();
        $("#buttonIzmenaFilma").hide();
        $("#buttonBrisanjeFilma").hide();
        $("#buttonizmenaLozinke").hide();
        $("#buttonIzmenaKorisnika").hide();
        $("#buttonBrisanjeKorisnika").hide();
        $("#stranicaSviKorisnici").hide();

        // ako sam dosao ovde pritiskom na dugme tvoj nalog id?, ili ako sam dosao sa stranice svi korisnici
        if (this.name == '') {
            stringIdKorisnik = korisnikId;
        } else {
            stringIdKorisnik = this.name;
        }
         url = 'https://' + host + '/api/Korisnik/' + stringIdKorisnik.toString();
        httpAction = "GET";
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            url: url,
            type: httpAction,
            headers: headers,
        }).done(function (data, status) {
            prikaziKorisnika(data, status);

        }).fail(function (data, status) {
            alert("Desila se greska  unosa korisnika  !");
        })
    }
    //====================ucitaj korisnika  ===============
    function prikaziKorisnika(data, status) {
        var container = $("#podaciKorisnik");
        container.empty();

        objekatKorisnikPromenaUloge = data; 
        if (status == "success") {

            var div = $("<div></div>")
            var h1 = $(" <h3> Korisnik</h3>");
            div.append(h1);
            var podaciKorisnika = $("<p> Korisnicko ime       :" + data.KorisnickoIme + " </p><br/>" +
                "<p> Datum registracije                       :" + data.DatumRegistracije + " </p><br/>" +
                "<p> Uloga                                    :" + data.Uloga + " </p><br/>");

            container.append(podaciKorisnika);
            if (token != null && korisnik == "admin") {
                $("#buttonIzmenaKorisnika").show();
                $("#buttonBrisanjeKorisnika").show();
                dobaviKupljeneKarte();
            }
            if (token != null && stringIdKorisnik == korisnikId) {

                $("#buttonizmenaLozinke").show();
                $("#buttonIzmenaKorisnika").hide();
                $("#buttonBrisanjeKorisnika").hide();


            }
        }
        else {
            var div = $("<div></div>");
            var h1 = $(" <h1>   desila se greska prilikom ucitavanja tabele</h1>");
            div.append(h1);
            container.append(div);
        }

    }

    //========================================================================promena uloge korisnika ==========
    function promenaUlogeKorisnika() {
        $("#formaPromenaUloge").show();
      
    }

    $("#formaUloga").submit(function(e){
        e.preventDefault();
        //=====================================================================prvo dobavim informacije o korisniku =======
        var Id = objekatKorisnikPromenaUloge.Id;     
        var uloga = $("#izabranaUloga").val();
        var httpAction = "PUT";
        var url = "https://" + host + '/api/korisnik/' + Id.toString();
        var sendData = {
            "Id": Id,
            "Lozinka": objekatKorisnikPromenaUloge.Lozinka,
            "KorisnickoIme": objekatKorisnikPromenaUloge.KorisnickoIme,
            "DatumRegistracije": objekatKorisnikPromenaUloge.DatumRegistracije,
            "Uloga": uloga
        };
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            url: url,
            type: httpAction,
            headers: headers,
            data: sendData
        }).done(function (data, status) {
            stranicaKorisnici();
            $("#stranicaKorisnik").hide();
            $("#formaPromenaUloge").hide();

        }).fail(function (data, status) {
            alert("Desila se greska promene uloge korisnika !");
        })

    });
    //=========================================promena lozinke   MOZE SAMO KORISNIK ZA SEBE DA PROMENI LOZINKU ZBOG AKTUELNOG TOKENA KOJI CUVAM 
    //============================================== DA NE BI MORAO DA DOBAVLJAM NOVI TOKEN ===================
    function promenaLozinkeKorisnika() {
        
        $("#formaPromenaLozinke").show();

    }


    $("#formaPromenaLozinke").submit(function (e) {
        e.preventDefault();
        //=============treba promeniti lozinku u asp.user ,i onda promeniti i u sql tabeli

        
        var staraLozinka = $("#staraLozinka").val() ;    
        var novaLozinka1 = $("#novaLozinka1").val(); 
        var novaLozinka2 = $("#novaLozinka2").val(); 

        
       var sendData = {
            
           "OldPassword": staraLozinka,
           "NewPassword": novaLozinka1,
           "ConfirmPassword": novaLozinka2
        };
        console.log("stara lozinka", staraLozinka);
        console.log("nova  lozinka", novaLozinka1);
        console.log("nova2 lozinka", novaLozinka2);
        console.log("send data", sendData);
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            "type": "POST",
            "url": 'https://' + host + "/api/Account/ChangePassword",
            headers: headers,
            "data": sendData
        }).done(function (data) {
            console.log("promeni sam lozinku");

        }).fail(function (data) {
            console.log("ovo su podaci koje sam slao  ",data);
            alert(" doslo je do greske prilikom promene lozinke", data);
        });
        //===============================================================promena lozinke u bazi =====
        
        var httpAction = "PUT";
        var url = "https://" + host + '/api/korisnik/' + objekatKorisnik.Id.toString();
        var sendData = {
            "Id": objekatKorisnik.Id,
            "Lozinka": novaLozinka1 ,
            "KorisnickoIme": objekatKorisnik.KorisnickoIme,
            "DatumRegistracije": objekatKorisnik.DatumRegistracije,
            "Uloga": objekatKorisnik.Uloga

        };
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }

        $.ajax({
            url: url,
            type: httpAction,
            headers: headers,
            data: sendData
        }).done(function (data, status) {
            stranicaKorisnici();
            $("#stranicaKorisnik").hide();
            $("#formaPromenaUloge").hide();

        }).fail(function (data, status) {
            alert("Desila se greska promene uloge korisnika !");
        })

    });
    // ==============================================================================BRISANJE KORISNIKA ======
    $("#buttonBrisanjeKorisnika").click(obrisiKorisnika);
    function obrisiKorisnika() {
        var httpAction = "DELETE";
        var url = "https://" + host + '/api/korisnik/' + objekatKorisnikPromenaUloge.Id.toString();
       
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }

        $.ajax({
            url: url,
            type: httpAction,
            headers: headers,
            
        }).done(function (data, status) {
            stranicaKorisnici();
            $("#stranicaKorisnik").hide();
            $("#formaPromenaUloge").hide();
        }).fail(function (data, status) {
            alert("Desila se greska  prilikom brisanja korisnika !");
        })

    } 
    //=========================================================================TABELA KUPLJENIH KARATA KORISNIKA ============
    function dobaviKupljeneKarte() {
      // prikazivanje korisnika  i kupljenih karata UKUPNO ako si admin
      //  api / Karte /? korisnikId =
        var id = objekatKorisnikPromenaUloge.Id;
        url = "https://" + host + '/api/karte/?korisnikId=' + id.toString();
            $.getJSON(url, popuniTabeluKupljeneKarte );

    }

    function popuniTabeluKupljeneKarte(data, status) {

        console.log("dobavljene prodate karte ", data);
        var container = $("#tabelaKupljenihKarataKorisnik");

        container.empty();

        if (status == "success") {

            var div = $("<div></div>")
            var h1 = $(" <h3>Kupljene karte  </h3>");
            div.append(h1);
            var table = $("<table  class='table table-bordered'></table>");

            var header = $("<thead  style='background-color:aquamarine '><tr> <td> korisnik  </td>  <td>Projekcija vreme</td>  <td>Projekcija sala </td>  <td>Sediste  </td><tr> </thead>");

            table.append(header);

            for (var i = 0; i < data.length; i++) {
               
                var row = "<tbody><tr class='success'>";
                var displayData = "<td>" + data[i].Korisnik.KorisnickoIme + "</td><td>" + data[i].Projekcija.DatumVreme + "</td><td>" + data[i].Projekcija.Sala.Naziv + "</td><td>" + data[i].Sediste.RedniBroj + "</td>";
                row += displayData + "</tr></tbody>";
                table.append(row);
            }

            div.append(table);
            container.append(div);
        } else {
            var div = $("<div></div>");
            var h1 = $(" <h1>   desila se greska prilikom ucitavanja tabele</h1>");
            div.append(h1);
            container.append(div);
        }

    }

    //============stranica Projekcija ==================================================PROJEKCIJA=============
    function projekcijaStranica() {
        $("#infoDiv").show();
        $("#stranicaProjekcija").show();

        $("#KupiKartuProjekcija").hide();
        $("#adminKorisnikProjekcije").hide();
        $("#prijavaRegitracija").hide();
        $("#prijavaDiv").hide();
        $("#registracijaDiv").hide();
        $("#tabelaSaSortiranjem").hide();
        $("#stranicaFilmDiv").hide();
        $("#buttonkupikartu").hide();
        $("#buttonIzmenaFilma").hide();
        $("#buttonBrisanjeFilma").hide();
        $("#stranicaSviKorisnici").hide();
        $("#stranicaKorisnik").hide();
        $("#filmoviDiv").hide();
       
       projekcijaId = this.name;
       
        console.log('podaci projekcijaId ', projekcijaId);
        url = 'https://' + host + '/api/projekcije/' + projekcijaId.toString();
        httpAction = "GET";
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            url: url,
            type: httpAction,
            headers: headers

        }).done(function (data, status) {
           
            stringsalaId = data.Sala.Id;
            prodateKarte(stringsalaId);
            kupujemIzProjekcije = "DA";
            projekcijaId = data.Id;
            popuniPodatkeProjekcije(data, status);
  
            if (korisnik=="user") {

                $("#KupiKartuProjekcija").show();
            }
            if (korisnik == "admin") {
                $("#KupiKartuProjekcija").show();
                $("#adminKorisnikProjekcije").show();

              }
           
        }).fail(function (data, status) {
            alert("Desila se greska!");
        });
                
    }
    //==================================================================BRISANJE PROJEKCIJE========

    function brisanjeProjekcije() {

        url = 'https://' + host + '/api/projekcije/' + projekcijaId.toString();
        if (token != null) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            url: url,
            type: "DELETE",
            headers: headers,

        }).done(function (data, status) {

            $("#stranicaProjekcija").hide();
            stranicaPoslePrijave();

        }).fail(function (data, status) {
            alert("desila se greska  prilikom  brisanja  projekcije !");
        })

    }
    // =========                                        lista prodatih karata  za projekciju i konkretnu salu ============
    function prodateKarte(salaId) {

        stringSalaId = salaId;
        url = 'https://' + host + '/api/karte/?salaId=' + stringSalaId.toString();
        $.ajax({
            url: url,
            type: "GET",

        }).done(function (data, status) {
            popuniProdateKarteTabelu(data, status);
            brojslobodnihSedista = ukupanBrojSedista - data.length;
            $("#brojSlobodihSedista").html("BROJ SLOBODNIH SEDISTA  : " + brojslobodnihSedista.toString());

        }).fail(function (data, status) {
         alert("desila se greska  prilikom  ucitavanja prodatih karatas !");
        })
        
    }
    //==================================================================================podaci tabela  projekcije =============
    function popuniPodatkeProjekcije(data, status) {
        var container = $("#podaciProjekcija");
        container.empty();

        console.log('podaci za ispis projekcije', data, status);
        projekcijaId = data.Id;
        if (status == "success") {
            var div = $("<div></div>")
            var h1 = $(" <h3> PROJEKCIJA </h3>");
            div.append(h1);
            var podaciKorisnika = $("<p> film     :" + data.Film.Naziv + " </p><br/>" +
                "<p> Datum i vreme                :" + data.DatumVreme + " </p><br/>" +
                "<p> Sala                         :" + data.Sala.Naziv + " </p><br/>" +
                "<p> Tip projekcije               :" + data.Tip.Naziv + " </p><br/>" +
                "<p> Cena karte                   :" + data.CenaKarte + " </p><br/>");
            container.append(podaciKorisnika);
                    }
        else {
            var div = $("<div></div>");
            var h1 = $(" <h1>   desila se greska prilikom ucitavanja tabele</h1>");
            div.append(h1);
            container.append(div);
        }
    
    }
    //===========================================================================popuni tabelu prodate  karte za konkretnu projekciju ==========
    function popuniProdateKarteTabelu(data, status) {
        var container = $("#tabelaProdateKarte");
        
        container.empty();
        if (status == "success") {

            var div = $("<div></div>")
            var h1 = $(" <h3> Prodate karte </h3>");
            div.append(h1);
            var table = $("<table  class='table table-bordered'></table>");

            var header = $("<thead  style='background-color:aquamarine '><tr> <td> ID karte  </td>  <td>Datum prodaje</td> <td> Korisnik </td><td>Projekcija vreme</td><td>Film</td><td>Cena karte</td><td>Sala </td> <td>Sediste </td><tr> </thead>");

            table.append(header);


            for (var i = 0; i < data.length; i++) {
                var stringKorisnikId = data[i].Id.toString();
                var row = "<tbody><tr class='success'>";
                var displayData = "<td>" + data[i].Id + "</td><td>" + data[i].DatumProdaje + "</td><td>" + data[i].Korisnik.KorisnickoIme + "</td><td> " + data[i].Projekcija.DatumVreme + "</td><td> " + data[i].Projekcija.Film.Naziv + "</td><td> " + data[i].Projekcija.CenaKarte + "</td ><td> " + data[i].Projekcija.Sala.Naziv + "</td><td> " + data[i].Sediste.RedniBroj + "</td > ";
                row += displayData + "</tr></tbody>";
                table.append(row);
            }

            div.append(table);
            container.append(div);
        } else {
            var div = $("<div></div>");
            var h1 = $(" <h1>   desila se greska prilikom ucitavanja tabele</h1>");
            div.append(h1);
            container.append(div);
        }




    }
    //==========================================================================================KUPI KARTU =====
    //=================================dolazak  iz stranice  filma ==============
    $("#buttonKupiKartuFilm").click(stranicaUnosKarte1);
    function stranicaUnosKarte1() {
        console.log(stringImeFilma);
        $("#tabelaSaSortiranjem").show();
        $("#unosTabeleDiv").show();
        $("#pretraga").hide();
        $("#adminButton").hide();
        $("#infoDiv").show();
        $("#stranicaProjekcija").hide();
        $("#prijavaRegitracija").hide();
        $("#prijavaDiv").hide();
        $("#registracijaDiv").hide();
        $("#stranicaFilmDiv").hide();
        $("#buttonkupikartu").hide();
        $("#buttonIzmenaFilma").hide();
        $("#buttonBrisanjeFilma").hide();
        $("#stranicaSviKorisnici").hide();
        $("#stranicaKorisnik").hide();
        $("#filmoviDiv").hide();


        var httpaction = "post";
        var url = 'https://' + host + "/api/Projekcije/Pretraga";
        var senddata = {
            "NazivFilma": stringImeFilma.toString(),
            "Sala": null,
            "DatumOd": null,
            "DatumDo": null,
            "TipSale": null,
            "CenaOd": null,
            "CenaDo": null

        };
        $.ajax({
            url: url,
            type: httpaction,
            data: senddata
        }).done(function (data, status) {

            tabela = "kupikartu";
            console.log(data);
            popuniTabelu(data, status);

        }).fail(function (data, status) {
            alert("desila se greska unosa korisnika u bazu  !");
        })
        tabela = "";
    }
    $("body").on("click", "#buttonKupiKartu", stranicaUnosKarte2);
    $("body").on("click", "#buttonKupiKartuProjekcija", stranicaUnosKarte2);

   
    //==================================dolazak iz stranice projekcije direktno ili  iz  film(izabrana projekcija tog filma) ====
    function stranicaUnosKarte2() {
        $("#tabelaSaSortiranjem").show();
        $("#unosTabeleDiv").show();
        $("#infoDiv").show();
        $("#stranicaKupiKartu2").show();

        $("#pretraga").hide();
        $("#adminButton").hide();
        $("#stranicaProjekcija").hide();
        $("#prijavaRegitracija").hide();
        $("#prijavaDiv").hide();
        $("#registracijaDiv").hide();
        $("#stranicaFilmDiv").hide();
        $("#buttonkupikartu").hide();
        $("#buttonIzmenaFilma").hide();
        $("#buttonBrisanjeFilma").hide();
        $("#stranicaSviKorisnici").hide();
        $("#stranicaKorisnik").hide();
        $("#filmoviDiv").hide();

        KupiKartuprojekcijaId = this.name;
       
        if (kupujemIzProjekcije == "DA") {

            url = 'https://' + host + '/api/projekcije/' + projekcijaId.toString();
            kupujemIzProjekcije = " ";
        } else {

            url = 'https://' + host + '/api/projekcije/' + KupiKartuprojekcijaId.toString();
        }

        
        console.log("ProjekcijaId   iz stranice unos karte", projekcijaId);
        console.log("KupiKartuProjekcija   iz stranice unos karte", KupiKartuprojekcijaId);
        console.log("Sta pise u kupovini KARTE", kupujemIzProjekcije);
       
        httpAction = "GET";
        $.ajax({
            url: url,
            type: httpAction,

        }).done(function (data, status) {
            console.log("podaci o projekciji iz kupi kartu", data, status)
            stringsalaId = data.Sala.Id;
            cenaKarte = data.CenaKarte;
            stranicaKartaProdaja2(data, status);       
            slobodnaSedistaProjekcije(data, status);

           
        }).fail(function (data, status) {
            alert("Desila se greska!");
        });

        //dodajem sedista i div izbor sedista


    }
    //=============================================================prikazivanje projekcije koju si izabrao 
    function stranicaKartaProdaja2(data, status) {
        $("#stranicaProjekcija").hide();
        $("#tabelaSaSortiranjem").hide();

        var container = $("#podaciProjekcija2");
        container.empty();
                                    projekcijaKonacnoIzabrana = data.Id;
        if (status == "success") {

            var div = $("<div></div>")
            var h1 = $(" <h3>PROJEKCIJA ZA KOJU KUPUJES KARTU</h3>");
            div.append(h1);
            var podaciProjekcija = $("<p> Film    :" + data.Film.Naziv + " </p><br/>" +
                "<p> Datum i vreme                :" + data.DatumVreme + " </p><br/>" +
                "<p> Sala                         :" + data.Sala.Naziv + " </p><br/>" +
                "<p> Tip projekcije               :" + data.Tip.Naziv + " </p><br/>" +
                "<p> Cena karte                   :" + data.CenaKarte + " </p><br/>");
            div.append(podaciProjekcija);
            container.append(div);
        }

        else {
            var div = $("<div></div>");
            var h1 = $(" <h1>   desila se greska prilikom ucitavanja tabele</h1>");
            div.append(h1);
            container.append(div);
        }

    }
    //====================================================================   tabela prodate karte =========
    function slobodnaSedistaProjekcije(data, status) {
        stringsalaId = data.SalaId;                            // ovo je id  sale gde je projekcija ,treba za sediste id  
        var stringprojekcijaId = data.Id.toString();          //  ovo je id projekcije 
        console.log('podaci za stringslaId', stringsalaId);
        url = 'https://' + host + '/api/karte/?projekcijaId=' + stringprojekcijaId;
        $.ajax({
            url: url,
            type: "GET",
        }).done(function (data, status) {
            console.log('podaci iz slobodna sedista popuni tabelu', data)
            popuniTabeluSedista(data, status);

        }).fail(function (data, status) {

            alert("desila se greska  prilikom  ucitavanja prodatih karata!");
        })

    }
    //=====================popuni tabelu prodata sedista za tu salu ================
    function popuniTabeluSedista(data, status) {
        // treba uneti prodatih sedista za tu projekciju (db.Karte.Include(x => x.Korisnik).Include(x => x.Projekcija.Film).Include(x => x.Projekcija.Sala).Include(x => x.Sediste).Where(x => x.Projekcija.Id == projekcijaId);)
        //  za svaki redni broj sedista dodajem attribut "disabled"
        // za svako markirano sediste (za kupovinu karte )  menjam class u "active" ( po default mora class='btn') i dodajem u listu izabranaSedista.push
        var container = $("#izborSedista");

        console.log(data);
        container.empty();

        var div = $("<div></div>")
        var h1 = $(" <h3> Izaberi sediste </h3>");
        var h2 = $(" <h3 style='text-align: left;'> ===================ekran================ </h3>");
        div.append(h1);
        div.append(h2);
        console.log(sedista);
        for (var i = 0; i < sedista.length; i++) {
            var row = "";
            var displayData = "<button  id='buttonsediste' class='btn' sediste=" + sedista[i] + " >sediste" + sedista[i] + "</button>";
                if ((i + 1) % 5 == 0) {

                    displayData += "<br>";
                }
                row += displayData;
                div.append(row);
        }
                container.append(div);
               //=============== ======================obeleziti u tabeli sedista koja su prodata  
       
                for (var j = 0; j < data.length; j++) {
                    var prodato = data[j].Sediste.RedniBroj.toString();   // data (podaci) su  od ('/api/karte/?projekcijaId=')
                    $('.btn').each(function () {

                        if ($(this).attr("sediste") == prodato) {
                               
                                $(this).attr("disabled", true);
                            }
                        });
                 }
    }
    
    $("body").on("click", "#buttonsediste", function () {
        $(this).toggleClass("active");
    });
    //===============stranica ucitavanje tabele slobodnih sedista i  prikazivanje podataka o  projekcijI,rezervisana sedista ,ukupna cena

    $("#dalje").click(obracun);
    //===================kalkulisanje rezultata ================
     function  obracun () {
       
         $('#stranicaKupiKartu3').show();
         $('#izborSedista').hide();
         $('#daljeKarta').hide();
         $('#unosTabeleDiv').hide();
         $('#kupiDiv').hide();
         if (token != null ) {
             $('#kupiDiv').show();
         }
      
         $('.btn').each(function () {            // svaka    'btn' classa (trenutno je aktivna samo tabela sedista  sa 'button' elementima )   
            if ($(this).hasClass("active")) {
                var sediste = $(this).attr("sediste");
                izabranaSedista.push(sediste );             
            }
        });
         console.log(izabranaSedista);
         var container = $("#stranicaKupiKartu3");
             $("#karteKupljene").append("<p> Izabrana sedista  za projekciju  </p>");
                 container.append(izabranaSedista.forEach(function (i) {                   // prolazim kroz listu obelezenih sedista
                 $("#karteKupljene").append('<li>' + i + '</li>');
                 }));

             $("#ukupnaCena").append('UKUPNA CENA  :' + (izabranaSedista.length * cenaKarte));
      
    };
    $("#konacnoKupi").click(stvoriKarte);
    //==========================================================================================STVARANJE KARTE ===================
    function stvoriKarte() {
  
        for (var i = 0; i < izabranaSedista.length; i++) {
            console.log("strinsalaId iz stvori kartu ", stringsalaId);
            console.log("izabrano sediste ", izabranaSedista[i]);
            sedisteIdBroj(stringsalaId, izabranaSedista[i].toString());  //stvaram kartu jednu po jednu 
          
        }
          
    }
    //================================================================ dobavljanje id broja  sedista koja su kupljena 
    function sedisteIdBroj(salaId, redniBroj) {
        //Get api/sedista/?salaId= && redniBroj=
        var url = "https://" + host + '/api/sedista/?salaId=' + salaId.toString() + '&&redniBroj=' + redniBroj.toString();
        $.ajax({
            url: url,
            type: "GET",
        }).done(function (data, status) {
            sedisteId = data.Id;
            kupovinaKarte(sedisteId);
            console.log('dodeljena vrednost sedista iz ajax poziva', sedisteId);

        }).fail(function (data, status) {

            alert("desila se greska  prilikom  ucitavanja prodatih karatas !");
        })

    }
     //====================================================================ZAJEDNO ZAVRSETAK KUPOVINE KARATA  =====================
    function kupovinaKarte(sedisteId) {
      // Karta :     Datum prodaje (danasnji datum),KorisnikId,projekcijaId,SedisteId
      // iz projekcije =>  imam id Sale ,   treba  mi   SedisteId
        var httpAction = "POST";
        var url = "https://" + host + '/api/karte/';
                  var sendData = {
                    "DatumProdaje": new Date().toJSON(),
                    "KorisnikId": korisnikId,
                    "ProjekcijaId": projekcijaKonacnoIzabrana,
                    "SedisteId": sedisteId,
                };
                  console.log("poslati podaci za kreiranje karte", sendData);
                if (token != null) {
                    headers.Authorization = 'Bearer ' + token;
                }
                $.ajax({
                    url: url,
                    type: httpAction,
                    headers: headers,
                    data: sendData
                }).done(function (data, status) {
                    $('#stranicaKupiKartu2').hide();
                    $('#stranicaKupiKartu1').hide();
                    $('#izborSedista').hide();
                    $('#daljeKarta').hide();
                    $('#unosTabeleDiv').hide();
                    $('#kupiDiv').hide();
                    var id = korisnikId;
                    url = "https://" + host + '/api/karte/?korisnikId=' + id.toString();
                    $.getJSON(url, kupjleneKarte);
  
                }).fail(function (data, status) {
                    alert("Desila se greska unosa karte!");
                })
        
    }
    // ==================================================PRIKAZ     KUPJLENIH KARATA   KORISNIKA  ZA TEKUCI DAN  ========
    function kupjleneKarte(data,status) {
        var container = $("#kupljeneKarte");
        container.empty();
        if (status == "success") {
            var div = $("<div></div>")
            var h1 = $(" <h3> KARTE ZA KOJE CE BITI ISPISAN RACUN </h3>");
            div.append(h1);
            var table = $("<table  class='table table-bordered'></table>");
            var header = $("<thead  style='background-color:aquamarine '><tr> <td> ID karte  </td>  <td>Datum prodaje</td> <td> Korisnik </td><td>Projekcija vreme</td><td>Film</td><td>Cena karte</td><td>Sala </td> <td>Sediste </td><tr> </thead>");
            table.append(header);

            for (var i = 0; i < data.length; i++) {
                if (data[i].DatumProdaje >= new Date().toJSON()) {
                var row = "<tbody><tr class='success'>";
                var displayData = "<td>" + data[i].Id + "</td><td>" + data[i].DatumProdaje + "</td><td>" + data[i].Korisnik.KorisnickoIme + "</td><td> " + data[i].Projekcija.DatumVreme + "</td><td> " + data[i].Projekcija.Film.Naziv + "</td><td> " + data[i].Projekcija.CenaKarte + "</td ><td> " + data[i].Projekcija.Sala.Naziv + "</td><td> " + data[i].Sediste.RedniBroj + "</td > ";
                row += displayData + "</tr></tbody>";
                table.append(row);
                }
            }
            div.append(table);
            container.append(div);
        } else {
            var div = $("<div></div>");
            var h1 = $(" <h1>   desila se greska prilikom ucitavanja tabele</h1>");
            div.append(h1);
            container.append(div);
        }

    }
    //======================================nazad iz racuna 
    function nazadIzRacuna() {
        stranicaPoslePrijave();
        $("#tabelaSaSortiranjem").show();
        $("#unosTabeleDiv").show();
        $("#infoDiv").show();
        tabela =" ";
        $('#stranicaKupiKartu3').hide();
    }
     //kraj 
});

