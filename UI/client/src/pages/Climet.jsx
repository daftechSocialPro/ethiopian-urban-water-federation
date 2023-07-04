import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import { urlSponsor, assetUrl} from "../endpoints";
import { OrganizationChart } from 'primereact/organizationchart'
import { useTranslation } from 'react-i18next'
import { urlContact } from "../endpoints";
import axios from "axios";

import './styles.css'
function Climet() {
  const [contact, setContact] = useState([])

  useEffect(() => {
    axios
      .get(urlContact)
      .then((res) => {
        console.log(res.data)
        setContact(res.data)
      })
      .catch((err) => console.log(err))
  }, [])
  const getImage = (item) => {
    return `${assetUrl}/${item}`;
  };


  const { t } = useTranslation()

  return (
    <>
      <section
        className="page-header"
        style={{ backgroundImage: "url(/assets/images/backgrounds/111.png)" }}
      >
        <div className="container">
          <ul className="list-unstyled breadcrumb-one">
            <li>
              <a href="index.html"> {t("home.1")}</a>
            </li>
            <li>
              <span>Climate Resilient</span>
            </li>
          </ul>

          <h2 className="page-header__title">Climate Resilient</h2>
        </div>
      </section>
      <section className="sec-pad-top sec-pad-bottom about-one">
        <div className="about-one__shape-1 float-bob-y">
          <img src="/assets/images/shapes/about-1-1.png" alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div
                className="about-one__images wow fadeInLeft"
                data-wow-duration="1500s" >
                <img className="image" src="/assets/images/cli1.jpg"
                   style={{ Width: "555px", height:"329px" }}
                    alt=""
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-one__content" >
                  <h5 className="sec-title__title">Ethiopian Climate Resilience Green Economy </h5>
                <p className="about-one__text">
                Making Ethiopia Middle Income country by 2025 through rapid economic growth that is resilient to climate change & results lowered emissions of carbon & poverty eradication.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div
                className="about-one__images wow fadeInLeft"
                data-wow-duration="1500s" >
                <img className="image" src="/assets/images/cli2.jpg"
                   
                    alt=""
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-one__content">
                  <h5 className="sec-title__title">Climate Change Irregular pattern of rain could have significant impact on:</h5>
                <ul className="list-unstyled about-two__list donation-card-two__title ">
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Hydrological cycle
                      </li>
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Causes problem in maintain water quality
                      </li>
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Causing problems on water infrastructures
                      </li>
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Affecting public health 
                      </li>
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Increase atmospheric concentration of  GHG
                      </li>
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Affects the socio economic development of nations
                      </li>
                    </ul>
      
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div
                className="about-one__images wow fadeInLeft"
                data-wow-duration="1500s" >
                <img className="image" src="/assets/images/cli3.png" style={{ Width: "555px", height:"329px" }}
                    alt=""
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-one__content">
                  <h5 className="sec-title__title">Urgent measures to combat climate change through working on mitigation measures & national adaptation plans</h5>
                <ul className="list-unstyled about-two__list donation-card-two__title ">
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Improving access to portable water 
                      </li>
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Capacity-development trainings,
                      </li>
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Provision of appropriate technologies
                      </li>
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Enforcing appropriate policies
                      </li>
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Improving soil & water harvesting & water retention mechanisms
                      </li>
                    </ul>
      
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
}

export default Climet;
