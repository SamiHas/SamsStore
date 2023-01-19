using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SamsStore.Models;
using SamsStore.DTO;

namespace SamsStore.Mapping
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<Sale, SalesDTO>();
            CreateMap<Customer, SalesDTO >();
            CreateMap<Product, SalesDTO>();
            CreateMap<Store, SalesDTO>();
        }
    }
}
