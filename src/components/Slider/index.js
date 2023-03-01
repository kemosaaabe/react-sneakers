import React from 'react';
import './Slider.scss';
import dataSlider from './dataSlider';
import BtnSlider from './BtnSlider';

function Slider() {
    const [slideIndex, setSLideIndex] = React.useState(1);

    const nextSlide = () => {
        if (slideIndex !== dataSlider.length) {
            setSLideIndex(slideIndex + 1);
        } else if (slideIndex === dataSlider.length) {
            setSLideIndex(1);
        }
    };

    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSLideIndex(slideIndex - 1);
        } else if (slideIndex === 1) {
            setSLideIndex(dataSlider.length);
        }
    };

    return (
        <div className="containerSlider">
            {dataSlider.map((obj, index) => {
                return (
                    <div
                        className={
                            slideIndex === index + 1
                                ? 'slide activeAnim'
                                : 'slide'
                        }
                        key={obj.id}
                    >
                        <img src={`img/carousel/${index + 1}.jpg`} alt="" />
                    </div>
                );
            })}
            <BtnSlider moveSlide={nextSlide} direction="next" />
            <BtnSlider moveSlide={prevSlide} direction="prev" />
        </div>
    );
}

export default Slider;
