using Microsoft.OData.Edm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bioskop.Models
{
    public class Korisnik
    {
        public int Id { get; set; }

        public string KorisnickoIme { get; set; }
        public string Lozinka { get; set; }
        public DateTime DatumRegistracije { get; set; }
        public string Uloga { get; set; }

        public Korisnik()
        {



        }

        public Korisnik(int id, string korisnickoIme, string lozinka, string uloga) : this(id, korisnickoIme, lozinka)
        {
            Uloga = uloga;
        }

        public Korisnik(int id, string korisnickoIme, string lozinka )
        {
            Id = id;
            KorisnickoIme = korisnickoIme;
            Lozinka = lozinka;
            Uloga = "user";
            DatumRegistracije = DateTime.Now;
           
        }
   
    }
}