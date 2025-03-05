using System.ComponentModel.DataAnnotations;

namespace NLPStudyCompanion.Server.Models
{
    public class Deck
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public required string name { get; set; }

        public virtual ICollection<Card> Cards { get; set; } = new List<Card>();
    }
}