using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SamsStore.Models;

namespace SamsStore.DTO
{
    public class SalesDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }

        public int CustomerId { get; set; }
        public int StoreId { get; set; }
       
    }
}
