using MediatR;
using Microsoft.AspNetCore.Mvc;
using Tournament.Application.Commands;
using Tournament.Application.Queries;

namespace Tournament.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TournamentController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TournamentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET /api/tournament/{id}
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await _mediator.Send(new GetTournamentByIdQuery { Id = id });
            if (result == null) return NotFound();
            return Ok(result);
        }

        // POST /api/tournament
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTournamentCommand command)
        {
            var id = await _mediator.Send(command);
            return CreatedAtAction(nameof(Get), new { id }, new { id });
        }
    }
}
