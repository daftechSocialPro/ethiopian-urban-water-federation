import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { assetUrl, urlSponsor } from "../endpoints";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";  
import dateformat from "dateformat";
function NewsDetail() {
  const location = useLocation();
  const [news, setNews] = useState(location.state.news && location.state.news);
  const [filterdList, setfilterdnewsList] =useState(location.state.newsList && location.state.newsList);
  const [newsList, setNewsList] = useState(
    location.state.newsList && location.state.newsList
  );
  const [sponser, setSponser]=useState([])
  const [partenerShip,setPartnerShip] = useState([])
  const  [searchParm,setSearchParam]= useState('')
  const option6 = {
    container: "#sponsor-carousel-1",
    loop: true,
    autoplay: true,
    dots: false,
    items: 2,
    gutter: 30,
    mouseDrag: true,
    touch: "true",
    nav: false,

    controls: false,
    responsive: {
      0: {
        items: 2,
        gutter: 30,
        margin: 30,
      },
      576: {
        items: 3,
        gutter: 30,
        margin: 30,
      },
      768: {
        items: 4,
        gutter: 30,
        margin: 30,
      },
      992: {
        items: 5,
        gutter: 50,
        margin: 40,
      },
      1200: {
        items: 5,
        gutter: 140,
        margin: 50,
      },
    },
  };

useEffect(()=>{

  setfilterdnewsList(
  newsList.filter(news => news.title.toLowerCase().includes(searchParm.toLowerCase()))
)
},[searchParm])


useEffect(()=>{
  axios.get(urlSponsor + "/bySupportType?supportType=0").then((res) => {
    setSponser(res.data)
  })
}, [])


useEffect(()=>{

  axios.get(urlSponsor+"/bySupportType?supportType=1").then((res)=>
    setPartnerShip(res.data)
  )
},[])

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
              <span>News Detail</span>
            </li>
          </ul>

          <h2 className="page-header__title">News Detail</h2>
        </div>
      </section>
      <section className="sec-pad-top sec-pad-bottom blog-details">
        <div className="container">
          <div className="row gutter-y-60">
            <div className="col-lg-8">
              <div className="blog-details__content clearfix">
                <div className="blog-details__image">
                  <img src={getImage(news.img)} alt="" />
                  <div className="blog-card__date">
                    <span>{dateformat(news.createdAt, "d")}</span>
                    {dateformat(news.createdAt, "mmm")}
                  </div>
                </div>
                <ul className="blog-card__meta list-unstyled">
                  <li>
                    <i className="fa fa-user"></i>
                    <a href="#">by {news.waterFederation.fullName}</a>
                  </li>
                  <li>
                    <i className="fa fa-comments"></i>
                    <a href="#">02 comments</a>
                  </li>
                </ul>
                <h3 className="blog-card__title">{news.title}</h3>
                <p>
                  {" "}
                  <div
                    dangerouslySetInnerHTML={{ __html: news.description }}
                  ></div>
                </p>
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

              {sponser.slice(0, 2).map((item, index) => {
              return (
                <div className="item" key={index} style={{marginLeft:"25%"}}  >
                  <img style={{height:"200px", width:"200px"}} src={getImage(item.logo)} alt="" />
                </div>
              )
            })}
            </div>
          </div>
        </div>
      </section>
      <section className="sec-pad-top sec-pad-bottom sponsor-carousel sponsor-carousel--home-2">
        <div className="container">
      {partenerShip.length &&    <OwlCarousel className="owl-theme " {...option6}>

            {partenerShip.map((item,index)=>{
              return(
                <div className="item" key={index}>
                <img src={getImage(item.logo)} alt="" />
              </div>
              )
            })}
          </OwlCarousel>}
        </div>
      </section>
    </>
  );
}

export default NewsDetail;
