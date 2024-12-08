
import React from 'react';
import './page.module.css';

const ImageContainer = ({ src, alt, overlayText }) => {
    return (
        <div className="image-container">
            <img src={src} alt={alt} />
            <div className="overlay-text">{overlayText}</div>
        </div>
    );
};

export default ImageContainer;