using Microsoft.AspNetCore.Mvc;
using NLPStudyCompanion.Server.DTOs;
using NLPStudyCompanion.Server.NlpAPI.Interfaces;
using NLPStudyCompanion.Server.Helpers;


namespace NLPStudyCompanion.Server.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly IOpenAiService _openAiService;

        public FeedbackController(IOpenAiService openAiService) {
            _openAiService = openAiService;
        }

        [HttpPost]
        public async Task<IActionResult> ReceiveFeedback([FromBody] PromptDto feedback)
        {
            ServiceResult<FeedbackDto> result = await _openAiService.ReceiveFeedback(feedback.concept, feedback.content, feedback.answer);


            return ServiceResultTranslator.Translate(result);
        }
    }
}
