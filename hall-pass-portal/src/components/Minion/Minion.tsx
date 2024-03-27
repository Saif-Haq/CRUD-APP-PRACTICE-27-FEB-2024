import React, { useEffect } from "react";
import "./Minion.css";
import minion from "../../assets/minion.png";
import eye from "../../assets/eye.png";

interface MinionProps {
  id: string;
}

const Minion: React.FC<MinionProps> = ({ id }) => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // console.log(e);
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const anchor = document.getElementById(`anchor-${id}`);
      const rect = anchor && anchor.getBoundingClientRect();

      const anchorX = rect && rect.left + rect.width / 2;
      const anchorY = rect && rect.top + rect.height / 2;

      if (anchor) {
        const angleDeg = angle(mouseX, mouseY, anchorX || 0, anchorY || 0);
        // console.log(angleDeg);

        const eyes = document.querySelectorAll(`.eye-${id}`);
        eyes.forEach((eye) => {
          if (eye instanceof HTMLElement && eye.style)
            eye.style.transform = `rotate(${90 + angleDeg}deg)`;
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [id]); // Add id to the dependency array

  function angle(cx: number, cy: number, ex: number, ey: number): number {
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    const deg = (rad * 180) / Math.PI;
    return deg;
  }

  return (
    <div className="minion-body">
      <main>
        <img
          id={`anchor-${id}`}
          src={minion}
          alt="Minion"
        />
        <div id={`eyes`}>
          <img
            className={`eye eye-${id}`}
            src={eye}
            style={{ bottom: "132px", right: "132px" }}
            alt="Eye"
            key={`eye1-${id}`}
          />
          <img
            className={`eye eye-${id}`}
            src={eye}
            style={{ bottom: "132px", right: "-100px" }}
            alt="Eye"
            key={`eye2-${id}`}
          />
        </div>
      </main>
    </div>
  );
};

export default Minion;