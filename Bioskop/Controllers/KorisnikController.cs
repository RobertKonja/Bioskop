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
    public class KorisnikController : ApiController
    {

        public IKorisnikRepository repo { get; set; }

        public KorisnikController(IKorisnikRepository repo)
        {
            this.repo = repo;
        }

        // ovde idu endpoint
      
        [Authorize]
       // Get api/korisnik
        public IQueryable<Korisnik> Get()
        {

            return repo.GetAll();


        }
        [Authorize]
        // Get api/Korisnik/id
        public IHttpActionResult GetById(int id)
        {
            var korisnik = repo.GetById(id);
            if (korisnik == null)
            {
                return NotFound();
            }
            return Ok(korisnik);

        }
        // Get api/Korisnik/?name = 

        public IHttpActionResult GetByName(string name)
        {
            var korisnik = repo.GetByName(name);
            if (korisnik == null)
            {
                return NotFound();
            }
            return Ok(korisnik);

        }
        // Post api/Korisnik 
        public IHttpActionResult Post(Korisnik  k)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }


            repo.Create(k);
            return CreatedAtRoute("DefaultApi", new { id = k.Id }, k);



        }
        // Put  api/Korisnik/id
        public IHttpActionResult Put(int id, Korisnik k)
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
        // Delete api/Korisnik

        public IHttpActionResult Delete(int id)
        {
            var korinik = repo.GetById(id);
            if (korinik == null)
            {
                return NotFound();
            }

            repo.Delete(korinik);
            return Ok();


        }
    }
}
