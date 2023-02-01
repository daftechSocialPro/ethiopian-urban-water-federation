import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import { assetUrl, urlNews } from "../endpoints";
import {useNavigate} from 'react-router-dom'
import dateformat from 'dateformat'
function News() {
  const [news, setNews] = useState([]);
  const navigate = useNavigate()

  const getImage = (item) => {
    return `${assetUrl}/${item}`;
  };

  useEffect(() => {
    axios
      .get(urlNews)
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => console.error(err));
  }, []);


  const search=(item)=>{
    axios
    .get(urlNews)
    .then((res) => {
      setNews(res.data.filter(x=>x.title.contains(item)));
    })
    .catch((err) => console.error(err));



  }


  const navigateNewsDetial =(item)=>{

navigate('detail',{
  state :{
    news: item,
    newsList:news
  }
}
)

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
              <Link to="/">Home</Link>
            </li>
            <li>
              <span>News</span>
            </li>
          </ul>

          <h2 className="page-header__title">News</h2>
        </div>
      </section>
      <section className="sec-pad-top sec-pad-bottom">
			<div className="container">
				<div className="row gutter-y-30">

          {news.map((item,index)=>
          <div key={index} className="col-sm-12 col-md-6 col-lg-4">
          <div className="blog-card">
            <div className="blog-card__image">
              <img src={getImage(item.img)} alt=""/>
              <div className="blog-card__date">
                <span>{dateformat(item.createdAt,"d")}</span>{dateformat(item.createdAt,"mmm")}
              </div>
            </div>
            <div className="blog-card__content">
              <ul className="blog-card__meta list-unstyled">
                <li>
                  <i className="fa fa-user"></i>
                  <a href="#">by {item.waterFederation.fullName}</a>
                </li>
                <li>
                  <i className="fa fa-comments"></i>
                  <a href="#">02 comments</a>
                </li>
              </ul>
              <h3 className="blog-card__title"><a href="blog-details.html">{item.title}</a></h3>
              <a onClick={()=>navigateNewsDetial(item)} className="blog-card__links">
                <i className="fa fa-angle-double-right"></i>
                Read More</a>
            </div>
          </div>
        </div>
          )}
					
          </div>
          </div>
          </section>
 
    </>
  );
}

export default News;
