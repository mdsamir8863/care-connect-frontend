import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
const Hero = ({ title }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            Welcome to Care Connect, where your health and
            well-being are our top priorities. Our state-of-the-art facility is
            staffed by a team of dedicated professionals who are committed to
            providing you with the highest quality care. We understand that each
            patient is unique, which is why we tailor our services to meet your
            individual needs. Whether you're in need of routine care or facing a
            more complex medical issue, we're here to guide you on your journey
            to optimal health and wellness.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "start",
              width: "100%",
            }}
          >
            <Link
              to={"/appointment"}
              style={{
                background: "#48AAAD",
                padding: "10px 20px",
                borderRadius: "10px",
                color: "white",
              }}
              href=""
            >
              Book Your Appointment
            </Link>
            <Link
              to={"/doctors"}
              style={{
                background: "#48AAAD",
                padding: "10px 20px",
                borderRadius: "10px",
                color: "white",
              }}
              href=""
            >
              Doctors
            </Link>
          </div>
        </div>
        <div className="banner">
          <HeroSlider />
        </div>
      </div>
    </>
  );
};

export default Hero;
