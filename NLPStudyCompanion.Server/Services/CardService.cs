using NLPStudyCompanion.Server.Models;
using NLPStudyCompanion.Server.Repositories;
using NLPStudyCompanion.Server.Services.Interfaces;
using NLPStudyCompanion.Server.DTOs;
using NLPStudyCompanion.Server.Repository.Interfaces;
using NLPStudyCompanion.Server.Helpers;

namespace NLPStudyCompanion.Server.Services
{
    public class CardService : ICardService
    {
        private readonly ICardRepository _cardRepository;
        private readonly IDeckRepository _deckRepository;


        public CardService(ICardRepository cardRepository, IDeckRepository deckRepository)
        {

            _cardRepository = cardRepository;
            _deckRepository = deckRepository;

        }

        public async Task<ServiceResult<IEnumerable<CardDto>>> GetCardsByDeckId(int id)
        {
            var cards = await _cardRepository.GetCardsByDeckId(id);

            if (!cards.Any())
            {
                return ServiceResultFactory.Success<IEnumerable<CardDto>>(Enumerable.Empty<CardDto>());
            }

            IEnumerable<CardDto> cardCollection = cards.Select(c => new CardDto
            {
                id = c.Id,
                concept = c.concept,
                content = c.content,
            }).ToList();

            return ServiceResultFactory.Success<IEnumerable<CardDto>>(cardCollection);
        }

        public async Task<ServiceResult<CardDto>> AddCardAsync(int DeckId, CreateCardDto cardDto)
        {

            if (cardDto.concept == null || cardDto.content == null)
            {
                return ServiceResultFactory.Failure<CardDto>("Input invalid or missing.", 400);
            }

            var deck = await _deckRepository.GetDeckByIdAsync(DeckId);

            if (deck == null)
            {
                return ServiceResultFactory.Failure<CardDto>($"Deck with ID {DeckId} not found.", 404);
            }

            Card card = new Card
            {
                concept = cardDto.concept,
                content = cardDto.content,
                DeckId = DeckId,
                Deck = deck
            };

            Card cardResult = await _cardRepository.AddCardAsync(card);

            CardDto result =  new CardDto
            {
                id = cardResult.Id,
                concept = cardResult.concept,
                content = cardResult.content,
            };

            return ServiceResultFactory.Created<CardDto>(result);
        }

        public async Task<ServiceResult<bool>> DeleteCardAsync(int id)
        {

            var deleteSuccess =  await _cardRepository.DeleteCardAsync(id);

            if (!deleteSuccess)
            {
                return ServiceResultFactory.Failure<bool>($"Card with ID {id} not found.",404);
            }


            return ServiceResultFactory.Success(true,statusCode:204);
        }

        public async Task<ServiceResult<bool>> ModifyCardAsync(int id, UpdateCardDto updateCardDto)
        {

            if (updateCardDto.concept == null && updateCardDto.content == null && updateCardDto.DeckId == null)
            {

                return ServiceResultFactory.Failure<bool>("Input invalid or missing.", 400);
            }
            Deck? deck = null;

            if (updateCardDto.DeckId != null)
            {
                deck = await _deckRepository.GetDeckByIdAsync(updateCardDto.DeckId.Value);

                if (deck == null)
                {
                    return ServiceResultFactory.Failure<bool>($"Deck with ID {updateCardDto.DeckId} not found.", 404);
                }

            }

            var updateSuccess = await _cardRepository.ModifyCardAsync(id, deck, updateCardDto.concept, updateCardDto.content);
            if (!updateSuccess)
            {
                return ServiceResultFactory.Failure<bool>($"Card with ID {id} not found.", 404);
            }

            return ServiceResultFactory.Success(true, statusCode: 204);
        }
    }
}
