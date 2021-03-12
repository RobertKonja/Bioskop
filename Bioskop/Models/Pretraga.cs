using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bioskop.Models
{
    public class Pretraga
    {
       

        public string NazivFilma { get; set; }
        public string Sala { get; set; }
        public DateTime? DatumOd { get; set; } 

        public DateTime? DatumDo { get; set; }
        public string TipSale { get ; set ; }
        public double? CenaOd { get; set; }
        public double? CenaDo { get; set; }


    }
}