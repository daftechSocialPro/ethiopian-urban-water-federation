import React, { useState, useEffect } from "react";
import axios from "axios";
import { assetUrl, urlresearch } from "../endpoints";
import dateFormat from "dateformat";
function Researches() {
  const [research, setresearch] = useState([]);

  const getImage = (item) => {
    return `${assetUrl}/${item}`;
  };

  useEffect(() => {
    axios
      .get(urlresearch)
      .then((res) => {
        setresearch(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
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
              <span>Publications</span>
            </li>
          </ul>

          <h2 className="page-header__title">Publications</h2>
        </div>
      </section>

      <section className="sec-pad-top sec-pad-bottom blog-details">
        <div className="container">
          <div className="row gutter-y-60">
            <div className="col-lg-8">
              <div className="blog-details__comments">
                <h3 className="blog-details__sec__title">
                  {research.length} Publications
                </h3>
                <ul className="list-unstyled blog-details__comments__list">
                  {research.map((item, index) => (
                    <li key={index}>
                      <img
                        src={getImage(item.authorImagePath)}
                        style={{ maxWidth: "120px" }}
                        alt=""
                      />
                      <div className="blog-details__comments__meta">
                        <h3 className="blog-details__comments__name">
                          {item.author} {`(${item.title})`}
                        </h3>
                        <p className="blog-details__comments__date">
                          {dateFormat(item.publishedAt, "d mmm , yyyy")}
                        </p>
                      </div>
                      <p
                        className="blog-details__comments__text"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>

                      <a
                        target="_blank"
                        href={getImage(item.researchFilePath)}
                        className="thm-btn blog-details__comments__btn"
                      >
                        <span>Download</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sidebar">
                <div className="sidebar__single sidebar__single--search">
                  <form action="#">
                    <input type="text" placeholder="Search here.." />
                    <button type="submit">
                      <i className="paroti-icon-magnifying-glass"></i>
                    </button>
                  </form>
                </div>
                <div className="sidebar__single sidebar__single--posts">
                  <h3 className="sidebar__title">Recent posts</h3>
                  <ul className="list-unstyled sidebar__post">
                    {research.slice(0, 4).map((item, index) => (
                      <li key={index}>
                        <a href="#">
                          <img
                            style={{ maxWidth: "50px" }}
                            src={getImage(item.authorImagePath)}
                            alt=""
                          />
                          <span className="sidebar__post__meta">
                            {item.author}
                          </span>
                          <span className="sidebar__post__title">
                            {item.title}
                          </span>
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

export default Researches;
