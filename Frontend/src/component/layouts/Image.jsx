import React from 'react';

const Image = ({className,src,alt}) => {
    return (
        <picture>
             <img src={src} alt={alt}  className={className}/>  
        </picture>
    );
};

export default Image;