namespace DAFwebAPI.Entities
{
    public class Answer : Common
    {

        public virtual Questions? Questions { get; set; }

        public Guid? QuestionsId { get; set; }

        public string? Answers { get; set; }

        public virtual Questioner ? Questioner { get; set; }
        public Guid? QuestionerId { get; set; }


        public virtual WaterUtility? WaterUtility { get; set; }
        public Guid? WaterUtilityId { get; set; }


        public virtual RegionalWaterFederation? RegionalWaterFederation { get;set; }
        public Guid? RegionalWaterFederationId { get; set; }
    }
}
