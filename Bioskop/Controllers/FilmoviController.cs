using Bioskop.Interface;
using Bioskop.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Bioskop.Controllers
{
    public class FilmoviController : ApiController
    {
        public IFilmoviRepository repo { get; set; }

        public FilmoviController(IFilmoviRepository repo)
        {
            this.repo = repo;
        }

        // ovde idu endpoint
        // prvo cu da ucitam filmove 


        public IQueryable<Film> Get()
        {

            return repo.GetAll();
        
        
        }
        // Get api/Filmovi/id
        public IHttpActionResult GetById(int id)
        {
            var film = repo.GetById(id);
            if (film == null)
            {
                return NotFound();
            }
            return Ok(film);
        
        }


        // Get api/filmovi/?name = 
        public IHttpActionResult GetByName(string name) {

            var film = repo.GetByName(name);
            if (film == null)
            {
                return NotFound();
            }
            return Ok(film);



        }

        // Post api/Filmovi 
        public IHttpActionResult Post(Film f)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }


            repo.Create(f);
            return CreatedAtRoute("DefaultApi", new { id = f.Id }, f);



        }
        // Put  api/Filmovi/id
        public IHttpActionResult Put(int id, Film f)
        {
            // tri ispitivanja 
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != f.Id)
            {
                return BadRequest();
            
            
            }


            try
            {
                repo.Update(f);
            }
            catch (Exception)
            {

                return BadRequest();
            }

            return Ok(f);
        
        }
        // Delete api/Filmovi

        public IHttpActionResult Delete(int id)
        {
            var film = repo.GetById(id);
            if (film == null)
            {
                return NotFound();
            }

            repo.Delete(film);
            return Ok();
        
        
        }


    }
}
