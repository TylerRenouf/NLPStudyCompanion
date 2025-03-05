using System.ComponentModel.DataAnnotations;

namespace NLPStudyCompanion.Server.DTOs
{
    public class FeedbackDto
    {
        [Required]
        public required string feedback { get; set; }
    }
}
