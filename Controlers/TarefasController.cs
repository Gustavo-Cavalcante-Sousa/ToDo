using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/tarefas")]
public class TarefaController : ControllerBase
{
    private static List<string> tarefas = new List<string> { "Estudar", "Trabalhar", "Treinar" };
    private readonly AppDbContext _context;

    public TarefaController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/tarefas
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tarefa>>> GetTarefas()
    {
        return await _context.Tarefas.ToListAsync();
    }

    // GET: api/tarefas/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Tarefa>> GetTarefa(int id)
    {
        var tarefa = await _context.Tarefas.FindAsync(id);
        if (tarefa == null)
        {
            return NotFound();
        }
        return tarefa;
    }

    // POST: api/tarefas
    [HttpPost]
public async Task<ActionResult<Tarefa>> CreateTarefa([FromBody] Tarefa novaTarefa)
{
    _context.Tarefas.Add(novaTarefa);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetTarefa), new { id = novaTarefa.Id }, novaTarefa);
}


    // PUT: api/tarefas/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTarefa(int id, [FromBody] Tarefa tarefaAtualizada)
    {
        if (id != tarefaAtualizada.Id)
        {
            return BadRequest();
        }

        _context.Entry(tarefaAtualizada).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Tarefas.Any(e => e.Id == id))
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

    // DELETE: api/tarefas/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTarefa(int id)
    {
        var tarefa = await _context.Tarefas.FindAsync(id);
        if (tarefa == null)
        {
            return NotFound();
        }

        _context.Tarefas.Remove(tarefa);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
