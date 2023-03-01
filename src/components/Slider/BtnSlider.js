import React from 'react';
import './Slider.scss';

export default function BtnSlider({ direction, moveSlide }) {
    return (
        <div
            className={direction === 'next' ? 'btnSlide next' : 'btnSlide prev'}
            onClick={moveSlide}
        >
            <img
                src={
                    direction === 'next'
                        ? 'img/right-arrow.svg'
                        : 'img/left-arrow.svg'
                }
                alt=""
            />
        </div>
    );
}
