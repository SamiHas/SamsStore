using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SamsStore.Data;
using SamsStore.Models;

namespace SamsStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoresApiController : ControllerBase
    {
        private readonly SalesDbContext _context;

        public StoresApiController(SalesDbContext context)
        {
            _context = context;
        }

        // GET: api/StoresApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store>>> GetStores()
        {
            return await _context.Stores.ToListAsync();
        }

        // GET: api/StoresApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Store>> GetStore(int id)
        {
            var store = await _context.Stores.FindAsync(id);

            if (store == null)
            {
                return NotFound();
            }

            return store;
        }

        // PUT: api/StoresApi/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStore(int id,[FromForm] Store store)
        {
            if (id != store.Id)
            {
                return BadRequest();
            }

            _context.Entry(store).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreExists(id))
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

        // POST: api/StoresApi
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Store>> PostStore([FromForm]Store store)
        {
            _context.Stores.Add(store);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStore", new { id = store.Id }, store);
        }

        // DELETE: api/StoresApi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Store>> DeleteStore(int id)
        {
            var store = await _context.Stores.FindAsync(id);
            if (store == null)
            {
                return NotFound();
            }

            _context.Stores.Remove(store);
            await _context.SaveChangesAsync();

            return store;
        }

        private bool StoreExists(int id)
        {
            return _context.Stores.Any(e => e.Id == id);
        }
    }
}
