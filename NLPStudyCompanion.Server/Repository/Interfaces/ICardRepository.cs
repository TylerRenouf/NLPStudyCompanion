using NLPStudyCompanion.Server.Models;

namespace NLPStudyCompanion.Server.Repositories
{
    public interface ICardRepository
    {
        Task<IEnumerable<Card>> GetCardsByDeckId(int id);
        Task<Card> AddCardAsync(Card card);
        Task<bool> DeleteCardAsync(int id);
        Task<bool> DeleteCardsAsync(IEnumerable<int> ids);
        Task<bool> ModifyCardAsync(int id, Deck? deck, string? concept, string? content);
    }
}