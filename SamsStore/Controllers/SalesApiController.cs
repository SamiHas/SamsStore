using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SamsStore.Data;
using SamsStore.DTO;
using SamsStore.Models;


namespace SamsStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesApiController : ControllerBase
    {
        private readonly SalesDbContext _context;
       

        public SalesApiController(SalesDbContext context)
        {
            _context = context;
            
        }

        



        // GET: api/SalesApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sale>>> GetSales()
        {
            // return await _context.Sales.ToListAsync();
            var salesdata = await _context.Sales
              .Include(s => s.Customer)
                .Include(s => s.Product)
                    .Include(s => s.Store).ToListAsync();
            return salesdata;

        }



        // GET: api/SalesApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sale>> GetSale(int id)
        {
            var sale = await _context.Sales.Where(s => s.Id == id)
                        .Include(s=>s.Customer)
                         .Include(s => s.Product)
                            .Include(s => s.Store).FirstOrDefaultAsync();

            if (sale == null)
            {
                return NotFound();
            }

            return sale;
        }


        /*public ActionResult<SalesDTO> GetSale(int id)
        {
           

            Sale s =  _context.Sales.Find(id);

            if (s == null)
            {
                return NotFound();
            }

            SalesDTO sDTO = new SalesDTO(s);

            return sDTO;
        }*/




        // PUT: api/SalesApi/5
        [HttpPut("{id}")]








        public async Task<ActionResult<Sale>> PutSale(int id,[FromForm] SalesDTO sale)
        {


            if (id != sale.Id)
            {
                return BadRequest();
            }
           // if (SaleExists(id))
            //{
                var _sale = new Sale
                {
                    Id = sale.Id,
                    CustomerId = sale.CustomerId,
                    ProductId = sale.ProductId,
                    StoreId = sale.StoreId,
                    DateSold = DateTime.Now 
                };

                _context.Sales.Update(_sale);

                //_context.Entry(sale).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                    /*if (SaleExists(id))
                    {
                        var _sale = new Sale
                        {
                            CustomerId = sale.CustomerId,
                            ProductId = sale.ProductId,
                            StoreId = sale.StoreId,
                            DateSold = DateTime.Now
                        };*/
                    _context.Entry(_sale).Reference(x => x.Store).Load();
                    _context.Entry(_sale).Reference(x => x.Customer).Load();
                    _context.Entry(_sale).Reference(x => x.Product).Load();

                    //}
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SaleExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
           // }
            return NoContent();
        }


        // POST: api/SalesApi
        [HttpPost]
        public async Task<ActionResult<Sale>> PostSale([FromForm]SalesDTO sale)
        {
            
            var _sale = new Sale
            {
                CustomerId = sale.CustomerId,
                ProductId = sale.ProductId,
                StoreId = sale.StoreId,
                DateSold = DateTime.Now
            };

            _context.Sales.Add(_sale);

            await _context.SaveChangesAsync();

            _context.Entry(_sale).Reference(x => x.Store).Load();
            _context.Entry(_sale).Reference(x => x.Customer).Load();
            _context.Entry(_sale).Reference(x => x.Product).Load();

            return CreatedAtAction("GetSale", new { id = _sale.Id }, _sale);
        }

        //public IActionResult PostSale(Sale sale)
      /*  public ActionResult<SalesDTO> PostSale(Sale sale)
        {
            var newsale = _mapper.Map<SalesDTO>(sale);
           
            // how to save dto to database
            // var p =_context.Sales.Add(newsale);

            return Ok(newsale);
        }*/



        // DELETE: api/SalesApi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sale>> DeleteSale(int id)
        {
            var sale = await _context.Sales.FindAsync(id);
            if (sale == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();

            return sale;
        }

        private bool SaleExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }
    }
}
