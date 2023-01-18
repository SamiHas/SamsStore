using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace SamsStore.Models
{
    [Table("Sales")]
    public class Sale
    {
        [Key]
        [Required]
        public int Id { get; set; }
        
        public int ProductId { get; set; }
        
        public int CustomerId { get; set; }
        public int StoreId { get; set; }
        public DateTime DateSold { get; set; }
    }
}
