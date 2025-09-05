using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tournament.Application.DTOs
{
    public class TournamentDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public string? Venue { get; set; }
        public int Overs { get; set; }
        public decimal? EntryFee { get; set; }
        public string? Status { get; set; }
    }
}
