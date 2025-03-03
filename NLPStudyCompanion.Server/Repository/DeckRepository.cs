using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.EntityFrameworkCore;
using NLPStudyCompanion.Server.Data;
using NLPStudyCompanion.Server.DTOs;
using NLPStudyCompanion.Server.Models;
using NLPStudyCompanion.Server.Repository.Interfaces;

namespace NLPStudyCompanion.Server.Repositories
{
    public class DeckRepository : IDeckRepository
    {
        private readonly AppDbContext _context;

        public DeckRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Deck>> GetAllDecksAsync()
        {
            return await _context.Decks.ToListAsync();
        }

        public async Task<Deck?> GetDeckByIdAsync(int id)
        {
            // modify and use if you want custom retrieval logic interacting with Card navigation property || Otherwise use FindAsync(id);
            return await _context.Decks.FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task<Deck> AddDeckAsync(CreateDeckDto deck)
        {

            Deck newDeck = new Deck
            {
                name = deck.name,
            };
            _context.Decks.Add(newDeck);
            await _context.SaveChangesAsync();
            return newDeck;
        }

        public async Task<bool> DeleteDeckAsync(int id)
        {
            var deck = await _context.Decks.FindAsync(id);
            if (deck == null) return false;

            _context.Decks.Remove(deck);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteDecksAsync(List<int> ids)
        {
            var decks = await _context.Decks.Where(d=> ids.Contains(d.Id)).ToListAsync();
            if (!decks.Any()) return false;

            _context.Decks.RemoveRange(decks);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> ModfiyDeckAsync(int id, UpdateDeckDto deckDto)
        {

            var deck = await _context.Decks.FindAsync(id);
            if (deck == null) return false;

            deck.name = deckDto.name;
            await _context.SaveChangesAsync();
            return true;

        }


    }
}