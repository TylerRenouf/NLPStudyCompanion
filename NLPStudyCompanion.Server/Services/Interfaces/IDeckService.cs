using NLPStudyCompanion.Server.Models;
using NLPStudyCompanion.Server.DTOs;
using NLPStudyCompanion.Server.Helpers;
namespace NLPStudyCompanion.Server.Services.Interfaces
{
    public interface IDeckService
    {
        Task<ServiceResult<IEnumerable<DeckDto>>> GetAllDecksAsync();
        Task<ServiceResult<DeckDto>> GetDeckByIdAsync(int id);
        Task<ServiceResult<DeckDto>> AddDeckAsync(CreateDeckDto deckDto);
        Task<ServiceResult<bool>> DeleteDeckAsync(int id);
        Task<ServiceResult<bool>> DeleteDecksAsync(List<int> id);
        Task<ServiceResult<bool>> ModifyDeckAsync(int id, UpdateDeckDto deckDto);
    }
}
