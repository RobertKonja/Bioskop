namespace Bioskop.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Bioskop.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Bioskop.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
            context.Korisnici.AddOrUpdate(x => x.Id,
            
                new Models.Korisnik() { Id = 1, KorisnickoIme = "Pera", Lozinka = "Sifra.123", DatumRegistracije = new DateTime(2021, 01, 01,10,0,0), Uloga = "user" },
                new Models.Korisnik() { Id = 2, KorisnickoIme = "Zdera", Lozinka = "Sifra.123", DatumRegistracije = new DateTime(2021, 01, 01,15,0,0), Uloga = "user" },
                new Models.Korisnik() { Id = 3, KorisnickoIme = "Glavni", Lozinka = "Sifra.1234", DatumRegistracije = new DateTime(2021, 01, 01,6,30,0), Uloga = "admin" }

                ); 
            context.SaveChanges();

            context.Sale.AddOrUpdate(x => x.Id,
                new Models.Sala() { Id = 1, Naziv = "MalaSala" },
                new Models.Sala() { Id = 2, Naziv = "VelikaSala" },
                new Models.Sala() { Id = 3, Naziv = "BisernaSala" }
                );

            context.SaveChanges();

            context.TipProjekcija.AddOrUpdate(x => x.Id,
                new Models.TipProjekcije() { Id = 1, Naziv = "2D" },
                new Models.TipProjekcije() { Id = 2, Naziv = "3D" },
                new Models.TipProjekcije() { Id = 3, Naziv = "4D" }
                );

            context.SaveChanges();


            context.SalaTips.AddOrUpdate(x => x.Id,
                new Models.SalaTip() { Id = 1, SalaId = 1, TipProjekcijeId = 1 },
                new Models.SalaTip() { Id = 2, SalaId = 1, TipProjekcijeId = 2 },
                new Models.SalaTip() { Id = 3, SalaId = 2, TipProjekcijeId = 1 },
                new Models.SalaTip() { Id = 4, SalaId = 2, TipProjekcijeId = 3 },
                new Models.SalaTip() { Id = 5, SalaId = 3, TipProjekcijeId = 3 }

                );
            context.SaveChanges();

            context.Sedista.AddOrUpdate(x => x.Id,
                new Models.Sediste() { Id = 1, RedniBroj ="A1", SalaId = 1 },
                new Models.Sediste() { Id = 2, RedniBroj ="A2", SalaId = 1 },
                new Models.Sediste() { Id = 3, RedniBroj ="A3", SalaId = 1 },
                new Models.Sediste() { Id = 4, RedniBroj ="A4", SalaId = 1 },
                new Models.Sediste() { Id = 5, RedniBroj = "A5", SalaId = 1 },
                new Models.Sediste() { Id = 5, RedniBroj = "B1", SalaId = 1},
                new Models.Sediste() { Id = 6, RedniBroj = "B2", SalaId = 1 },
                new Models.Sediste() { Id = 7, RedniBroj = "B3", SalaId = 1 },
                new Models.Sediste() { Id = 8, RedniBroj = "B4", SalaId = 1 },
                new Models.Sediste() { Id = 9, RedniBroj = "B5", SalaId = 1 },
                new Models.Sediste() { Id = 10, RedniBroj = "C1", SalaId = 1 },
                new Models.Sediste() { Id = 11, RedniBroj = "C2", SalaId = 1 },
                new Models.Sediste() { Id = 12, RedniBroj = "C3", SalaId = 1 },
                new Models.Sediste() { Id = 13, RedniBroj = "C4", SalaId = 1 },
                new Models.Sediste() { Id = 14, RedniBroj = "C5", SalaId = 1 },
                new Models.Sediste() { Id = 16, RedniBroj ="A1", SalaId = 2 },
                new Models.Sediste() { Id = 17, RedniBroj ="A2", SalaId = 2 },
                new Models.Sediste() { Id = 18, RedniBroj ="A3", SalaId = 2 },
                new Models.Sediste() { Id = 19, RedniBroj ="A4", SalaId = 2 },
                new Models.Sediste() { Id = 20, RedniBroj = "A5", SalaId = 2 },
                new Models.Sediste() { Id = 21, RedniBroj = "B1", SalaId = 2 },
                new Models.Sediste() { Id = 22, RedniBroj = "B2", SalaId = 2 },
                new Models.Sediste() { Id = 23, RedniBroj = "B3", SalaId = 2 },
                new Models.Sediste() { Id = 24, RedniBroj = "B4", SalaId = 2 },
                new Models.Sediste() { Id = 25, RedniBroj = "B5", SalaId = 2 },
                new Models.Sediste() { Id = 26, RedniBroj = "C1", SalaId = 2 },
                new Models.Sediste() { Id = 27, RedniBroj = "C2", SalaId = 2 },
                new Models.Sediste() { Id = 28, RedniBroj = "C3", SalaId = 2 },
                new Models.Sediste() { Id = 29, RedniBroj = "C4", SalaId = 2 },
                new Models.Sediste() { Id = 30, RedniBroj = "C5", SalaId = 2 },
                new Models.Sediste() { Id = 31, RedniBroj = "A1", SalaId = 3 },
                new Models.Sediste() { Id = 32, RedniBroj = "A2", SalaId = 3 },
                new Models.Sediste() { Id = 33, RedniBroj = "A3", SalaId = 3 },
                new Models.Sediste() { Id = 34, RedniBroj = "A4", SalaId = 3 },
                new Models.Sediste() { Id = 35, RedniBroj = "A5", SalaId = 3 },
                new Models.Sediste() { Id = 36, RedniBroj = "B1", SalaId = 3 },
                new Models.Sediste() { Id = 37, RedniBroj = "B2", SalaId = 3 },
                new Models.Sediste() { Id = 38, RedniBroj = "B3", SalaId = 3 },
                new Models.Sediste() { Id = 39, RedniBroj = "B4", SalaId = 3 },
                new Models.Sediste() { Id = 40, RedniBroj = "B5", SalaId = 3 },
                new Models.Sediste() { Id = 41, RedniBroj = "C1", SalaId = 3 },
                new Models.Sediste() { Id = 42, RedniBroj = "C2", SalaId = 3 },
                new Models.Sediste() { Id = 43, RedniBroj = "C3", SalaId = 3 },
                new Models.Sediste() { Id = 44, RedniBroj = "C4", SalaId = 3 },
                new Models.Sediste() { Id = 45, RedniBroj = "C5", SalaId = 3 }


               

                );
            context.Filmovi.AddOrUpdate(

               new Models.Film() { Id = 1, Naziv = "joker ", Reziser = "hickok", Glumci = "Alen delon ,Edy marfy", Zanr = "komedija", Trajanje = 90, Distributer = "cinestar", Zemlja = "usa", GodinaProizvodnje = 2010, Opis = " veoma dobar film za sada" },
               new Models.Film() { Id = 2, Naziv = "Spektra", Reziser = "Sam Mendes", Glumci = "Daniel Craig", Zanr = "akcija", Trajanje = 142, Distributer = "cinestar", Zemlja = "UK", GodinaProizvodnje = 2015, Opis = " Sifrovana poruka iz prošlosti šalje Bonda na zadatak koji će od njega zahtevati da se infiltrira u zlu organizaciju Spektra." },
               new Models.Film() { Id = 3, Naziv = "Hari_Poter", Reziser = "David Yates", Glumci = "Daniel Ratcliffe", Zanr = "akcija", Trajanje = 120, Distributer = "cinestar", Zemlja = "UK", GodinaProizvodnje = 2011, Opis = " Filmski serijal koji je obeležio celu jednu generaciju završava se drugim delom finalnog poglavlja u monumentalnom serijalu o Hariju Poteru" },
               new Models.Film() { Id = 4, Naziv = "Osmi_putnik ", Reziser = "James Cameron", Glumci ="Sigurney Weawer", Zanr = "sf", Trajanje = 137, Distributer = "cinestar", Zemlja = "USA", GodinaProizvodnje = 1986, Opis = " Strasno" },
               new Models.Film() { Id = 5, Naziv = "Balkanski_spijun ", Reziser = "Dusan Kovacevic", Glumci = "Bata Stojkovic ,Bora Todorovic", Zanr = "komedija", Trajanje = 92, Distributer = "cinestar", Zemlja = "SRB", GodinaProizvodnje = 1984, Opis = "Satira govori o paranoidnom i zbunjenom Beograđaninu (Danilo Bata Stojković) koji je krivo umislio da je njegov običan podstanar zapravo terorist koji želi rušiti državu. Uz pomoć te priče film je obradio temu potrage za “nevidljivim neprijateljima” i krivim iluzijama" }


               );
            context.SaveChanges();
            context.Projekcije.AddOrUpdate(x => x.Id,
                new Models.Projekcija() { Id = 1, DatumVreme = new DateTime(2021, 01, 17,10,30,00), CenaKarte = 250.5, Administrator = "glavni", FilmId = 1, TipId = 1, SalaId = 1 },
                new Models.Projekcija() { Id = 2, DatumVreme = new DateTime(2021, 01, 17,14,15,00), CenaKarte = 650.5, Administrator = "glavni", FilmId = 2, TipId = 2, SalaId = 3 },
                new Models.Projekcija() { Id = 3, DatumVreme = new DateTime(2021, 01, 18,20,30,00), CenaKarte = 600.5, Administrator = "glavni", FilmId = 2, TipId = 3, SalaId = 2 },
                new Models.Projekcija() { Id = 4, DatumVreme = new DateTime(2021, 01, 18,18,0,0), CenaKarte = 149.9, Administrator = "glavni", FilmId = 3, TipId = 2, SalaId = 2 },
                new Models.Projekcija() { Id = 5, DatumVreme = new DateTime(2021, 01, 01,20,18,0,0), CenaKarte = 850.9, Administrator = "glavni", FilmId = 4, TipId = 1, SalaId = 1 },
                new Models.Projekcija() { Id = 6, DatumVreme = new DateTime(2021, 01, 01,22,15,0,0), CenaKarte = 525.5, Administrator = "glavni", FilmId = 5, TipId = 1, SalaId = 1 }



                );
            context.SaveChanges();

            context.Karte.AddOrUpdate(x => x.Id,
                new Models.Karta() { Id = 1, DatumProdaje = new DateTime(2021, 01, 01, 10, 0, 0), KorisnikId = 1, ProjekcijaId = 1, SedisteId = 10 },
                new Models.Karta() { Id = 2, DatumProdaje = new DateTime(2021, 01, 01,10,0,0), KorisnikId = 1, ProjekcijaId = 2, SedisteId = 32 },
                new Models.Karta() { Id = 3, DatumProdaje = new DateTime(2021, 01, 01,10,0,0), KorisnikId = 2, ProjekcijaId = 2, SedisteId = 35 },
                new Models.Karta() { Id = 4, DatumProdaje = new DateTime(2021, 01, 01, 10, 0, 0), KorisnikId = 2, ProjekcijaId = 4, SedisteId = 20 },
                new Models.Karta() { Id = 5, DatumProdaje = new DateTime(2021, 01, 01, 10, 0, 0), KorisnikId = 1, ProjekcijaId = 4, SedisteId = 25 }
               );


            context.SaveChanges();













        }
    }
}
