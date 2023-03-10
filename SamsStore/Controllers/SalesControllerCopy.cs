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
using AutoMapper;

namespace SamsStore.Controllers
{
    /*[Route("api/[controller]")]
    [ApiController]*/
    public class SalesControllerCopy : ControllerBase
    {
        private readonly SalesDbContext _context;
      

        public SalesControllerCopy(SalesDbContext context)
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

       /* [ProducesResponseType(typeof(SalesDTO),200)]
        public IActionResult GetSales()
        {
            var sales = _context.Sales.ToList();
            var salesDots = _mapper.Map<List<SalesDTO>>(sales);
            return Ok(salesDots);

        }*/

        // GET: api/SalesApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sale>> GetSale(int id)
        {
            var sale = await _context.Sales.FindAsync(id);

            if (sale == null)
            {
                return NotFound();
            }

            return sale;
        }

        // PUT: api/SalesApi/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSale(int id, Sale sale)
        {
            if (id != sale.Id)
            {
                return BadRequest();
            }

            _context.Entry(sale).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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

            return NoContent();
        }

        // POST: api/SalesApi
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Sale>> PostSale(int customerId, int productId, int storeId)
        {
            var _sale = new Sale
            {
                CustomerId = customerId,
                ProductId = productId,
                StoreId = storeId,
                //CustomerName = customerName,
                DateSold = DateTime.Now
            };

            _context.Sales.Add(_sale);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSale", new { id = _sale.Id }, _sale);
        }





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
