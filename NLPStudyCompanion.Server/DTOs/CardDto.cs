using System.ComponentModel.DataAnnotations;

namespace NLPStudyCompanion.Server.DTOs
{
    public class CardDto
    {
        public int id { get; set; }

        [Required]
        public required string concept { get; set; }

        [Required]
        public required string content { get; set; }
    }
}
