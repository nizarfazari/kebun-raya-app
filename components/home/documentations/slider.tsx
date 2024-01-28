import * as React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardDocumentions from './card';


interface ISliderDocumentationsProps {
}

const SliderDocumentations: React.FunctionComponent<ISliderDocumentationsProps> = (props) => {
    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
       
    };
    return (
        <>
            <Slider {...settings}>
                <div>
                    <CardDocumentions />
                </div>
                <div>
                    <CardDocumentions />
                </div>
                <div>
                    <CardDocumentions />
                </div>
                <div>
                    <CardDocumentions />
                </div>
            </Slider>
        </>
    );
};

export default SliderDocumentations;
