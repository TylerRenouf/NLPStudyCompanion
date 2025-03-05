namespace NLPStudyCompanion.Server.Helpers
{
    public class ServiceResultFactory
    {
        public static ServiceResult<T> Success<T>(T data, string? message = null, int statusCode = 200)
        {
            return new ServiceResult<T>
            {
                Data = data,
                Message = message,
                StatusCode = statusCode
            };
        }

        public static ServiceResult<T> Created<T>(T data)
        {
            return new ServiceResult<T>
            {
                Data = data,
                StatusCode = 201
            };
        }

        public static ServiceResult<T> Failure<T>(string message, int statusCode)
        {
            return new ServiceResult<T>
            {
                Message = message,
                StatusCode = statusCode
            };
        }

        public static ServiceResult<T> Error<T>()
        {
            return new ServiceResult<T>
            {
                Message = "An unexpected error occured.",
                StatusCode = 500
            };
        }
    }
}
