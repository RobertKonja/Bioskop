using Bioskop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bioskop.Interface
{
     public  interface ISedistaRepository
    {
        IQueryable<Sediste> GetAll();

        IQueryable<Sediste> GetBySala(int salaId);
         Sediste  GetId(int salaId,string redniBroj);


     }
}
