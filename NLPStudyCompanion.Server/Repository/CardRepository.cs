using Microsoft.EntityFrameworkCore;
using NLPStudyCompanion.Server.Data;
using NLPStudyCompanion.Server.Models;
using NLPStudyCompanion.Server.Repository.Interfaces;

namespace NLPStudyCompanion.Server.Repositories
{
    public class CardRepository : ICardRepository
    {
        private readonly AppDbContext _context;

        public CardRepository(AppDbContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Card>> GetCardsByDeckId(int deckId)
        {
            return await _context.Cards.Where(c => c.DeckId == deckId).ToListAsync();
        }

        public async Task<Card> AddCardAsync(Card card)
        {
            _context.Cards.Add(card);
            await _context.SaveChangesAsync();
            return card;
        }

        public async Task<bool> DeleteCardAsync(int id)
        {
            var card = await _context.Cards.FindAsync(id);
            if (card == null) return false;

            _context.Cards.Remove(card);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ModifyCardAsync(int id, Deck? deck, string? concept = null, string? content = null)
        {
            var card = await _context.Cards.Include(c => c.Deck).FirstOrDefaultAsync(c => c.Id == id);

            if (card == null) return false;


            if (concept != null)
            {
                card.concept = concept;
            }
            if (content != null)
            {
                card.content = content;
            }
            if(deck != null)
            {

                card.DeckId = deck.Id;
                card.Deck = deck;
            }
            await _context.SaveChangesAsync();
            return true;
        }




    }
}