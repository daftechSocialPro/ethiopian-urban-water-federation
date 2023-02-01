
using DAFwebAPI.Data;
using DAFwebAPI.Services.Contact;
using DAFwebAPI.Services.Dashborad;
using DAFwebAPI.Services.Forum;
using DAFwebAPI.Services.News;
using DAFwebAPI.Services.Question;
using DAFwebAPI.Services.Questioner;
using DAFwebAPI.Services.Region;
using DAFwebAPI.Services.RegionalFederation;
using DAFwebAPI.Services.Research;
using DAFwebAPI.Services.Sponsor;
using DAFwebAPI.Services.WaterUtility;

namespace DAFwebAPI.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationDbContext _context;

        public UnitOfWork(ApplicationDbContext db)
        {
            _context = db;
           
            userRepository = new UserRepository(db);
            borderMemberRepository= new BorderMemberRepository(db);
            newsRepository = new NewsRepository(db);
            contactRepository = new ContactRepository(db);
            reasearchRepository = new ResearchRepository(db);
            regionRepository= new RegionRepository(db); 
            regionalFederationRepository = new RegionalFederationRepository(db);
            waterUtilityRepository = new WaterUtilityRepository(db);
            questionerRepostitory = new QuestionerRepository(db);
            questionRepository = new QuestionRepository(db);    
            dashboradRepository =new DashboarRepository(db);
            sponsorRepository = new SponsorRepository(db);
            forumRepository= new ForumRepository(db);
          
        }
      
        public IUserRepository userRepository {get;set;}
        public IBorderMemberRepository borderMemberRepository { get;set;}

        public INewsRepository newsRepository { get;set;}   

        public IContactRepository contactRepository { get;set;}

        public IReasearchRepository reasearchRepository { get;set;}

        public IRegionRepository regionRepository { get;set;}

        public IRegionalFederationRepository regionalFederationRepository { get;set;}

        public IWaterUtilityRepository waterUtilityRepository { get;set;}   


        public IQuestionerRepostitory questionerRepostitory { get; set; }

        public IQuestionRepository questionRepository { get;set;}
        
        public IDashboradRepository dashboradRepository { get;set;}

        public ISponsorRepository sponsorRepository { get;set;}

        public IForumRepository forumRepository { get;set;} 
        public async Task SaveChanges()
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

