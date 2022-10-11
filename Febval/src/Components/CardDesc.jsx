import React from "react";
import "../Scss/description.scss";
import { Container, Row, Col } from "react-bootstrap";

const CardDesc = () => {
  const imgs = document.querySelectorAll(".img-select a");
  const imgBtns = [...imgs];
  let imgId = 1;

  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener("click", (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });

  function slideImage() {
    const displayWidth = document.querySelector(
      ".img-showcase img:first-child"
    ).clientWidth;

    document.querySelector(".img-showcase").style.transform = `translateX(${
      -(imgId - 1) * displayWidth
    }px)`;
  }

  window.addEventListener("resize", slideImage);
  return (
    <>
      <Container className="desc-container">
        <Row>
          <div className="card-wrapper">
            <div className="desc-card">
              <Col>
                <div className="product-imgs">
                  <div className="img-display">
                    <div className="img-showcase">
                      <img
                        src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg"
                        alt="shoe "
                      />
                      <img
                        src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg"
                        alt="shoe "
                      />
                      <img
                        src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg"
                        alt="shoe "
                      />
                      <img
                        src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg"
                        alt="shoe "
                      />
                    </div>
                  </div>
                  <div className="img-select">
                    <div className="img-item">
                      <a href="#" data-id="1">
                        <img
                          src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg"
                          alt="shoe "
                        />
                      </a>
                    </div>
                    <div className="img-item">
                      <a href="#" data-id="2">
                        <img
                          src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg"
                          alt="shoe "
                        />
                      </a>
                    </div>
                    <div className="img-item">
                      <a href="#" data-id="3">
                        <img
                          src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg"
                          alt="shoe "
                        />
                      </a>
                    </div>
                    <div className="img-item">
                      <a href="#" data-id="4">
                        <img src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg"
                          alt="shoe "/>
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="product-content">
                  <h2 className="product-title">nike shoes</h2>
                  <a href="#" className="product-link">
                    visit nike store
                  </a>
                

                  <div className="product-price">
                    <p className="last-price">
                      Old Price: <span>$257.00</span>
                    </p>
                    <p className="new-price">
                      New Price: <span>$249.00 (5%)</span>
                    </p>
                  </div>

                  <div className="product-detail">
                    <h2>about this item: </h2>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Illo eveniet veniam tempora fuga tenetur placeat sapiente
                      architecto illum soluta consequuntur, aspernatur quidem at
                      sequi ipsa!
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consequatur, perferendis eius. Dignissimos, labore
                      suscipit. Unde.
                    </p>
                  
                    
                  </div>

                  <div className="purchase-info">
                   
                  </div>
                </div>
              </Col>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CardDesc;
