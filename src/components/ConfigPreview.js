import React from "react";
import "./style.css";

function ConfigPreview({ config }) {
  return (
    <div className="config-item">
      <h3>{`item_id: ${config.item_id}`}</h3>
      {Object.entries(config.data).map(([key, val], i) => (
        <div key={i} className="config-line">
          <p className="key">{key}:</p>
          <p className="val">{`${val}`}</p>
        </div>
      ))}
    </div>
  );
}

export default ConfigPreview;
