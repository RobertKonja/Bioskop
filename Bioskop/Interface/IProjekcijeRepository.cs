using Bioskop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bioskop.Interface
{
      public interface IProjekcijeRepository
    {
        IQueryable<Projekcija> GetAll();
        Projekcija GetById(int id);
        void Create(Projekcija drzava);
        void Update(Projekcija drzava);
        void Delete(Projekcija drzava);
        IQueryable<Projekcija> Pretraga(Pretraga p);


    }
}
