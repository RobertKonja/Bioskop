using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bioskop.Models
{
    public class Karta
    {
        public int Id { get; set; }
        public DateTime  DatumProdaje { get; set; }

        public Korisnik Korisnik { get; set; }
        public int KorisnikId { get; set; }


        public Projekcija Projekcija { get; set; }
        public int ProjekcijaId { get; set; }

        public   Sediste   Sediste{ get; set; }
        public int SedisteId { get; set; }

        public Karta()
        {
        }

        public Karta(int id, Korisnik korisnik, int korisnikId, Projekcija projekcija, int projekcijaId, Sediste sediste, int sedisteId)
        {
            Id = id;
            Korisnik = korisnik;
            KorisnikId = korisnikId;
            Projekcija = projekcija;
            ProjekcijaId = projekcijaId;
            Sediste = sediste;
            SedisteId = sedisteId;
            DatumProdaje = DateTime.Now;
        }
    }






}