using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MediatR;
using System.Threading.Tasks;

namespace Tournament.Application.Commands
{
    public class CreateTournamentCommand : IRequest<Guid>
    {
        public Guid? TenantId { get; set; }
        public string Name { get; set; } = default!;
        public string? Venue { get; set; }
        public int Overs { get; set; }
        public decimal? EntryFee { get; set; }
        public string? Rules { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Guid CreatedBy { get; set; }
    }
}
