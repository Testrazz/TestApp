using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tournament.Domain.Entities;

namespace Tournament.Application.Interfaces
{
    public interface ITournamentRepository
    {
        Task<Tornament?> GetByIdAsync(Guid id);
        Task<int> CreateAsync(Tornament tournament);


    }
}
