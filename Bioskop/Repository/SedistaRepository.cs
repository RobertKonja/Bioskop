using Bioskop.Interface;
using Bioskop.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Bioskop.Repository
{
    public class SedistaRepository : ISedistaRepository, IDisposable
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



        public Sediste GetId(int salaId, string redniBroj)
        {

            Sediste sd = db.Sedista.FirstOrDefault(x => x.SalaId == salaId && x.RedniBroj == redniBroj);
            return sd;
        }

        public IQueryable<Sediste> GetAll()
        {
            IQueryable<Sediste> lista = db.Sedista.Include(x => x.Sala);

            return lista;
        }
        
        public IQueryable<Sediste> GetBySala(int salaId)
        {
            IQueryable<Sediste> lista = db.Sedista.Where(x => x.SalaId == salaId);
            return lista;

        }

        
    }
}