using Microsoft.AspNetCore.Mvc;

namespace NLPStudyCompanion.Server.Helpers
{
    public class ServiceResultTranslator
    {
        public static IActionResult Translate<T>(ServiceResult<T> result,string? location = null)
        {
            if (result.StatusCode == 200)
            {
                return new OkObjectResult(result.Data);
            }
            if (result.StatusCode == 204)
            {
                return new NoContentResult();
            }

            if (result.StatusCode == 201)
            {
                if (location != null)
                {
                    return new CreatedResult(location, result.Data);
                }

                return new CreatedResult(result.Location ?? "", result.Data);
            }

            return new ObjectResult(new { Message = result.Message })
            {
                StatusCode = result.StatusCode
            };
        }
    }
}
