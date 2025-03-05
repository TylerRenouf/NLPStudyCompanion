using System.ComponentModel.DataAnnotations;


namespace NLPStudyCompanion.Server.DTOs
{
    public class PromptDto
    {
        [Required]
        [StringLength(3000)]
        public required string concept { get; set; }

        [Required]
        [StringLength(3000)]
        public required string content { get; set; }

        [Required]
        [StringLength(3000)]
        public required string answer { get; set; }
    }
}
