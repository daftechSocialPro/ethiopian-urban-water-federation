import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import axios from "axios";
import { useState } from "react";
import { assetUrl, urlForum, urlNews } from "../endpoints";
import dateformat from "dateformat";
import { useEffect } from "react";
import DOMPurify from "dompurify";
import {useTranslation} from 'react-i18next'

function Home() {

  const {t}  = useTranslation()


  const option3 = {
    items: 1,
    margin: 0,
    autoplay: false,
    nav: false,
    dots: false,
    loop: false,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
        margin: 30,
      },
    },
  };
  const option4 = {
    loop: true,
    autoplay: true,
    items: 1,
    dots: false,

    gutter: 0,
    mouseDrag: true,
    touch: "true",
    nav: true,

    controls: false,
    responsive: {
      0: {
        items: 1,
        gutter: 0,
      },
      576: {
        items: 1,
        gutter: 0,
      },
      768: {
        items: 2,
        gutter: 30,
      },
      992: {
        items: 2,
        //"gutter": 30,
        margin: 30,
      },
      1200: {
        items: 3,
        gutter: 30,
        margin: 10,
      },
    },
  };

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

  const [news, setNews] = useState([]);
  const [forum, setForum] = useState([]);

  useEffect(() => {
    axios
      .get(urlNews)
      .then((res) => setNews(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(urlForum)
      .then((res) => setForum(res.data))
      .catch((err) => console.error(err));
  }, []);

  const getImage = (item) => {
    return `${assetUrl}/${item}`;
  };

  return (
    <>
      <section
        className="slider-one slider-two"
        style={
          {
            // backgroundImage: "url(/assets/images/shapes/s2.png);",
          }
        }
      >
        <OwlCarousel
          className="owl-theme"
          items="1"
          autoplay
          nav
          dots
          loop
          autoplaytimeout="7000"
          animateIn="fadeIn"
          animateOut="slideOutDown"
        >
          <div className="item">
            <div className="slider-one__item">
              <div
                className="slider-one__image"
                style={{
                  backgroundImage: "url(/assets/images/backgrounds/1.jpeg)",
                }}
              ></div>

              <div className="container">
                <p className="slider-one__text"> Ethiopian Urban Water </p>

                <h2 className="slider-one__title">Federation</h2>
                <div className="slider-one__btns">
                  <a href="about.html" className="thm-btn slider-one__btn">
                    <span>{t("welcome.4")}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="slider-one__item">
              <div
                className="slider-one__image"
                style={{
                  backgroundImage: "url(/assets/images/backgrounds/2.jpeg)",
                }}
              ></div>

              <div className="container">
                <p className="slider-one__text">    Ethiopian Urban Water </p>

                <h2 className="slider-one__title">Federation</h2>
                <div className="slider-one__btns">
                  <a href="about.html" className="thm-btn slider-one__btn">
                    <span>{t("welcome.4")}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="slider-one__item">
              <div
                className="slider-one__image"
                style={{
                  backgroundImage: "url(/assets/images/backgrounds/4.jpeg)",
                }}
              ></div>

              <div className="container">
                <p className="slider-one__text">Ethiopian Urban Water </p>

                <h2 className="slider-one__title">Federation</h2>
                <div className="slider-one__btns">
                  <a href="about.html" className="thm-btn slider-one__btn">
                    <span>{t("welcome.4")}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </OwlCarousel>
      </section>

      <section className="sec-pad-top sec-pad-bottom about-two">
        <img
          src="/assets/images/shapes/about-4-1.png"
          className="about-two__shape-1 float-bob-x"
          alt=""
        />
        <div className="container">
          <div className="row gutter-y-60">
            <div className="col-md-12 col-lg-6">
              <div className="about-two__image">
                <div className="about-two__image__shape-1"></div>
                <div className="about-two__image__shape-2"></div>
                <div className="about-two__image__shape-3"></div>
                <img
                  src="/assets/images/resources/4.png"
                  className="wow fadeInLeft"
                  data-wow-duration="1500ms"
                  alt=""
                />
                <div className="about-two__image__caption">
                  <h3 className="about-two__image__caption__count count-box">
                    <span
                      className="count-text"
                      data-stop="30"
                      data-speed="1500"
                    ></span>
                    +100
                  </h3>
                  <p className="about-two__image__caption__text">
                  {t("welcome.5")}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="about-two__content">
                <div className="sec-title">
                  <p className="sec-title__tagline">
                  {t("welcome.1")}
                  </p>
                  <h2 className="sec-title__title">{t("whoweare.1")}</h2>
                </div>
                <p className="about-two__text">
                 {t("welcome.2")}
                </p>
                <p className="about-two__text mt-3">
                {t("welcome.3")}
                </p>

                <div className="about-two__btns mt-4">
                  <a href="about.html" className="thm-btn about-two__btn">
                    <span> {t("welcome.4")}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-pad-top sec-pad-bottom donation-two">
        <div className="container">
          <div className="row gutter-y-60">
            <div className="col-md-12 col-lg-4">
              <div className="sec-title">
                <p className="sec-title__tagline">Change everything</p>
                <h2 className="sec-title__title">OUR VISSION</h2>
              </div>
              <p className="donation-two__text">
                To become the first and competent association in east Africa by
                providing support for water supply and Sanitation Utilities
                through capacity building and provide training on new
                technologies that will lead Water utilities for an outstanding
                performance.
              </p>
            </div>
            <div className="col-md-12 col-lg-8">
              <OwlCarousel className="owl-theme " {...option3}>
                <div className="item">
                  <div className="donation-card-two">
                    <div className="donation-card-two__bg"></div>
                    <h3 className="donation-card-two__title">
                      <a href="donation-details.html">Core Values</a>
                    </h3>

                    <ul className="list-unstyled about-two__list donation-card-two__title ">
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Act with Integrity.
                      </li>
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Strive for Excellence.
                      </li>
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Move for Innovations.
                      </li>
                    </ul>

                    <a href="donation-details.html">
                      <i className="fa fa-angle-double-right donation-card-two__link"></i>
                    </a>

                    <div className="donation-card-two__shape"></div>
                  </div>
                </div>
                <div className="item">
                  <div
                    className="donation-card-two"
                    style={{ accentColor: "#fdbe44" }}
                  >
                    <div className="donation-card-two__bg"></div>
                    <h3 className="donation-card-two__title">
                      <a href="donation-details.html">Objectives</a>
                    </h3>

                    <ul className="list-unstyled about-two__list">
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Enhance the capacity of the EWF.
                      </li>
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Ensure the financial sustainability of the Ethiopian
                        Water Federation.
                      </li>
                      <li>
                        <i className="fa fa-check-circle"></i>
                        Promote members’ interests and create opportunities for
                        their development.
                      </li>
                    </ul>

                    <a href="donation-details.html">
                      <i className="fa fa-angle-double-right donation-card-two__link"></i>
                    </a>
                    <div className="donation-card-two__shape"></div>
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-pad-top sec-pad-bottom cta-one">
        <div
          className="cta-one__bg"
          style={{ backgroundImage: "url(/assets/images/backgrounds/4.jpeg)" }}
        ></div>
        <div
          className="cta-one__shape"
          style={{ backgroundImage: "url(/assets/images/shapes/pink.png)" }}
        ></div>

        <div className="container  text-center">
          <div className="sec-title">
            <p className="sec-title__tagline">
              We’re here to support poor people
            </p>
            <h2 className="sec-title__title">
              Fundraising for the people and <br />
              <span>causes</span> you care about
            </h2>
          </div>
          <a href="donations.html" className="thm-btn cta-one__btn">
            <span>Start donating them</span>
          </a>
        </div>
      </section>

      <section className="sec-pad-top sec-pad-bottom">
        <div className="container">
          <div className="sec-title ">
            <p className="sec-title__tagline">Ethiopian Water Federation</p>
            <h2 className="sec-title__title">Events & Forums</h2>
          </div>

          <div className="donations-carousel">
            <OwlCarousel className="owl-theme " {...option4}>
              {forum.map((item, index) => (
                <div className="item" key={index}>
                  <div className="donations-card">
                    <div className="donations-card__image">
                      <img src={getImage(item.img)} alt="" />
                      <div className="donations-card__category">
                        <a href="#">
                          {item.isForumEvent === 1 ? "Events" : "Forums"}
                        </a>
                      </div>
                    </div>
                    <div className="donations-card__content">
                      <h3 className="donations-card__title">
                        <a href="donations-details.html">{item.title}</a>
                      </h3>
                      <p className="donations-card__text"
                          dangerouslySetInnerHTML={{
                            __html: `${DOMPurify.sanitize(
                              item.description
                            ).slice(0, 100)}...`,
                          }}
                        >
                      </p>

                      <div className="donations-card__amount">
                        <p>
                          <span>{dateformat(item.createdAt, "mmm dS")}</span>
                        </p>
                        <p></p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </section>
      <section className="newsletter-one">
        <div
          className="newsletter-one__bg"
          style={{
            backgroundImage: "url(/assets/images/backgrounds/hero.jpg)",
          }}
        ></div>

        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="sec-title">
                <p className="sec-title__tagline">
                  Ethiopain Urban Water Federation
                </p>
                <h2 className="sec-title__title">
                  Subscibe to our <br /> News letter
                </h2>
              </div>
              <form action="#" className="mc-form newsletter-one__form">
                <input type="email" placeholder="Your email" />
                <button type="submit" className="newsletter-one__form__btn">
                  Subscribe
                </button>
              </form>
              <div className="mc-response"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-pad-top sec-pad-bottom">
        <div className="container">
          <div className="sec-title text-center">
            <p className="sec-title__tagline">Watch our latest blogs</p>
            <h2 className="sec-title__title">Latest news & articles</h2>
          </div>
          <div className="blog-carousel">
            <OwlCarousel className="owl-theme" {...option4}>
              {news.map((item, index) => (
                <div key={index} className="item">
                  <div className="blog-card">
                    <div className="blog-card__image">
                      <img src={getImage(item.img)} alt="" />
                      <div className="blog-card__date">
                      <span>{dateformat(item.createdAt,"d")}</span>{dateformat(item.createdAt,"mmm")}
                      </div>
                    </div>
                    <div className="blog-card__content">
                      <ul className="blog-card__meta list-unstyled">
                        <li>
                          <i className="fa fa-user"></i>
                          <a href="#">{item.waterFederation.fullName}</a>
                        </li>
                        <li>
                          <i className="fa fa-comments"></i>
                          <a href="#">02 comments</a>
                        </li>
                      </ul>
                      <h3 className="blog-card__title">
                        <a href="blog-details.html">{item.title}</a>
                      </h3>
                        <p className="donations-card__text"
                          dangerouslySetInnerHTML={{
                            __html: `${DOMPurify.sanitize(
                              item.description
                            ).slice(0, 100)}...`,
                          }}
                        >
                      </p>
                      <a href="blog-details.html" className="blog-card__links">
                        <i className="fa fa-angle-double-right"></i>
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </section>

      <section className="testimonials-two">
        <div
          className="testimonials-two__bg"
          style={{
            backgroundImage: "url(/assets/images/backgrounds/1.jpg)",
          }}
        ></div>

        <div className="container">
          <div
            className="swiper-container testimonials-two__thumb"
            id="testimonials-two__thumb"
          >
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <img
                  src="/assets/images/testimonals/muktar.png"
                  style={{ width: "60px", height: "60px" }}
                />
              </div>
              <div className="swiper-slide">
                <img
                  src="/assets/images/testimonals/daniel.png"
                  style={{ width: "60px", height: "60px" }}
                />
              </div>
            </div>{" "}
          </div>
          <div
            className="swiper-container testimonials-two__carousel"
            id="testimonials-two__carousel"
          >
            <div className="swiper-wrapper">
              <OwlCarousel className="owl-theme " items={1}>
                <div className="swiper-slide">
                  <div className="testimonials-two__card">
                    <div className="testimonials-two__card__image">
                      <img
                        src="/assets/images/testimonals/muktar.png"
                        style={{
                          borderRadius: "50%",
                          width: "200px",
                          height: "200px",
                        }}
                        alt=""
                      />
                    </div>
                    <div className="testimonials-two__card__content">
                      <p className="testimonials-two__card__text">
                        It is an honor to support and empower Ethiopian water
                        supply and sanitation enterprises in their efforts to
                        improve water supply and sanitation services. We are
                        committed to providing exceptional assistance to
                        Ethiopia's water utilities as they strive to provide
                        sustainable, efficient, and effective water supply and
                        sanitation services and become competent utilities in
                        East Africa. We will do this through capacity building,
                        networking, and creating a platform for sharing best
                        practices among the utilities.
                      </p>
                      <h3 className="testimonials-two__card__title">
                        Muktar Ahmed
                      </h3>

                      <span className="testimonials-two__card__designation">
                        Director General of EUWF
                      </span>
                    </div>
                    <i className="paroti-icon-quote testimonials-two__card__icon"></i>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonials-two__card">
                    <div className="testimonials-two__card__image">
                      <img
                        src="/assets/images/testimonals/daniel.png"
                        style={{
                          borderRadius: "50%",
                          width: "200px",
                          height: "200px",
                        }}
                        alt=""
                      />
                    </div>
                    <div className="testimonials-two__card__content">
                      <p className="testimonials-two__card__text">
                        VEI implements peer supported partnerships between water
                        operators worldwide, aiming to share knowledge and
                        skills to make the utilities stronger, healthier, and
                        more resilient. We believe that everybody in the world
                        deserves proper, adequate, and sustainable water
                        services delivery.
                      </p>
                      <h3 className="testimonials-two__card__title">
                        Daniel Truneh
                      </h3>

                      <span className="testimonials-two__card__designation">
                        VEI REGIONAL DIRECTOR , EAST AND NORHERN AFRICA
                      </span>
                    </div>
                    <i className="paroti-icon-quote testimonials-two__card__icon"></i>
                  </div>
                </div>
              </OwlCarousel>
            </div>
            <div id="testimonials-two__carousel-pagination"></div>
          </div>
        </div>
      </section>

      <section className="sec-pad-top sec-pad-bottom sponsor-carousel sponsor-carousel--home-2">
        <div className="container">
          <OwlCarousel className="owl-theme " {...option6}>
            <div className="item">
              <img src="/assets/images/partner/s1.png" alt="" />
            </div>
            <div className="item">
              <img src="/assets/images/partner/s2.png" alt="" />
            </div>{" "}
            <div className="item">
              <img src="/assets/images/partner/s3.png" alt="" />
            </div>{" "}
            <div className="item">
              <img src="/assets/images/partner/s4.png" alt="" />
            </div>{" "}
            <div className="item">
              <img src="/assets/images/partner/s5.png" alt="" />
            </div>{" "}
            <div className="item">
              <img src="/assets/images/partner/s6.png" alt="" />
            </div>{" "}
            <div className="item">
              <img src="/assets/images/partner/s7.png" alt="" />
            </div>{" "}
            <div className="item">
              <img src="/assets/images/partner/s8.png" alt="" />
            </div>{" "}
            <div className="item">
              <img src="/assets/images/partner/s9.png" alt="" />
            </div>
            <div className="item">
              <img src="/assets/images/partner/s10.png" alt="" />
            </div>
            <div className="item">
              <img src="/assets/images/partner/s11.png" alt="" />
            </div>
            <div className="item">
              <img src="/assets/images/partner/s12.png" alt="" />
            </div>
            <div className="item">
              <img src="/assets/images/partner/s13.png" alt="" />
            </div>{" "}
            <div className="item">
              <img src="/assets/images/partner/s14.png" alt="" />
            </div>
          </OwlCarousel>
        </div>
      </section>
    </>
  );
}

export default Home;
