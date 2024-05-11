import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { jsPDF } from 'jspdf';
import './CarouselComponent.css';

const CarouselComponent = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        afterChange: current => setCurrentSlide(current)
    };

    const addWrappedText = (text, doc, x, y, maxWidth, lineHeight) => {
        const words = text.split(" ");
        let line = "";
        let newY = y;

        words.forEach((word) => {
            const testLine = line + word + " ";
            const metrics = doc.getTextDimensions(testLine);
            if (metrics.w > maxWidth) {
                doc.text(line, x, newY);
                line = word + " ";
                newY += lineHeight;
            } else {
                line = testLine;
            }
        });

        doc.text(line.trim(), x, newY);
        return newY + lineHeight;
    };

    const downloadCurrentSlidePdf = () => {
        const slide = slides[currentSlide];
        const doc = new jsPDF('p', 'pt', 'a4');
        doc.setFontSize(22);
        doc.text(slide.title, 40, 40);
        let cursorY = 80;

        doc.setFontSize(16);

        if (slide.content) {
            cursorY = addWrappedText(slide.content, doc, 40, cursorY, 520, 20);
        }

        if (slide.image) {
            const imgHeight = 150;  
            const imgWidth = 520;   
            if (cursorY + imgHeight > doc.internal.pageSize.height) {
                doc.addPage();
                cursorY = 40; 
            }
            doc.addImage(slide.image, 'JPEG', 40, cursorY, imgWidth, imgHeight);
        }

        doc.save(`${slide.title}.pdf`);
    };

    const downloadPdf = () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        let cursorY = 40;

        slides.forEach((slide, index) => {
            if (index > 0) {
                doc.addPage();
                cursorY = 40; 
            }
            doc.setFontSize(22);
            doc.text(slide.title, 40, cursorY);
            cursorY += 40;  

            doc.setFontSize(16);
            if (slide.content) {
                cursorY = addWrappedText(slide.content, doc, 40, cursorY, 520, 20) + 20;  
            }

            if (slide.image) {
                doc.addImage(slide.image, 'JPEG', 40, cursorY, 520, 150);
                cursorY += 160;  
            }
        });
        doc.save('carousel-content.pdf');
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className={`slide ${index !== 0 ? "common-background" : ""}`}>
                        <h2 className="title">{slide.title}</h2>
                        {slide.content && slide.content.split('  ').map((paragraph, idx) => (
                            <p key={idx} className="content">{paragraph.trim()}</p>
                        ))}
                        {slide.image && (
                            <img src={slide.image} alt="Slide Image" className="image" />
                        )}
                    </div>
                ))}
            </Slider>
            <button onClick={downloadPdf} className="download-btn">Download All as PDF</button>
            <button onClick={downloadCurrentSlidePdf} className="download-cbtn">Download Current as PDF</button>
        </div>
    );
};

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={`${className} next-arrow`} style={{ ...style, display: 'block', background: '#000', zIndex: 25 }} onClick={onClick}>
            Next
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={`${className} prev-arrow`} style={{ ...style, display: 'block', background: '#000', zIndex: 25 }} onClick={onClick}>
            Prev
        </div>
    );
}

export default CarouselComponent; 