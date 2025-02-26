using System.ComponentModel.DataAnnotations;

namespace NLPStudyCompanion.Server.DTOs
{
    public class DeckDto
    {
        public int id { get; set; }

        [Required]
        public required string name { get; set; }
    }
}
