using Bioskop.Interface;
using Bioskop.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Bioskop.Repository
{
    public class SalaRepository : ISalaRepository, IDisposable
    {

        public ApplicationDbContext db = new ApplicationDbContext();




        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }


        public IQueryable<Sala> GetAll()
        {
            
            IQueryable<Sala> list = db.Sale.Include(x => x.TipoviProjekcije);

            

            return list ;

        }

        public Sala GetById(int id)
        {
            return db.Sale.FirstOrDefault(x => x.Id == id);
        }

        public IQueryable<TipProjekcije> GetTipProjekcije(int salaid)

        {
   
            var lista = db.SalaTips.Include(x => x.TipProjekcije).Where(x => x.SalaId == salaid).Select(x => x.TipProjekcije);
      

            return lista;
        }





       }  

     
    }