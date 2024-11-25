import React from 'react';
import Image from './Image';

const Flex = ({className,children}) => {
    return (
        <div className={`flex ${className}`}>
            {children}
            
        </div>
    );
};

export default Flex;