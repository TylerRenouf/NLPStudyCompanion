using System.ComponentModel.DataAnnotations;

namespace NLPStudyCompanion.Server.DTOs
{
    public class UpdateDeckDto
    {
        [Required]
        [StringLength(255)]
        public required string name { get; set; }
    }
}
