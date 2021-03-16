import React from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";

function RadioButtons({ valueType, setValueType }) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Value Type</FormLabel>
      <RadioGroup
        row
        aria-label="value type"
        value={valueType}
        onChange={(e) => setValueType(e.target.value)}
      >
        <FormControlLabel value="text" control={<Radio />} label="Text" />
        <FormControlLabel value="number" control={<Radio />} label="Number" />
        <FormControlLabel
          value="checkbox"
          control={<Radio />}
          label="Checkbox"
        />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButtons;
