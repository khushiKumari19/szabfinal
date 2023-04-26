import React, { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCarDetailsById } from "../../Actions/Car.actions";
import { addToCart } from "../../Actions/cart.actions";
import Header from "../../Components/Header/Header";
import Carousel from "react-bootstrap/Carousel";
import Slider from "react-slick";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";
const CarDetails = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slide: 1,
    scrollslide: 1,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const car = useSelector((state) => state.car);
  const { carId } = useParams();
  console.log(car, "car", carId);
  useEffect(() => {
    const payload = {
      params: {
        carId,
      },
    };
    dispatch(getCarDetailsById(payload));
  }, []);

  return (
    <Header>
      <div class="product-page">
  <div class="product-page__left-column">
    <div class="product-page__image-container">
    <Slider {...settings}>
            {car?.carDetails?.carPictures?.map((pic) => (
              <img
                className="imgInCarDetails"
                src={generatePublicUrl(pic.img)}
              />
            ))}
          </Slider>
    </div>
    <div class="product-page__thumbnails-container">
    {car?.carDetails?.carPictures?.map((pic) => (
              <img
                className="imgInCarDetails"
                src={generatePublicUrl(pic.img)}
              />
            ))} 
      
    </div>
  </div>
  <div class="product-page__right-column">
    <h1 class="product-page__title">{car?.carDetails.name}</h1>
    <p class="product-page__price">PKR {car?.carDetails.totalPrice}</p>
    <p class="product-page__description">This {car?.carDetails.color} {car?.carDetails.model} from {car?.carDetails.company} is a perfect choice for those looking for a reliable and fuel-efficient vehicle. The {car?.carDetails.engine} engine is powerful and responsive, providing a smooth ride and plenty of acceleration when needed. With a total price of ${car?.carDetails.totalPrice} and a token price of ${car?.carDetails.tokenPrice}, this car offers excellent value for money. </p>
    <div>
        <button type="button" className="button1"
            onClick={() => {
              const { _id, name, totalPrice, tokenPrice } = car?.carDetails;
              const img = car?.carDetails?.carPictures[0]?.img;
              dispatch(addToCart({ _id, name, totalPrice, tokenPrice, img }));
              navigate("/cart");
            }}
          >
            Add To Cart
          </button>
        </div>
  </div>
</div>

    </Header>
  );
};

export default CarDetails;