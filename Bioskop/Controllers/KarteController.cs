using Bioskop.Interface;
using Bioskop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Bioskop.Controllers
{
    public class KarteController : ApiController
    {

        public IKarteRepository repo { get; set; }

        public KarteController(IKarteRepository repo)
        {
            this.repo = repo;
        }


        // ovde idu endpoint
        // prvo cu da ucitam filmove 


        public IQueryable<Karta> Get()
        {

            return repo.GetAll();


        }
        // Get api/Karte/id
        public IHttpActionResult GetById(int id)
        {
            var karta = repo.GetById(id);
            if (karta == null)
            {
                return NotFound();
            }
            return Ok(karta);

        }
        //Get api/Karte/?salaId=



        public IQueryable<Karta> GetBySala(int projekcijaId) 
        {

            return repo.GetByProjekcija(projekcijaId);

        
        
        }



        //Get  api/Karte/?korisnikId=
        public IQueryable<Karta> GetByKorisnik(int korisnikId)
        {

            return repo.GetByKorisnik(korisnikId);



        }

        // Post api/Karte 
        public IHttpActionResult Post(Karta k )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }


            repo.Create(k);
            return CreatedAtRoute("DefaultApi", new { id = k.Id }, k);



        }
        // Put  api/Karte/id
        public IHttpActionResult Put(int id, Karta  k)
        {
            // tri ispitivanja 
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != k.Id)
            {
                return BadRequest();


            }


            try
            {
                repo.Update(k);
            }
            catch (Exception)
            {

                return BadRequest();
            }

            return Ok(k);

        }
        // Delete api/Karte

        public IHttpActionResult Delete(int id)
        {
            var k = repo.GetById(id);
            if (k == null)
            {
                return NotFound();
            }

            repo.Delete(k);
            return Ok();


        }

    }
}
