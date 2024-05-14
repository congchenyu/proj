import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './CarouselComponent.css';

const CarouselComponent = ({ slides }) => {
    const carouselRef = useRef(null);
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

    const captureElement = async (element) => {
        const canvas = await html2canvas(element);
        const imageData = canvas.toDataURL('image/png');
        return { imageData, width: canvas.width, height: canvas.height };
    };

    const handleDownloadPDF = async (element, fileName) => {
        if (!element) {
            console.error("Element to capture not found!");
            return;
        }
        const { imageData, width, height } = await captureElement(element);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const ratio = Math.min(pdfWidth / width, pdfHeight / height);
        const imgWidth = width * ratio;
        const imgHeight = height * ratio;
        const imgX = (pdfWidth - imgWidth) / 2;
        const imgY = (pdfHeight - imgHeight) / 2;
        pdf.addImage(imageData, 'PNG', imgX, imgY, imgWidth, imgHeight);
        pdf.save(fileName);
    };

    const downloadCurrentSlidePdf = () => {
        console.log("Download current slide button clicked.");
        const element = carouselRef.current.querySelector('.slick-active');
        if (!element) {
            console.error("Active slide not found!");
            return;
        }
        handleDownloadPDF(element, 'current-slide.pdf');
    };

    const downloadPdf = async () => {
        console.log("Download all slides button clicked.");
        if (!carouselRef.current) {
            console.error("Carousel reference not found!");
            return;
        }
        const pdf = new jsPDF('p', 'mm', 'a4');
        for (let i = 0; i < slides.length; i++) {
            const element = carouselRef.current.querySelector(`.slick-slide[data-index="${i}"]`);
            if (!element) {
                console.error(`Slide ${i} not found!`);
                continue;
            }
            const { imageData, width, height } = await captureElement(element);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const ratio = Math.min(pdfWidth / width, pdfHeight / height);
            const imgWidth = width * ratio;
            const imgHeight = height * ratio;
            const imgX = (pdfWidth - imgWidth) / 2;
            const imgY = (pdfHeight - imgHeight) / 2;
            if (i > 0) {
                pdf.addPage();
            }
            pdf.addImage(imageData, 'PNG', imgX, imgY, imgWidth, imgHeight);
        }
        pdf.save('all-slides.pdf');
    };

    return (
        <div className="carousel-container" ref={carouselRef}>
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className={`slide ${index !== 0 ? "common-background" : ""}`} data-index={index}>
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
