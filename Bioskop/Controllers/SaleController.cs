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
    public class SaleController : ApiController
    {

        public ISalaRepository repo { get; set; }

        public SaleController(ISalaRepository repo)
        {
            this.repo = repo;
        }





        public IQueryable<Sala> Get()
        {
            return repo.GetAll();
        
        
        
        }
        public IHttpActionResult GetById(int id)
        {

           Sala sala = repo.GetById(id);
            if (sala == null)
            {
                return NotFound();
            }

            return   Ok(sala);
        
        }
        public IQueryable<TipProjekcije> GetTipovi(int salaid)

        {


            return repo.GetTipProjekcije(salaid);
        
        
        }


    }
}
