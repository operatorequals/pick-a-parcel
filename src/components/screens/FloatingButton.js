import React, { useState, useEffect } from 'react';
import './FloatingButton.css';

import menuIcon from './assets/img/menu.svg'

export const FloatingButton = ({onClick, className, content}) => {
    const [position, setPosition] = useState({ top: 10, left: 10 });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffset({ x: e.clientX - position.left, y: e.clientY - position.top });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            requestAnimationFrame(() => {
                setPosition({
                    top: e.clientY - offset.y,
                    left: e.clientX - offset.x,
                });
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        // Attach mousemove and mouseup event listeners to the window
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

// change svg color:
// https://stackoverflow.com/questions/54519654/how-do-i-add-color-to-my-svg-image-in-react
// stroke='green'

    className = className === undefined ? "" : className
    return (
        <div
            className={`floating-button ${className} floating-button-size`}
            style={
                {
                    top: `${position.top}px` , left: `${position.left}px`,

                    backgroundImage: `url(${menuIcon})`,
                    backgroundRepeat: `no-repeat`,
                    backgroundPosition: `center`,
                    backgroundSize: `6em`,
                }
            }
            onMouseDown={handleMouseDown}
            onClick={onClick}
        >{content}</div>
    );
};

export default FloatingButton;