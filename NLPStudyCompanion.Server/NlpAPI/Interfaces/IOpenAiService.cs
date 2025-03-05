using OpenAI.Chat;
using NLPStudyCompanion.Server.Helpers;
using NLPStudyCompanion.Server.DTOs;
namespace NLPStudyCompanion.Server.NlpAPI.Interfaces
{
    public interface IOpenAiService
    {
        Task<ServiceResult<FeedbackDto>> GetResponse(List<ChatMessage> messages);
        Task<ServiceResult<FeedbackDto>> ReceiveFeedback(string concept, string content, string answer);

    }
}
