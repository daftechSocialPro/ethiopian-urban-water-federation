import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const BoardMember = React.lazy(() => import('./views/WaterFederation/bordMember/BoardMember'))
const BoardMemberCreate = React.lazy(() =>
  import('./views/WaterFederation/bordMember/BoardMemberCreate'),
)
const BoardMemberUpdate = React.lazy(() =>
  import('./views/WaterFederation/bordMember/BoardMemberUpdate'),
)

const Research = React.lazy(() => import('./views/WaterFederation/research/Research'))
const ResearchCreate = React.lazy(() => import('./views/WaterFederation/research/ResearchCreate'))
const ResearchUpdate = React.lazy(() => import('./views/WaterFederation/research/ResearchUpdate'))

const NewsCreate = React.lazy(() => import('./views/WaterFederation/news/NewsCreate'))
const News = React.lazy(() => import('./views/WaterFederation/news/News'))
const NewsEdit = React.lazy(() => import('./views/WaterFederation/news/NewsEdit'))

const ForumCreate = React.lazy(() => import('./views/WaterFederation/forum/ForumCreate'))
const Forum = React.lazy(() => import('./views/WaterFederation/forum/Forum'))
const ForumEdit = React.lazy(() => import('./views/WaterFederation/forum/ForumEdit'))

const ContactUs = React.lazy(() => import('./views/WaterFederation/Contact'))
const Subcriber = React.lazy(() => import('./views/WaterFederation/Subscribers'))


const Region = React.lazy(() => import('./views/WaterFederation/region/Region'))

const RegionalFederation = React.lazy(() =>
  import('./views/WaterFederation/regionalfederation/RegionalFederation'),
)
const RegionalFederationCreate = React.lazy(() =>
  import('./views/WaterFederation/regionalfederation/RegionalFederationCreate'),
)
const RegionalFedetationUpdate = React.lazy(() =>
  import('./views/WaterFederation/regionalfederation/RegionalFederationUpdate'),
)

const WaterUtility = React.lazy(() => import('./views/WaterFederation/waterutility/WaterUtility'))
const WaterUtilityCreate = React.lazy(() =>
  import('./views/WaterFederation/waterutility/WaterUtilityCreate'),
)
const WaterUtilityUpdate = React.lazy(() =>
  import('./views/WaterFederation/waterutility/WaterUtilityUpdate'),
)

const Vaccancy = React.lazy(() => import('./views/WaterFederation/vaccancy/Vaccancy'))

const Questioner = React.lazy(() => import('./views/WaterFederation/questioner/Quesioner'))

const Question = React.lazy(() => import('./views/WaterFederation/questioner/Question'))


const Answer = React.lazy(() => import('./views/WaterFederation/questioner/Answer'))

const SubmitAnswer = React.lazy(() => import('./views/WaterFederation/answer/SubmitAnswer'))


const Sponsor = React.lazy(() => import('./views/WaterFederation/sponsor/Sponsor'))
const SponsorCreate = React.lazy(() =>
  import('./views/WaterFederation/sponsor/SponsorCreate'),
)
const SponsorUpdate = React.lazy(() =>
  import('./views/WaterFederation/sponsor/SponsorUpdate'),
)

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  //boardmember
  { path: '/boardmember', name: 'Board Member', element: BoardMember },
  { path: '/boardmember/create', name: 'Board Member Create', element: BoardMemberCreate },
  { path: '/boardmember/update', name: 'Board Member Update', element: BoardMemberUpdate },

  //research

  //boardmember
  { path: '/research', name: 'Research', element: Research },
  { path: '/research/create', name: 'Research Create', element: ResearchCreate },
  { path: '/research/update', name: 'Research Update', element: ResearchUpdate },

  //news
  { path: '/news', name: 'News', element: News, exact: true },
  { path: '/news/create', name: 'Add News', element: NewsCreate },
  { path: '/news/edit', name: 'Edit News', element: NewsEdit },

  // forums 
  
  //news
  { path: '/forum', name: 'Forums', element: Forum, exact: true },
  { path: '/forum/create', name: 'Add Forum', element: ForumCreate },
  { path: '/forum/edit', name: 'Update Forum', element: ForumEdit },


  //contact
  { path: '/contact', name: 'Contact Us', element: ContactUs },
  { path: '/subscriber', name: 'Subscribers List', element: Subcriber },

  

  //Region
  { path: '/region', name: 'Region', element: Region },

  //Regional Association

  {
    path: '/regionalwaterfederation',
    name: 'Regional Associations',
    element: RegionalFederation,
  },
  {
    path: '/regionalwaterfederation/create',
    name: 'Regional Associations Create',
    element: RegionalFederationCreate,
  },
  {
    path: '/regionalwaterfederation/update',
    name: 'Regional Associations',
    element: RegionalFedetationUpdate,
  },

  // water utility

  { path: '/waterutility', name: 'Water Utility ', element: WaterUtility },
  {
    path: '/waterutility/create',
    name: 'Regional Associations Create',
    element: WaterUtilityCreate,
  },
  {
    path: '/waterutility/update',
    name: 'Regional Associations Update',
    element: WaterUtilityUpdate,
  },

  //vaccancy

  {
    path: '/Vaccancy',
    name: 'Vaccancy',
    element: Vaccancy,
  },

  //Questioner
  {
    path: '/questioner',
    name: 'Questioner',
    element: Questioner,
  },
  //Quesiont
  {
    path: '/question',
    name: 'Question',
    element: Question,
  },


  //Answer
  {
    path: '/answer',
    name: 'Answer',
    element: Answer,
  },
  {
    path: '/submitanswer',
    name: 'Submit Answer',
    element: SubmitAnswer,
  },

   //sponsor
   { path: '/sponsor', name: 'Sponsor', element: Sponsor },
   { path: '/sponsor/create', name: 'Sponsor Create', element: SponsorCreate },
   { path: '/sponsor/update', name: 'Sponsor Update', element: SponsorUpdate },
 
]

export default routes
