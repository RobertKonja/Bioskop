using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Bioskop.Models
{
    public class Projekcija
    {
        public int Id { get; set; }
        [Required]
        public DateTime DatumVreme { get; set; }
        [Required]
        [Range(0,double.MaxValue)]
        public double CenaKarte { get; set; }

        public string  Administrator { get; set; }
        public Film Film { get; set; }
        public int FilmId { get; set; }

        public TipProjekcije Tip { get; set; }
        public int TipId { get; set; }
        public Sala Sala { get; set; }
        public int SalaId { get; set; }





    }
}