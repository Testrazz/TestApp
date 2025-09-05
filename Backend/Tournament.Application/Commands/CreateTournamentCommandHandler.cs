using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tournament.Application.Interfaces;

namespace Tournament.Application.Commands
{

    public class CreateTournamentCommandHandler : IRequestHandler<CreateTournamentCommand, Guid>
    {
        private readonly ITournamentRepository _repository;

        public CreateTournamentCommandHandler(ITournamentRepository repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(CreateTournamentCommand request, CancellationToken cancellationToken)
        {
            var entity = new Tournament.Domain.Entities.Tornament
            {
                Id = Guid.NewGuid(),
                TenantId = request.TenantId,
                Name = request.Name,
                Venue = request.Venue,
                Overs = request.Overs,
                EntryFee = request.EntryFee,
                Rules = request.Rules,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Status = "draft",
                CreatedBy = request.CreatedBy,
                CreatedAt = DateTime.UtcNow
            };

            await _repository.CreateAsync(entity);
            return entity.Id;
        }
    }
}
