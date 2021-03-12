using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Bioskop.Models
{
    public class Sediste
    {

        public int Id { get; set; }

        
        public string  RedniBroj { get; set; }
        
        public Sala Sala { get; set; }

      
        public int SalaId { get; set; 
        
        }







    }
}