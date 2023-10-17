import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [degrees, setDegrees] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [images, setImages] = useState([]);

    const preloadImages = () => {
        const imagePromises = Array.from({ length: 8 }).map((_, i) => {
            const img = new Image();
            const index = ((i + currentIndex - 1) % 8) + 1;
            img.src = `./images/img${index}.png`;
            return img;
        });

        Promise.all(imagePromises).then((loadedImages) => {
            setImages(loadedImages);
        });
    };

    const startRotation = () => {
        const rotationInterval = setInterval(() => {
            setDegrees((prevDegrees) => prevDegrees + 45);
            setCurrentIndex((prevIndex) => (prevIndex % 8) + 1);
        }, 2000); // Réglez l'intervalle de rotation ici (3 secondes dans cet exemple)
        return rotationInterval;
    };

    useEffect(() => {
        preloadImages();
        const rotationInterval = startRotation();
        return () => clearInterval(rotationInterval);
    }, []);

    const handlePrevClick = () => {
        setDegrees((prevDegrees) => prevDegrees + 45);
        setCurrentIndex((prevIndex) => (prevIndex === 1 ? 8 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setDegrees((prevDegrees) => prevDegrees - 45);
        setCurrentIndex((prevIndex) => (prevIndex % 8) + 1);
    };

    return (
        <div className="container">
            <div
                className="box"
                style={{
                    transform: `perspective(1000px) rotateY(${degrees}deg)`,
                }}
            >
                {images.map((img, i) => (
                    <span
                        key={i}
                        style={{ '--i': ((i + currentIndex - 1) % 8) + 1 }}
                    >
                        <img src={img.src} alt="tableau abstrait" />
                    </span>
                ))}
            </div>
            <div className="btns">
                <div className="btn prev" onClick={handlePrevClick}></div>
                <div className="btn next" onClick={handleNextClick}></div>
            </div>
        </div>
    );
}

export default App;
