import axios from "axios";
import React from "react";

import { useState } from "react";
import { urlContact } from "../endpoints";

import { customToast } from "../components/customToast";
import { useTranslation } from 'react-i18next'


function Contact() {
  const { t } = useTranslation()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();


    const formData = new FormData();

    formData.set("Name", name);
    formData.set("Email", email);
    formData.set("Subject", subject);
    formData.set("Message", message);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    try {
      // setIsLodding(true)
      //   axios.defaults.withCredentials = true;
      axios
        .post(urlContact, formData)
        .then((res) => {
          customToast("message Successfully sent", 0);
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        })
        .catch((err) => {
          alert(err);
          console.error(err);
        });
    } catch (error) {
      //setIsLodding(false)
      customToast(error, 1);
      console.error(error);
    }
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
              <a href="index.html">{t("home.1")}</a>
            </li>
            <li>
              <span>{t("contactus.1")}</span>
            </li>
          </ul>
          <h2 className="page-header__title">{t("contactus.1")}</h2>
        </div>
      </section>
      <section className="contact-info">
        <div className="container">
          <div
            className="contact-info__inner wow fadeInUp"
            data-wow-duration="1500ms"
            style={{
              backgroundImage:
                "url(/assets/images/backgrounds/contact-info-bg-1-1.jpg)",
            }}
          >
            <div className="row gutter-y-30">
              <div className="col-lg-4 col-md-12">
                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    <i className="fas fa-envelope-open"></i>
                  </div>
                  <p className="contact-info__text">
                    <a href="mailto:needhelp@company.com">
                      ahmedmuktar83 @gmail.com
                    </a>
                    <br />
                    <a href="mailto:info@company.com">info@company.com</a>
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    <i className="fa fa-map"></i>
                  </div>
                  <p className="contact-info__text">
                  {t("address.1")} <br />
      
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    <i className="fa fa-mobile"></i>
                  </div>
                  <p className="contact-info__text">
                    <a href="tel:+1(307)776-0608">+ (251) 940-506-880</a>
                    <br />
                    <a href="tel:6668888000">+ (251) 940-506-880</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec-pad-top sec-pad-bottom contact-one">
        <div className="container">
          <div className="row gutter-y-60">
            <div className="col-lg-4">
              <div className="sec-title">
                <p className="sec-title__tagline">Contact with us</p>
                <h2 className="sec-title__title">Love to hear from you</h2>
              </div>
              <p className="contact-one__text">
                Man braid hell of edison bulb four brunch subway tile authentic,
                chillwave put a bird on church-key try-hard ramps heirloom.
              </p>
              <div className="contact-one__social">
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
            <div className="col-lg-8">
              <form
              onSubmit={handleSubmit}
                className="contact-one__form contact-form-validated"
              >
                <div className="row">
                  <div className="col-md-6">
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required  placeholder="Your name" name="name" />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      value={email}
                      required
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder="Email address"
                      name="email"
                    />
                  </div>
                  <div className="col-md-12">
                  <input type="text" value={subject} onChange={(e)=>setSubject(e.target.value)} required  placeholder="Subject" name="name" />
                 
                  </div>
                  <div className="col-md-12">
                    <textarea
                      name="message"
                      placeholder="Write a message"
                      value={message}
                      onChange={(e)=>setMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="thm-btn contact-one__btn">
                      <span>Send message</span>
                    </button>
                  </div>
                </div>
              </form>
              <div className="result"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="google-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4562.753041141002!2d-118.80123790098536!3d34.152323469614075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e82469c2162619%3A0xba03efb7998eef6d!2sCostco+Wholesale!5e0!3m2!1sbn!2sbd!4v1562518641290!5m2!1sbn!2sbd"
          className="google-map__two"
          allowFullScreen
        ></iframe>
      </section>
    </>
 
  );
}

export default Contact;
