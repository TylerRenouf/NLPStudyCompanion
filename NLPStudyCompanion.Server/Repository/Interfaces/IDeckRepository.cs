using NLPStudyCompanion.Server.DTOs;
using NLPStudyCompanion.Server.Models;

namespace NLPStudyCompanion.Server.Repository.Interfaces
{
    public interface IDeckRepository
    {
        Task<IEnumerable<Deck>> GetAllDecksAsync();
        Task<Deck?> GetDeckByIdAsync(int id);
        Task<Deck> AddDeckAsync(CreateDeckDto deck);
        Task<bool> DeleteDeckAsync(int id);
        Task<bool> DeleteDecksAsync(List<int> id);
        Task<bool> ModfiyDeckAsync(int id, UpdateDeckDto deckDto);
    }
}