namespace DAFwebAPI.Entities
{
    public class Questions : Common
    {


        public string ? Question { get; set; }

        public AnswerType AnswerType { get; set; }  

        public bool IncludeReport { get; set; }

        public bool IncludeDashboard { get; set; }

        public int NumberOfRows { get; set; }

        public virtual Questioner? Questioner { get; set; }

        public Guid QuestionerId { get; set; }


    }

    public enum AnswerType
    {
        Text,
        Number
    }
}
