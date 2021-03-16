import React, { useState, useEffect } from "react";
import { TextField, Checkbox } from "@material-ui/core";

function InputValue({ type, currentValue, setCurrentValue, size }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkboxTick = () => {
      if (type === "checkbox" && !checked) {
        setCurrentValue(false);
      }
      if (type === "checkbox" && checked) {
        setCurrentValue(true);
      }
    };

    checkboxTick();
  }, [type, checked]);

  const handleCheck = () => {
    setChecked((checked) => !checked);
  };

  if (type === "text" || type === "number") {
    return (
      <>
        <TextField
          variant="outlined"
          label="Value"
          value={currentValue}
          required
          fullWidth
          type={type}
          size={size}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
      </>
    );
  } else {
    return (
      <>
        <Checkbox checked={checked} onChange={handleCheck} color="primary" />
      </>
    );
  }
}

export default InputValue;
