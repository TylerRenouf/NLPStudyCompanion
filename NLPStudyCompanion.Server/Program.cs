using NLPStudyCompanion.Server.Data;
using NLPStudyCompanion.Server.Middleware;
using NLPStudyCompanion.Server.Services;
using NLPStudyCompanion.Server.NlpAPI.Interfaces;
using NLPStudyCompanion.Server.Services.Interfaces;
using NLPStudyCompanion.Server.Repositories;
using NLPStudyCompanion.Server.Repository.Interfaces;
using Microsoft.OpenApi.Models;

using System.Reflection;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "NLPStudyCompanion API for flashcard decks and card management",
        Version = "v1",
        Description = "This is a sample API for managing decks and cards.",
    });

    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

string model = "gpt-4o-mini";
builder.Services.AddSingleton<IOpenAiService>(new OpenAiService(model));



builder.Services.AddScoped<IDeckService, DeckService>();
builder.Services.AddScoped<ICardService, CardService>();

builder.Services.AddScoped<ICardRepository, CardRepository>();
builder.Services.AddScoped<IDeckRepository, DeckRepository>();



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy
            .AllowAnyOrigin()  // Allow all origins (or specify one domain like "http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader());
});



var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options => 
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    });
}
app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.MapControllers();
app.Run();
