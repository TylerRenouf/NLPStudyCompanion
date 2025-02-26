using NLPStudyCompanion.Server.Models;
using NLPStudyCompanion.Server.DTOs;
using NLPStudyCompanion.Server.Helpers;

namespace NLPStudyCompanion.Server.Services.Interfaces
{
    public interface ICardService
    {
        Task<ServiceResult<IEnumerable<CardDto>>> GetCardsByDeckId(int id);
        Task<ServiceResult<CardDto>> AddCardAsync(int DeckId, CreateCardDto cardDto);
        Task<ServiceResult<bool>> DeleteCardAsync(int id);
        Task<ServiceResult<bool>> ModifyCardAsync(int id, UpdateCardDto updateCardDto);


    }
}
