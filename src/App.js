import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

    const [degrees, setDegrees] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(1);

    const startRotation = () => {
        setInterval(() => {
            setDegrees((prevDegrees) => prevDegrees + 45);
            setCurrentIndex((prevIndex) => (prevIndex % 8)  + 1);
        }, 3000); // Réglez l'intervalle de rotation ici (2 secondes dans cet exemple)
    };

    useEffect(() => {
        startRotation();
        return () => clearInterval(startRotation);
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
                {Array.from({ length: 8 }).map((_, i) => (
                    <span
                        key={i}
                        style={{ '--i': ((i + currentIndex - 1) % 8) + 1 }}
                    >
                        <img
                            src={`./images/img${((i + currentIndex - 1) % 8) + 1}.png`}
                            alt="tableau abstrait"
                        />
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
