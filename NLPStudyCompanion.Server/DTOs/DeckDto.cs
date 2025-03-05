using System.ComponentModel.DataAnnotations;

namespace NLPStudyCompanion.Server.DTOs
{
    public class DeckDto
    {
        [Required]
        public required int id { get; set; }

        [Required]
        public required string name { get; set; }
    }
}
