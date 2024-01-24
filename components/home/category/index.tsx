import * as React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryCard from './card';





interface ICategoryProps {
}

const Category: React.FunctionComponent<ICategoryProps> = (props) => {
    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <Slider {...settings}>
                <div>
                    <CategoryCard />
                </div>
                <div>
                    <CategoryCard />
                </div>
                <div>
                    <CategoryCard />
                </div>
                <div>
                    <CategoryCard />
                </div>
                <div>
                    <CategoryCard />
                </div>
                <div>
                    <CategoryCard />
                </div>
                <div>
                    <CategoryCard />
                </div>
                <div>
                    <CategoryCard />
                </div>
            </Slider>
        </>
    );
};

export default Category;
