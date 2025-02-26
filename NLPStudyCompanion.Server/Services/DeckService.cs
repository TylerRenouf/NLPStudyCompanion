using NLPStudyCompanion.Server.DTOs;
using NLPStudyCompanion.Server.Models;
using NLPStudyCompanion.Server.Repository.Interfaces;
using NLPStudyCompanion.Server.Services.Interfaces;
using NLPStudyCompanion.Server.Helpers;


namespace NLPStudyCompanion.Server.Services
{
    public class DeckService : IDeckService
    {
        private readonly IDeckRepository _repository;

        public DeckService(IDeckRepository repository)
        {
            _repository = repository;
        }

        public async Task<ServiceResult<IEnumerable<DeckDto>>> GetAllDecksAsync()
        {
            var decks =  await _repository.GetAllDecksAsync();
            if (decks == null || !decks.Any())
            {
                return ServiceResultFactory.Success<IEnumerable<DeckDto>>(Enumerable.Empty<DeckDto>());
            }

            IEnumerable<DeckDto> deckCollection =  decks.Select(d => new DeckDto
            {
                id = d.Id,
                name = d.name,
            }).ToList();

            return ServiceResultFactory.Success<IEnumerable<DeckDto>>(deckCollection);
        }

        public async Task<ServiceResult<DeckDto>> GetDeckByIdAsync(int id)
        {
            var deck =  await _repository.GetDeckByIdAsync(id);
            if (deck == null)
            {
                return ServiceResultFactory.Failure<DeckDto>($"Deck with ID {id} not found.",404);
            }

            DeckDto retrievedDeck = new DeckDto
            {
                id = deck.Id,
                name = deck.name,
            };

            return ServiceResultFactory.Success<DeckDto>(retrievedDeck);
        }

        public async Task<ServiceResult<DeckDto>> AddDeckAsync(CreateDeckDto deckDto)
        {

            if (deckDto.name == null || string.IsNullOrWhiteSpace(deckDto.name))
            {
                return ServiceResultFactory.Failure<DeckDto>("Deck name cannot be null or empty.", 400);
            }

            Deck addedDeck =  await _repository.AddDeckAsync(deckDto);



            DeckDto addedDeckDto = new DeckDto
            {
                id = addedDeck.Id,
                name = addedDeck.name,
            };

            return ServiceResultFactory.Success<DeckDto>(addedDeckDto,statusCode:201);

        }

        public async Task<ServiceResult<bool>> DeleteDeckAsync(int id)
        {
            bool deleteSuccess = await _repository.DeleteDeckAsync(id);

            if (!deleteSuccess)
            {
                return ServiceResultFactory.Failure<bool>($"Deck with ID {id} not found.", 404);
            }

            return ServiceResultFactory.Success<bool>(true, statusCode:204);

        }

        public async Task<ServiceResult<bool>> ModifyDeckAsync(int id, UpdateDeckDto deckDto)
        {
            if (deckDto.name == null || string.IsNullOrWhiteSpace(deckDto.name))
            {
                return ServiceResultFactory.Failure<bool>("Input invalid or missing.", 400);
            }


            bool modifiedSuccess = await _repository.ModfiyDeckAsync(id, deckDto);

            if (!modifiedSuccess)
            {
                return ServiceResultFactory.Failure<bool>($"Deck with ID {id} not found.", 404);
            }

            return ServiceResultFactory.Success<bool>(true, statusCode: 204);
        }
    }
}
