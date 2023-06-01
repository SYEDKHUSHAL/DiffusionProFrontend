import React from "react";
import { Col, Row } from "antd";


const Footer = ({ backgroundColor = "#121212ab", width = "22%", marginLeft = 0 }: any) => {
  return (
    <>
      <div style={{ padding: 24, backgroundColor: backgroundColor, }}>
        <Row style={{ marginLeft: marginLeft }}>
          <Col xs={22} sm={10} md={10} lg={10} xl={10}>
            <div className="l1">
              <div className="l2">
                <img
                  src={"/assets/person.png"}
                  alt="Khushal Haider Syed"
                  className="l3-image"
                />
              </div>
              <div className="r1">
                <p>
                  <span className="syed-text">
                    Name: Khushal Haider Syed
                  </span>
                  <br />
                  <span className="syed-text">
                    Student ID: 5035190120
                  </span>
                </p>
              </div>
            </div>
          </Col>

          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <div style={{ textAlign: "center", marginLeft: "50%" }}>
              <a href="https://github.com/SYEDKHUSHAL/diffusionProApi">
                <img
                  height={50}
                  src={"/assets/GitHub-Mark.png"}
                  alt="github"
                  className="git-logo"
                />
              </a>

              <a href="mailto:sayedkhushal007@gmail.com">
                <img
                  height={50}
                  src={"/assets/email-1.png"}
                  alt="email"
                  className="email-logo"
                />
              </a>
            </div>
          </Col>

          <Col xs={22} sm={10} md={10} lg={10} xl={10}>
            <div className="uni-1">
              <div>
                <img
                  src={"/assets/jiangnan-university-logo.png"}
                  alt="jiangnan-university"
                  className="uni-1-image"
                  style={{
                    width,
                  }}
                />
              </div>

              <br />

              <div className="image-footer-text">
                <span className="university-text">
                  School of Artificial Intelligence and Computer
                  Science
                </span>
                <br />
                <span className="university-text">
                  Jiangnan University
                </span>
                <br />
                <span className="university-text">
                  Address: No. 1800, Lihu Avenue, Wuxi, 214122, P. R.
                  China
                </span>
                <br />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Footer;