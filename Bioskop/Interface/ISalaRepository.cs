using Bioskop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bioskop.Interface
{
      public interface ISalaRepository
    {

        IQueryable<Sala> GetAll();

        Sala GetById(int id);
        IQueryable<TipProjekcije> GetTipProjekcije(int id);




    }
}
