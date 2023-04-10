import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { assetUrl} from "../endpoints";
import dateformat from "dateformat";
function ForumDetail() {
  const location = useLocation();
  const [forum, setForum] = useState(location.state.forum && location.state.forum);
  const [filterdList, setfilterdforumsList] =useState(location.state.forumList && location.state.forumList);
  const [forumList, setForumList] = useState(location.state.forumList && location.state.forumList);
  const  [searchParm,setSearchParam]= useState('')


useEffect(()=>{

  setfilterdforumsList(
  forumList.filter(forum => forum.title.toLowerCase().includes(searchParm.toLowerCase()))
)
},[searchParm])








  const getImage = (item) => {
    return `${assetUrl}/${item}`;
  };


  const filterdStyle = ( index ) => {
    const buttonStyle = {
      backgroundColor: index%2===0 ? 'white' : '',
     
     
    };
    return buttonStyle;
  }
  return (
    <>
      <section
        className="page-header"
        style={{ backgroundImage: "url(/assets/images/backgrounds/1.jpeg)" }}
      >
        <div className="container">
          <ul className="list-unstyled breadcrumb-one">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <span>Forums Detail</span>
            </li>
          </ul>

          <h2 className="page-header__title">Forums Detail</h2>
        </div>
      </section>
      <section className="sec-pad-top sec-pad-bottom blog-details">
        <div className="container">
          <div className="row gutter-y-60">
            <div className="col-lg-8">
              <div className="blog-details__content clearfix">
                <div className="blog-details__image">
                  <img src={getImage(forum.img)} alt="" />
                
                </div>
             
                <h3 className="blog-card__title">{forum.title}</h3>
                
            
                  <div
                 
                    dangerouslySetInnerHTML={{ __html: forum.description }}
                  ></div>
                
              </div>
          
            </div>
            <div className="col-lg-4">
              <div className="sidebar">
                <div className="sidebar__single sidebar__single--search">
                  <form action="#">
                    <input type="text" className="searhcInput"  value={searchParm} onChange={(e)=>setSearchParam(e.target.value)}  placeholder="Search here.." />
                    <button type="submit">
                      <i className="paroti-icon-magnifying-glass"></i>
                    </button>
                  </form>
                </div>
                <div className="sidebar__single sidebar__single--posts">
                  <h3 className="sidebar__title">Recent Fourms</h3>
                  <ul className="list-unstyled sidebar__post">
                    {filterdList.slice(0, 4).map((item, index) => (
                      <li key={index} style={filterdStyle(index)}>
                        <a onClick={()=>setForum(item)}>
                          <img
                            style={{ maxWidth: "70px" }}
                            src={getImage(item.img)}
                            alt=""
                          />
                          {/* <span className="sidebar__post__meta">
                            <i className="fa fa-comments"></i>
                            02 comments
                          </span> */}
                          <span className="sidebar__post__title">{item.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForumDetail;
