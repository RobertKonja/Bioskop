using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Bioskop.Models
{
    public class Film
    {
        public int Id { get; set; }
        [Required]
        [StringLength(40)]
        public string Naziv { get; set; }
        public string Reziser { get; set; }
        public string Glumci { get; set; }
        public string Zanr { get; set; }
        [Range(0, int.MaxValue)]
        public int Trajanje { get; set; }
        public string  Distributer { get; set; }
        public string Zemlja { get; set; }
        [Range(0, int.MaxValue)]
        public int GodinaProizvodnje { get; set; }
        public string Opis { get; set; }



    }
}