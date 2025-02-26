using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NLPStudyCompanion.Server.Models
{
    public class Card
    {
        [Key]
        public int Id { get; set; }
        

        [Required]
        public required string concept { get; set; }

        [Required]
        public required string content { get; set; }

        [Column("deck_id")]
        public int DeckId { get; set; }

        public virtual required Deck Deck { get; set; } // Deck the card belongs to
    }
}