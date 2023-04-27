import React from "react";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { assetUrl } from "../endpoints";
import dateformat from "dateformat";
function WaterUtilityDetail() {
  const location = useLocation();
  const [waterutility, setwaterutility] = useState(location.state.waterUtility && location.state.waterUtility);
  const [waterUtilityList, setWaterUtilityList] = useState(location.state.waterUtilityList && location.state.waterUtilityList);

  const [filterdWaterUtilityList, setfilterdWaterUtilityList] =useState(location.state.waterUtilityList && location.state.waterUtilityList);

  const  [searchParm,setSearchParam]= useState('')

useEffect(()=>{

  setfilterdWaterUtilityList(
  waterUtilityList.filter(waterutility => waterutility.name.toLowerCase().includes(searchParm.toLowerCase()))
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
              <span>Water Utility Detail</span>
            </li>
          </ul>

          <h2 className="page-header__title">Water Utility Detail</h2>
        </div>
      </section>
      <section className="sec-pad-top sec-pad-bottom blog-details">
        <div className="container">
          <div className="row gutter-y-60">
            <div className="col-lg-12">
              <div className="blog-details__content clearfix">
                <div className="row">
                  <div className="blog-details__image col-lg-4" style={{ boxShadow: " 5px 3px 3px 5px #f0f0f0" }}>
                    <img src={getImage(waterutility.logo)} alt="" />
                    <div className="blog-card__date">
                      <span>{dateformat(waterutility.establisheddate, "d")}</span>
                      {dateformat(waterutility.establisheddate, "mmm")}
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <h3 className="blog-card__title text-center ">{waterutility.name}</h3>
                    <div className="row">
                      <div className="col-6">
                        <ul className="blog-card__meta list-unstyled" style={{ display: "block", marginLeft: "120px" }}>
                          <li>
                            <i className="fa fa-phone"></i>
                            <a href="#">{waterutility.phone}</a>
                          </li>
                          <li>
                            <i className="fa fa-car"></i>
                            <a href="#">{waterutility.kmfromaa} KM from Addis</a>
                          </li>
                          <li>
                            <i className="fa fa-building"></i>
                            <a href="#">{waterutility.regionalWaterFederation.name}</a>
                          </li>
                          <li>
                            <i className="fa fa-users"></i>
                            <a href="#">{waterutility.noemployees} Employees</a>
                          </li>
                          <li>
                            <i className="fa fa-car"></i>
                            <a href="#"> from {waterutility.source}</a>
                          </li>
                          <li >
                            <i className="fa fa-envelope" ></i>
                            <a href="#">{waterutility.webLink}</a>
                          </li>

                        </ul>

                      </div>
                      <div className="col-6">
                        <ul className="blog-card__meta list-unstyled" style={{ display: "block" }}>
                    
                          <li >
                            <i className="fa-solid fa-database" ></i>
                            <a href="#">{waterutility.prodcapa} Production Capacity</a>
                          </li>
                          <li>
                            <i className="fa-solid fa-database" ></i>
                            <a href="#"> {waterutility.purification} Purification Capacity</a>
                          </li>
                          <ul className="blog-card__meta list-unstyled" style={{ display: "block"}}>
                            <li  >
                              <i className="fa fa-bars" ></i>
                              <a href="#">Main System Contains</a>
                            </li>
                            <li className="ms-4">
                              <i className="fa fa-angles-right"></i>
                              <a href="#">{waterutility.distributionkm} KM Distribution</a>
                            </li>
                            <li className="ms-4">
                              <i className="fa fa-angles-right"></i>
                              <a href="#">{waterutility.mainpresure} Main Pressure</a>
                            </li>
                            <li className="ms-4">
                              <i className="fa fa-angles-right"></i>
                              <a href="#">{waterutility.reservwire} Reserve Wire</a>
                            </li>
                          </ul>






                        </ul>

                      </div>


                    </div>


                  </div>
                </div>

                <div className="row">

                  <div className="col-8">

                    <p>
                      {" "}
                      <div
                        dangerouslySetInnerHTML={{ __html: waterutility.description }}
                      ></div>
                    </p>


                  </div>
                  <div className="col-lg-4">
                    <div className="sidebar">
                      <div className="sidebar__single sidebar__single--search">
                        <form action="#">
                          <input type="text" className="searhcInput" value={searchParm} onChange={(e)=>setSearchParam(e.target.value)} placeholder="Search here.." />
                          <button type="submit">
                            <i className="paroti-icon-magnifying-glass"></i>
                          </button>
                        </form>
                      </div>
                      <div className="sidebar__single sidebar__single--posts">
                        <h3 className="sidebar__title text-center">Water Utilitys</h3>
                        <ul className="list-unstyled sidebar__post">
                          {filterdWaterUtilityList.slice(0, 3).map((item, index) => (
                            <li key={index} style={filterdStyle(index)}>
                              <a onClick={()=>setwaterutility(item)}>
                                <img
                                  style={{ maxWidth: "50px" }}
                                  src={getImage(item.logo)}
                                  alt=""
                                />
                                <span className="sidebar__post__meta">
                                  <i className="fa fa-calendar-days"></i>
                                  {item.establisheddate}
                                </span>
                                <span className="sidebar__post__title">{item.name}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>


          </div>
        </div>
      </section>
    </>
  );
}

export default WaterUtilityDetail;
