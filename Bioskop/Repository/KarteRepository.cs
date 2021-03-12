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
    public class KarteRepository : IKarteRepository, IDisposable
    {
        public ApplicationDbContext db = new ApplicationDbContext();
       
        public void Create(Karta karta)
        {
            db.Karte.Add(karta);
            db.SaveChanges();

        }

        public void Delete(Karta karta)
        {
            db.Karte.Remove(karta);
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
        public IQueryable<Karta> GetAll()
        {     


            
            return db.Karte.Include(x => x.Korisnik).Include(x => x.Projekcija).Include(x => x.Sediste);
                
        }

        public Karta GetById(int id)
        {
            return db.Karte.Include(x => x.Korisnik).Include(x => x.Projekcija).Include(x => x.Sediste).FirstOrDefault(x => x.Id == id);
        }

        public void Update(Karta karta)
        {

            db.Entry(karta).State = EntityState.Modified;


            try
            {
                db.SaveChanges();

            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }
        }

        public IQueryable<Karta> GetByProjekcija(int projekcijaId)
        {
            return db.Karte.Include(x => x.Korisnik).Include(x => x.Projekcija.Film).Include(x => x.Projekcija.Sala).Include(x => x.Sediste).Where(x => x.Projekcija.Id == projekcijaId);

        }

        public IQueryable<Karta> GetByKorisnik(int korisnikId)
        {
            return db.Karte.Include(x => x.Korisnik).Include(x => x.Projekcija.Film).Include(x => x.Projekcija.Sala).Include(x => x.Sediste).Where(x => x.Korisnik.Id == korisnikId);
        }




    }
}