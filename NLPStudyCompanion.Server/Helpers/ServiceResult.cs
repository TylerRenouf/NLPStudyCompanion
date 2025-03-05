namespace NLPStudyCompanion.Server.Helpers
{
    public class ServiceResult<T>
    {
        public string? Message { get; set; }
        public T? Data { get; set; }
        public int StatusCode { get; set; }

        public string? Location { get; set; }

    }
}
