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
    public class ProjekcijeRepository : IProjekcijeRepository, IDisposable
    {
        public ApplicationDbContext db = new ApplicationDbContext();
          
        public void Create(Projekcija projekcija)
        {
            db.Projekcije.Add(projekcija);
            db.SaveChanges();
        }

        public void Delete(Projekcija projekcija)
        {
            db.Projekcije.Remove(projekcija);
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


        public IQueryable<Projekcija> GetAll()
        {
            return db.Projekcije.Include(x => x.Film).Include(x => x.Sala).Include(x => x.Tip);
        }

        public Projekcija GetById(int id)
        {
            return  db.Projekcije.Include(x => x.Film).Include(x => x.Sala).Include(x => x.Tip).FirstOrDefault(x => x.Id == id);

        }

        public void Update(Projekcija projekcija)
        {
            db.Entry(projekcija).State = EntityState.Modified;


            try
            {
                db.SaveChanges();

            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }
        }

        public IQueryable<Projekcija> Pretraga(Pretraga p)
        {

            IQueryable<Projekcija> lista = GetAll();
            if (p.NazivFilma != null)
            {
                lista = lista.Where(x => x.Film.Naziv == p.NazivFilma);
            }
            if (p.Sala != null)
            {
                lista = lista.Where(x => x.Sala.Naziv == p.Sala);
            }
            if (p.DatumOd != null || p.DatumDo != null)
            {
                lista = lista.Where(x => x.DatumVreme > p.DatumOd && x.DatumVreme < p.DatumDo);
            }
            if (p.TipSale != null)
            {
                lista = lista.Where(x => x.Tip.Naziv == p.TipSale);
            }
            if (p.CenaOd > 0 && p.CenaDo > 0)
            {
                lista = lista.Where(x => x.CenaKarte > p.CenaOd && x.CenaKarte < p.CenaDo);
            }



            return lista;

        }


    }
}