
using Bioskop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bioskop.Interface
{
     public  interface IKarteRepository
    {

        IQueryable<Karta> GetAll();
        Karta GetById(int id);
        IQueryable<Karta> GetByProjekcija(int sala);
        IQueryable<Karta> GetByKorisnik(int korisnikId);

        void Create(Karta drzava);
        void Update(Karta drzava);
        void Delete(Karta drzava);


    }
}
