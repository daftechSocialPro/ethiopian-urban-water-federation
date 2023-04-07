



using DAFwebAPI.Services.Contact;
using DAFwebAPI.Services.Dashborad;
using DAFwebAPI.Services.Forum;
using DAFwebAPI.Services.Question;
using DAFwebAPI.Services.Questioner;
using DAFwebAPI.Services.RegionalFederation;
using DAFwebAPI.Services.Sponsor;
using DAFwebAPI.Services.WaterUtility;

namespace DAFwebAPI.Services
{
    public interface IUnitOfWork
    {
        IUserRepository userRepository { get; }
        IBorderMemberRepository borderMemberRepository { get; }
        INewsRepository newsRepository { get; } 

        IContactRepository contactRepository { get; }

        IReasearchRepository reasearchRepository { get; }


        IRegionRepository regionRepository { get; }

        IRegionalFederationRepository regionalFederationRepository { get; }

        IWaterUtilityRepository waterUtilityRepository { get; }

        IQuestionerRepostitory questionerRepostitory { get;  }


        IQuestionRepository questionRepository { get; }

        IDashboradRepository dashboradRepository { get; }

        ISponsorRepository sponsorRepository { get; }

        IForumRepository forumRepository { get; }

        ISubscriberServices subscriberService { get; }

        Task SaveChanges();
    }
}
