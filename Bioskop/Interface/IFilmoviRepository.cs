using Bioskop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bioskop.Interface
{
      public  interface IFilmoviRepository

    {
        IQueryable<Film> GetAll();
        Film GetById(int id);
        Film GetByName(string name);
        void Create(Film drzava);
        void Update(Film drzava);
        void Delete(Film drzava);







    }
}
