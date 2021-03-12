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
    public class SedistaController : ApiController
    {
        public ISedistaRepository repo { get; set; }

        public SedistaController(ISedistaRepository repo)
        {
            this.repo = repo;
        }
        //Get api/sedista
        public IQueryable<Sediste> Get()
        {
            return repo.GetAll();



        }
        //Get api/sedista/?salaId= && redniBroj=
        public IHttpActionResult GetId(int salaId,string redniBroj)
        {

            Sediste sd  = repo.GetId(salaId,redniBroj);

            if (sd == null)
            {
                return NotFound();
            }

            return Ok(sd);

        }

        //Get api/sedista/?salaid= 
        public IQueryable<Sediste> GetBySala(int salaid)

        {
            return repo.GetBySala(salaid);

        }















    }
}
