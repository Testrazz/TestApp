using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tournament.Application.DTOs;
using Tournament.Application.Interfaces;

namespace Tournament.Application.Queries
{
    public class GetTournamentByIdQueryHandler : IRequestHandler<GetTournamentByIdQuery, TournamentDto?>
    {
        private readonly ITournamentRepository _repository;

        public GetTournamentByIdQueryHandler(ITournamentRepository repository)
        {
            _repository = repository;
        }

        public async Task<TournamentDto?> Handle(GetTournamentByIdQuery request, CancellationToken cancellationToken)
        {
            var t = await _repository.GetByIdAsync(request.Id);
            if (t == null) return null;

            return new TournamentDto
            {
                Id = t.Id,
                Name = t.Name,
                Venue = t.Venue,
                Overs = t.Overs,
                EntryFee = t.EntryFee,
                Status = t.Status
            };
        }
    }
}
