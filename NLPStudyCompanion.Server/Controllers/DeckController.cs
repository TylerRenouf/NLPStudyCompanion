

using Microsoft.AspNetCore.Mvc;
using NLPStudyCompanion.Server.DTOs;
using NLPStudyCompanion.Server.Services.Interfaces;
using NLPStudyCompanion.Server.Helpers;
using NLPStudyCompanion.Server.Models;


// ModelState.IsValid for validation on models with attributes (data annotations)

namespace NLPStudyCompanion.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeckController: ControllerBase
    {
        private readonly IDeckService _deckService;

        private readonly ICardService _cardService;
        public DeckController(IDeckService deckService, ICardService cardService) { 
            _deckService = deckService;
            _cardService = cardService;
        }

        
        /// <summary>
        /// Get all decks
        /// </summary>
        /// <returns>A list of deck DTOs or an empty list if no decks are found</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllDecks()
        {
            ServiceResult<IEnumerable<DeckDto>> result = await _deckService.GetAllDecksAsync();

            return ServiceResultTranslator.Translate(result);
        }


        /// <summary>
        /// Get all cards in a deck by deck ID
        /// </summary>
        /// <param name="deckId">The ID of the deck</param>
        /// <returns>A list of Card DTOs or an empty list if no cards are found</returns>
        [HttpGet("{deckId}/cards")]
        public async Task<IActionResult> GetCardsByDeckId(int deckId)
        {
            ServiceResult<IEnumerable<CardDto>> result = await _cardService.GetCardsByDeckId(deckId);
            return ServiceResultTranslator.Translate(result);
        }

        /// <summary>
        /// Get a deck by ID
        /// </summary>
        /// <param name="deckId">The ID of the deck</param>
        /// <returns>A deck DTO object if found, otherwise a 404 response</returns>
        [HttpGet("{deckId}")]
        public async Task<IActionResult> GetDeckById(int deckId)
        {
            ServiceResult<DeckDto> result = await _deckService.GetDeckByIdAsync(deckId);
            return ServiceResultTranslator.Translate(result);
        }


        /// <summary>
        /// Create a card in a deck
        /// </summary>
        /// <param name="deckId">The ID of the deck to add to</param>
        /// <param name="cardDto">The createCardDto object</param>
        /// <returns>The created card and location in a 201 response</returns>
        [HttpPost("{deckId}/cards")]
        public async Task<IActionResult> CreateCard(int deckId, [FromBody] CreateCardDto cardDto)
        {
            ServiceResult<CardDto> result = await _cardService.AddCardAsync(deckId,cardDto);
            if (result.StatusCode == 201)
            {
                string? location = Url.Link("GetCardsByDeckId", new { deckId = deckId });
                return ServiceResultTranslator.Translate(result,location);
            }
            return ServiceResultTranslator.Translate(result);
        }

        /// <summary>
        /// Create a deck
        /// </summary>
        /// <param name="deckDto">The deck DTO object</param>
        /// <returns>The created deck and location in a 201 response</returns>
        [HttpPost]
        public async Task<IActionResult> CreateDeck([FromBody] CreateDeckDto deckDto)
        {
            ServiceResult<DeckDto> result = await _deckService.AddDeckAsync(deckDto);

            if (result.StatusCode == 201)
            {
                string? location = Url.Link("GetDeckById", new { deckId = result.Data?.id });
                return ServiceResultTranslator.Translate(result, location);
            }

            return ServiceResultTranslator.Translate(result);
        }


        /// <summary>
        /// Delete a deck by ID
        /// </summary>
        /// <param name="deckId">The ID of the deck to be deleted</param>
        /// <returns>A 204 NoContent response on success</returns>
        [HttpDelete("{deckId}")]
        public async Task<IActionResult> DeleteDeck(int deckId)
        {
            ServiceResult<bool> result = await _deckService.DeleteDeckAsync(deckId);
            return ServiceResultTranslator.Translate(result);
        }

        [HttpDelete("")]
        public async Task<IActionResult> DeleteDecks(List<int> deckIds)
        {
            ServiceResult<bool> result = await _deckService.DeleteDecksAsync(deckIds);
            return ServiceResultTranslator.Translate(result);
        }

        /// <summary>
        /// Delete a card by ID
        /// </summary>
        /// <param name="cardId">The ID of the card to be deleted</param>
        /// <returns>A 204 NoContent response on success</returns>
        [HttpDelete("{deckId}/cards/{cardId}")]
        public async Task<IActionResult> DeleteCard(int cardId)
        {
            ServiceResult<bool> result = await _cardService.DeleteCardAsync(cardId);
            return ServiceResultTranslator.Translate(result);
        }

        [HttpDelete("{deckId}/cards")]
        public async Task<IActionResult> DeleteCards([FromBody] List<int> cardIds)
        {
            if (cardIds == null || !cardIds.Any())
            {
                return BadRequest("No card IDs provided.");
            }
            ServiceResult<bool> result = await _cardService.DeleteCardsAsync(cardIds);
            return ServiceResultTranslator.Translate(result);
        }

        /// <summary>
        /// Modify a card by ID
        /// </summary>
        /// <param name="cardId">The ID of the card to be modified</param>
        /// <param name="updateCardDto">The modified card object</param>
        /// <returns>A 204 NoContent response on success</returns>
        [HttpPatch("{deckId}/cards/{cardId}")]
        public async Task<IActionResult> ModifyCard(int cardId, [FromBody] UpdateCardDto updateCardDto)
        {

            ServiceResult<bool> result = await _cardService.ModifyCardAsync(cardId, updateCardDto);

            return ServiceResultTranslator.Translate(result);
        }

        /// <summary>
        /// Modify a deck by ID
        /// </summary>
        /// <param name="deckId">The ID of the deck to be modified</param>
        /// <param name="updateDeckDto">The modified deck object</param>
        /// <returns>A 204 NoContent response on success</returns>
        [HttpPatch("{deckId}")]
        public async Task<IActionResult> ModifyDeck(int deckId, [FromBody] UpdateDeckDto updateDeckDto)
        {

            ServiceResult<bool> result = await _deckService.ModifyDeckAsync(deckId, updateDeckDto);

            return ServiceResultTranslator.Translate(result);
        }
    }
}