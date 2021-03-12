using Bioskop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bioskop.Interface
{
     public interface IKorisnikRepository
    {

        IQueryable<Korisnik> GetAll();
        Korisnik GetById(int id);
        Korisnik GetByName(string name);
        void Create(Korisnik drzava);
        void Update(Korisnik drzava);
        void Delete(Korisnik drzava);

        







    }
}
