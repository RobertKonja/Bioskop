# Bioskop
ASP.Net   Rest API  single-page application   / online kupovina karte
Applikacija simulira online kupovinu  bioskopskih  karata.
-Ovu aplikaciju koriste 3 grupe korisnika :
-ne prijavljeni korisnik ,prijavljeni korisnik i administrator (sa razlicitim mogucnostima pristupa odredjenim opercijama ).
-Koristi Visual Studio 2019 .
-Obrisan package folder :prilikom instaliranja potrebno je omoguciti  => NuGet Package Manager   =>  restore (automatski se pojavljuje samo potvrditi restore).
-Projekat koristi lokalnu SQL bazu .
-Otvoriti :Tools =>Nuget Package manager  =>  Package Manager Console  
             => ukucati :

             1.add-migration     (nazvati po zelji)
             2.update-database 

- Entity Framework  stvara bazu (Bioskop)  sa tabelama , popunjenim sa pocetnim podacima potrebnim za  manipulaciju sa app.
-Korisnici  :(admin) korinicko ime : Glavni
                     lozinka       : Sifra.1234 
              (user) korisnicko ime : pera
                     lozinka         :Sifra.123
