import React, { useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryCard from './card';
import useAxios from '@@~/hooks/useAxios'




interface ICategoryProps {
}

const Category: React.FunctionComponent<ICategoryProps> = (props) => {

    const { response , isLoading, error } = useAxios({
        method: 'get',
        url: 'http://localhost:8000/api/categories'
    })

    
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
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,

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
            {isLoading ? "loadig " : <Slider {...settings}>
                {response.map((val : any, key : number) => (
                    <div key={key}>
                        <CategoryCard name={val.name} image={val.image} />
                    </div>
                ))}
            </Slider>}

        </>
    );
};

export default Category;
