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
    public class KorisnikRepository : IKorisnikRepository, IDisposable
    {
        public ApplicationDbContext db = new ApplicationDbContext();
       
        public void Create(Korisnik korisnik)
        {
            db.Korisnici.Add(korisnik);
            db.SaveChanges();
        }

        public void Delete(Korisnik korisnik)
        {
            db.Korisnici.Remove(korisnik);
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


        public IQueryable<Korisnik> GetAll()
        {
            return db.Korisnici;
        }

        public Korisnik GetById(int id)
        {
            return db.Korisnici.FirstOrDefault(x => x.Id == id);
        }

        public void Update(Korisnik korisnik)
        {
            db.Entry(korisnik).State = EntityState.Modified;


            try
            {
                db.SaveChanges();

            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }
        }

        public Korisnik GetByName(string name)
        {
            return db.Korisnici.FirstOrDefault(x => x.KorisnickoIme == name);
        }
    }
}