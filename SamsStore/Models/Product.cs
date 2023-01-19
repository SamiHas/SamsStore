using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace SamsStore.Models
{
    [Table("Products")]
    public class Product
    {
        /*[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Product()
        {
            this.Sales = new HashSet<Sale>();
        }*/
        [Key]
        [Required]
        public int Id { get; set; }
        [MaxLength(50)]

        public string Name { get; set; }


        public decimal Price { get; set; }

        // [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        // public virtual ICollection<Sale> Sales { get; set; }
        //public List<Sale> Sales { get; set; }
    }
}
