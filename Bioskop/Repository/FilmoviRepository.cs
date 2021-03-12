using Bioskop.Interface;
using Bioskop.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace Bioskop.Repository
{
    public class FilmoviRepository : IFilmoviRepository, IDisposable
    {

        public ApplicationDbContext db = new ApplicationDbContext();

        
        public void Create(Film film)
        {
            db.Filmovi.Add(film);
            db.SaveChanges();
        }

        public void Delete(Film film)
        {
            db.Filmovi.Remove(film);
            db.SaveChanges();
        }

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

        public IQueryable<Film> GetAll()
        {
            return db.Filmovi;
        }

        public Film GetById(int id)
        {
            return db.Filmovi.FirstOrDefault(x => x.Id == id);
        }

        public void Update(Film film)
        {
            db.Entry(film).State = EntityState.Modified;


            try
            {
                db.SaveChanges();

            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }
        }

        public Film GetByName(string name)
        {
            return db.Filmovi.FirstOrDefault(x => x.Naziv == name);
        }
    }
}