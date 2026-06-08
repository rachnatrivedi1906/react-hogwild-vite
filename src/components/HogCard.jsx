import React, { useState } from "react";

const HogCard = ({ hog, onHide }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = () => setShowDetails((s) => !s);

  const handleHide = (e) => {
    e.stopPropagation();
    onHide(hog.name);
  };

  return (
    <div
      className="ui card"
      aria-label="hog card"
      onClick={handleToggle}
      style={{ cursor: "pointer" }}
    >
      <div className="image">
        <img src={hog.image} alt={`Photo of ${hog.name}`} />
      </div>
      <div className="content">
        <h3 className="header">{hog.name}</h3>
        {showDetails && (
          <div className="description">
            <p>Specialty: {hog.specialty}</p>
            <p>{hog.weight}</p>
            <p>{hog.greased ? "Greased" : "Nongreased"}</p>
            <p>{hog["highest medal achieved"]}</p>
          </div>
        )}
      </div>
      <div className="extra content">
        <button onClick={handleHide}>Hide Me</button>
      </div>
    </div>
  );
};

export default HogCard;
