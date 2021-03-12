using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bioskop.Models
{
    public class Sala
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public   ICollection<TipProjekcije> TipoviProjekcije { get; set; }

       
    }
}