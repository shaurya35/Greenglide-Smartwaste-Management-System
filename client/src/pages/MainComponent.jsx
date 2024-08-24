import "../styles/MainComponent.css";
import component from "../assets/component.png";

export default function MainComponent() {
  return (
    <>
      <main className="main">
        <div className="main_content">
          <div className="section1">
            <div className="section1_headline outfit">Hi, Folks!</div>
            <div className="section1_headline2 sora">
              Earn Rewards by reporting <br />
              reporting waste
            </div>
            <div className="section1_headline3 outfit">
              Our management offers solutions to users, focusing on Waste
              management with <br /> a special emphasis on utilizing QR codes
              for optimal efficiency.
            </div>
          </div>
          <div className="section2">
            <img className="section2_image" src={component} alt="" />
          </div>
        </div>
      </main>
    </>
  );
}
