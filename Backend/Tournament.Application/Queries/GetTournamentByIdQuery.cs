using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MediatR;
using System.Threading.Tasks;
using Tournament.Application.DTOs;

namespace Tournament.Application.Queries
{
    public class GetTournamentByIdQuery : IRequest<TournamentDto?>
    {
        public Guid Id { get; set; }
    }
}
