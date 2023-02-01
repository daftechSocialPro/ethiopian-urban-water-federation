import React,{useEffect,useState} from "react";
import axios from 'axios'
import { assetUrl, urlboardmember } from "../endpoints";

function BoardMembers() {

  const [boardMember,setBoardMember]= useState([])


  useEffect(() => {
    axios.get(urlboardmember).then((res) =>{ setBoardMember(res.data)
    
  
  })
  }, [])

  const getImage=(item)=>{

    return `${assetUrl}/${item}`
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
              <span>Member Utilities</span>
            </li>
          </ul>

          <h2 className="page-header__title">Member Utilities</h2>
        </div>
      </section>

      Member Utilities
    {/* <main id="main">
      <section className="breadcrumbs">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Our Team</h2>
            <ol>
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>Our Team</li>
            </ol>
          </div>
        </div>
      </section>
      <section
        className="team"
        data-aos="fade-up"
        data-aos-easing="ease-in-out"
        data-aos-duration="500"
      >
        <div className="container">
          <div className="row">


            {boardMember.map((member,index)=>
            <div key={index} className="col-lg-4 col-md-6 d-flex align-items-stretch">
              <div className="member">
                <div className="member-img">
                  <img
                    src={getImage(member.userPhoto)}
                    className="img-fluid"
                    alt=""
                  />
                  <div className="social text-white p-2">
                  {member.position}
                  </div>
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <span>{member.position}</span>
                  <p>
                  <div dangerouslySetInnerHTML={{ __html: member.description }}></div>
                  </p>
                </div>
              </div>
            </div>

            )}
           

          

           
          </div>
        </div>
      </section>
    </main> */}
    </>
  );
}

export default BoardMembers;
