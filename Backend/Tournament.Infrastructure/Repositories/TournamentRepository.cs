using Tournament.Application.Interfaces;
using Tournament.Infrastructure.Persistence;
using Tournament.Infrastructure.Repositories;
using System;
using System.Threading.Tasks;
using Dapper;
using Tournament.Application.Interfaces;
using Tournament.Domain.Entities;
using Tournament.Infrastructure.Persistence;

namespace Tournament.Infrastructure.Repositories
{
    public class TournamentRepository : ITournamentRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public TournamentRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<Tornament?> GetByIdAsync(Guid id)
        {
            using var conn = _connectionFactory.CreateConnection();
            const string sql = @"
SELECT Id, TenantId, Name, Venue, Overs, EntryFee, Rules, StartDate, EndDate, Status, CreatedBy, CreatedAt
FROM Tournaments
WHERE Id = @Id";
            return await conn.QuerySingleOrDefaultAsync<Tornament>(sql, new { Id = id });
        }

        public async Task<int> CreateAsync(Tornament tournament)
        {
            using var conn = _connectionFactory.CreateConnection();
            const string sql = @"
INSERT INTO Tournaments (Id, TenantId, Name, Venue, Overs, EntryFee, Rules, StartDate, EndDate, Status, CreatedBy, CreatedAt)
VALUES (@Id, @TenantId, @Name, @Venue, @Overs, @EntryFee, @Rules, @StartDate, @EndDate, @Status, @CreatedBy, SYSUTCDATETIME())";
            return await conn.ExecuteAsync(sql, tournament);
        }
    }
}
