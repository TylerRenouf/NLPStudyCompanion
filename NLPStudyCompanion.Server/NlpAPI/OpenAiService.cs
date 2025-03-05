
using NLPStudyCompanion.Server.NlpAPI.Interfaces;
using OpenAI.Chat;
using NLPStudyCompanion.Server.Helpers;
using NLPStudyCompanion.Server.DTOs;
class OpenAiService : IOpenAiService
{

    private readonly string? _apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
    private readonly ChatClient chatClient;

    public OpenAiService(string model)
    {
        chatClient = new(model: model, apiKey: _apiKey);
    }

    public async Task<ServiceResult<FeedbackDto>> ReceiveFeedback(string concept,string content, string answer)
    {
        if (!ValidateInput(concept) || !ValidateInput(content) || !ValidateInput(answer))
        {
            return ServiceResultFactory.Failure<FeedbackDto>("Input invalid or missing.", 400);
        }

        List<ChatMessage> messages = new List<ChatMessage>
        {
            new SystemChatMessage(SystemPrompts.SystemPrompt), // add system prompt to the beginning of the messages
            new UserChatMessage($"Flashcard Front (Concept): {concept}\n" +
                                $"Flashcard Back (Expected Answer): {content}\n" +
                                $"User's Answer: {answer}\n\nPlease provide feedback on the user's response.")
        };

        return await GetResponse(messages);
    }

    public async Task<ServiceResult<FeedbackDto>> GetResponse(List<ChatMessage> messages)
    {
        ChatCompletion completion = await chatClient.CompleteChatAsync(messages);

        return await HandleCompletion(completion);
    }


    private bool ValidateInput(string input, int maxLength = 500)
    {
        return !string.IsNullOrWhiteSpace(input) && input.Length <= maxLength;
    }

    private Task<ServiceResult<FeedbackDto>> HandleCompletion(ChatCompletion completion)
    {
        if (completion.Refusal != null && !string.IsNullOrEmpty(completion.Refusal))
        {
            return Task.FromResult(ServiceResultFactory.Failure<FeedbackDto>(completion.Refusal, 400));
        }

        switch (completion.FinishReason)
        {
            case ChatFinishReason.Stop:
                {
                    if (completion.Content.Count == 0 || completion.Content[0].Text == null )
                    {
                        return Task.FromResult(ServiceResultFactory.Failure<FeedbackDto>("No response from OpenAI.", 500));
                    }
                    var feedback = new FeedbackDto { feedback = completion.Content[0].Text.Trim() };

                    return Task.FromResult(ServiceResultFactory.Success<FeedbackDto>(feedback));
                }
            case ChatFinishReason.ContentFilter:
                {
                    return Task.FromResult(ServiceResultFactory.Failure<FeedbackDto>("Text contained innapropriate content.", 400));
                }
            case ChatFinishReason.Length:
                {
                    var feedback = new FeedbackDto { feedback = completion.Content[0].Text.Trim() };

                    return Task.FromResult(ServiceResultFactory.Success<FeedbackDto>(feedback, "Response may be incomplete due to token limits"));
                }
            default:
                {
                    return Task.FromResult(ServiceResultFactory.Failure<FeedbackDto>("Unknown error from OpenAI.", 500));
                }
        }
    }




}
