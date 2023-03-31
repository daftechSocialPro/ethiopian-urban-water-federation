import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { assetUrl} from "../endpoints";
import dateformat from "dateformat";
function ForumDetail() {
  const location = useLocation();
  const [forum, setForum] = useState(location.state.forum && location.state.forum);
  const [filterdList, setfilterdforumsList] =useState(location.state.forum && location.state.forum);
  const [forumList, setForumList] = useState(location.state.forum && location.state.forum);
  const  [searchParm,setSearchParam]= useState('')


useEffect(()=>{

  setfilterdnewsList(
  forumList.filter(forum => forum.title.toLowerCase().includes(searchParm.toLowerCase()))
)
},[searchParm])








  const getImage = (item) => {
    return `${assetUrl}/${item}`;
  };


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
                <p>
                  {" "}
                  <div
                    dangerouslySetInnerHTML={{ __html: forum.description }}
                  ></div>
                </p>
              </div>
              <div className="blog-details__bottom">
                <div className="blog-details__social">
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-pinterest"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
              <div className="blog-details__author clearfix">
                <img src="/assets/images/blog/blog-a-1.jpg" alt="" />
                <h3 className="blog-details__author__name">Kevin martin</h3>
                <p className="blog-details__author__bio">
                  Cursus massa at urnaaculis estie. Sed aliquamellus vitae ultrs
                  condmentum lightly believable. If you are going to use a of
                  you need to be sure there isn't anything embarrassing.
                </p>
              </div>
              <div className="blog-details__comments">
                <h3 className="blog-details__sec__title">02 Comments</h3>
                <ul className="list-unstyled blog-details__comments__list">
                  <li>
                    <img src="/assets/images/blog/blog-c-1.jpg" alt="" />
                    <div className="blog-details__comments__meta">
                      <h3 className="blog-details__comments__name">
                        Christine Eve{" "}
                      </h3>
                      <p className="blog-details__comments__date">20 Aug, 2022</p>
                    </div>
                    <p className="blog-details__comments__text">
                      Sending love. My nephews Nick and Anthony Salaber are your
                      teammates, so I know the caliber person you are. Our whole
                      family is sending our best to you and your family.
                    </p>

                    <a href="#" className="thm-btn blog-details__comments__btn">
                      <span>Reply</span>
                    </a>
                  </li>
                  <li>
                    <img src="/assets/images/blog/blog-c-2.jpg" alt="" />
                    <div className="blog-details__comments__meta">
                      <h3 className="blog-details__comments__name">
                        Christine Eve{" "}
                      </h3>

                      <p className="blog-details__comments__date">20 Aug, 2022</p>
                    </div>
                    <p className="blog-details__comments__text">
                      Sending love. My nephews Nick and Anthony Salaber are your
                      teammates, so I know the caliber person you are. Our whole
                      family is sending our best to you and your family.
                    </p>

                    <a href="#" className="thm-btn blog-details__comments__btn">
                      <span>Reply</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="blog-details__form">
                <h3 className="blog-details__sec__title">Leave a comment</h3>
                <form
                  action="https://paroti-html.vercel.app/assets/inc/sendemail.php"
                  className="contact-one__form contact-form-validated"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <input type="text" placeholder="Your name" name="name" />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        placeholder="Email address"
                        name="email"
                      />
                    </div>
                    <div className="col-md-12">
                      <textarea
                        name="message"
                        placeholder="Write a message"
                      ></textarea>
                    </div>
                    <div className="col-md-12">
                      <button type="submit" className="thm-btn contact-one__btn">
                        <span>Submit comment</span>
                      </button>
                    </div>
                  </div>
                </form>
                <div className="result"></div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sidebar">
                <div className="sidebar__single sidebar__single--search">
                  <form action="#">
                    <input type="text"  value={searchParm} onChange={(e)=>setSearchParam(e.target.value)}  placeholder="Search here.." />
                    <button type="submit">
                      <i className="paroti-icon-magnifying-glass"></i>
                    </button>
                  </form>
                </div>
                <div className="sidebar__single sidebar__single--posts">
                  <h3 className="sidebar__title">Recent posts</h3>
                  <ul className="list-unstyled sidebar__post">
                    {filterdList.slice(0, 4).map((item, index) => (
                      <li>
                        <a onClick={()=>setNews(item)}>
                          <img
                            style={{ maxWidth: "70px" }}
                            src={getImage(item.img)}
                            alt=""
                          />
                          <span className="sidebar__post__meta">
                            <i className="fa fa-comments"></i>
                            02 comments
                          </span>
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
