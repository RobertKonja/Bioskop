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
    public class ProjekcijeController : ApiController
    {

        public IProjekcijeRepository repo { get; set; }

        public ProjekcijeController(IProjekcijeRepository repo)
        {
            this.repo = repo;
        }
        // ovde idu endpoint
        // prvo cu da ucitam filmove 


        public IQueryable<Projekcija> Get()
        {

            return repo.GetAll();


        }
        // Get api/projekcije/id
        public IHttpActionResult GetById(int id)
        {
            var proj = repo.GetById(id);
            if (proj == null)
            {
                return NotFound();
            }
            return Ok(proj);

        }

        // Post api/Projekcije 
        public IHttpActionResult Post(Projekcija p)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }


            repo.Create(p);
            return CreatedAtRoute("DefaultApi", new { id = p.Id }, p);



        }
        // Put  api/Projekcije/id
        public IHttpActionResult Put(int id, Projekcija projekcija)
        {
            // tri ispitivanja 
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != projekcija.Id)
            {
                return BadRequest();


            }


            try
            {
                repo.Update(projekcija);
            }
            catch (Exception)
            {

                return BadRequest();
            }

            return Ok(projekcija);

        }
        // Delete api/Projekcije

        public IHttpActionResult Delete(int id)
        {
            var proj = repo.GetById(id);
            if (proj == null)
            {
                return NotFound();
            }

            repo.Delete(proj);
            return Ok();


        }
        //Post api/Projekcije/pretraga
        [Route("api/Projekcije/Pretraga")]
        public IQueryable<Projekcija> Post(Pretraga p) 
        {

            IQueryable<Projekcija> lista ;
            lista = repo.Pretraga(p);
            return lista;
        
        }
    }
}
