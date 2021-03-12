using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bioskop.Models
{
    public class SalaTip
    {
        public int Id { get; set; }

        public Sala Sala { get; set; }
        public int SalaId { get; set; }

        public TipProjekcije TipProjekcije { get; set; }
        public int TipProjekcijeId { get; set; }


    }
}