import React, { useState, useEffect, useRef, elementRef } from "react";
import "../styles/EventDetails.css";
import Typewriter from "react-typewriter-effect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function EventDetails() {
  const sectionRefs = useRef([]);
  const imageUrls = ["/stock.png", "image2.jpg", "image3.jpg"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const typewriterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 },
    );

    sectionRefs.current.forEach((ref) => observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const startCycling = () => {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        startCycling();
      }, 3000);
    };

    startCycling();

    return () => clearTimeout(timeoutRef.current);
  }, [imageUrls.length]);

  const handleNext = () => {
    clearTimeout(timeoutRef.current);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrev = () => {
    clearTimeout(timeoutRef.current);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length,
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const typewriterWrapper = document.querySelector(".typewriter-wrapper");
    const typewriter = document.querySelector(
      ".typewriter-wrapper .Typewriter",
    );

    if (typewriter && typewriterWrapper) {
      typewriterWrapper.style.width = typewriter.offsetWidth + "px";
    }
  }, []);

  return (
    <div className="event-details">
      <section ref={(el) => (sectionRefs.current[0] = el)} className="hero">
        <div className="event-title-container">
          <h1 className="event-title">
            <div className="title-animation">
              <div className="background-animation">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="cube"></div>
                ))}
              </div>
              {!isMobile ? (
                <span className="typewriter-wrapper" ref={typewriterRef}>
                  <Typewriter
                    textStyle={{
                      fontFamily: "Courier New",
                      fontWeight: "600",
                      fontSize: "4rem",
                      color: "#333",
                      display: "inline-block",
                    }}
                    startDelay={100}
                    cursorColor="orange"
                    multiText={["Solution Challenge 2025"]}
                    typeSpeed={100}
                    loop={true}
                    multiTextLoop={true}
                  />
                </span>
              ) : (
                <span><b>Solution Challenge 2025<b/></span>
              )}
            </div>
          </h1>
        </div>

        <p className="event-tagline">
          <span className="word1">Innovate. </span>
          <span className="word2">Connect. </span>
          <span className="word3">Inspire. </span>
        </p>
      </section>
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="event-description"
      >
        <h2>Innovate for Impact, Code for Change!</h2>
        <p>
          Join the Google Developer Student Clubs (GDSC) Solution Challenge
          2025, where students worldwide come together to build tech solutions
          aligned with the United Nations' 17 Sustainable Development Goals
          (SDGs) using Google technologies. This is your chance to learn, build,
          and make a difference while competing for exciting prizes & global
          recognition. With workshops, mentorship, and a community of
          like-minded developers, you'll have everything you need to bring your
          ideas to life. Whether you're passionate about education, healthcare,
          sustainability, or social impact, this challenge is your opportunity
          to create meaningful solutions.
          <br />
          <br />
          <b>Form a team, start building, and be part of the change! 🚀💙</b>
        </p>
      </section>

      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="event-highlights"
      >
        <h2>Event Highlights</h2>
        <div className="highlights-grid">
          <div className="highlight-item">
            <i className="fas fa-rocket"></i>
            <h3>Visionary Keynotes</h3>
            <p>Be inspired by tech luminaries and industry pioneers</p>
          </div>
          <div className="highlight-item">
            <i className="fas fa-code"></i>
            <h3>Code Labs</h3>
            <p>Hands-on sessions with cutting-edge technologies</p>
          </div>
          <div className="highlight-item">
            <i className="fas fa-network-wired"></i>
            <h3>Tech Nexus</h3>
            <p>Forge connections with peers and industry leaders</p>
          </div>
          <div className="highlight-item">
            <i className="fas fa-lightbulb"></i>
            <h3>Innovation Showcase</h3>
            <p>Witness groundbreaking projects and ideas</p>
          </div>
        </div>
      </section>
      {/* 
      <section ref={(el) => (sectionRefs.current[3] = el)} className="event-info">
        <div className="info-card date-time">
          <h3>Mark Your Calendar</h3>
          <p>October 15, 2023</p>
          <p>9:00 AM - 6:00 PM</p>
        </div>
        <div className="info-card location">
          <h3>Join Us At</h3>
          <p>Manipal University Jaipur</p>
          <p>Dehmi Kalan, Jaipur, Rajasthan</p>
        </div>
      </section>
 */}

      <h2 className="gallery-heading">Event Gallery</h2>
      <div className="container">
        <section className="image-gallery">
          <div className="gallery-container">
            <div
              className="gallery-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {imageUrls.map((imageUrl, index) => (
                <div className="gallery-item" key={index}>
                  <img src={imageUrl} alt={`Image ${index + 1}`} />
                </div>
              ))}
              {imageUrls.map((imageUrl, index) => (
                <div className="gallery-item" key={`duplicate-${index}`}>
                  <img src={imageUrl} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="gallery-controls">
            <button onClick={handlePrev} aria-label="Previous Image">
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            <button onClick={handleNext} aria-label="Next Image">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </section>
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="cta-section"
        >
          <h2>Be Part of the Future</h2>
          <p>
            Secure your spot at the most anticipated tech event of the year!
          </p>
          <button className="register-button">Register Now</button>
        </section>
      </div>
    </div>
  );
}

export default EventDetails;
