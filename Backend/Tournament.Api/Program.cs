using System.Reflection;
using MediatR;
using Tournament.Application.Commands;
using Tournament.Application.Interfaces;
using Tournament.Infrastructure.Persistence;
using Tournament.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add controllers
builder.Services.AddControllers();

// Add Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Get connection string
var conn = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(conn))
{
    throw new InvalidOperationException("DefaultConnection is missing in configuration");
}

// Register DB factory + repositories
builder.Services.AddSingleton<IDbConnectionFactory>(_ => new SqlConnectionFactory(conn));
builder.Services.AddScoped<ITournamentRepository, TournamentRepository>();

// Register MediatR (scan Application assembly for handlers)
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(typeof(CreateTournamentCommand).Assembly);
});

var app = builder.Build();

// Enable Swagger in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
