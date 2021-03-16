import React, { useState, useRef } from "react";
import { postConfig } from "../api";
import { TextField, Button, Typography } from "@material-ui/core";
import ConfigPreview from "./ConfigPreview";
import InputValue from "./InputValue";
import "./style.css";
import RadioButtons from "./RadioButtons";

const initialData = { item_id: "", data: {} };

function NewConfigForm() {
  const [formData, setFormData] = useState(initialData);
  const [currentKey, setCurrentKey] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [valueType, setValueType] = useState("text");

  const keyInput = useRef();

  const clearForm = () => {
    setFormData(initialData);
    setCurrentValue("");
    setCurrentKey("");
    setValueType("text");
  };

  const saveLine = (e) => {
    e.preventDefault();
    if (e.target.id === "item_id") {
      setFormData({ ...formData, item_id: currentValue });
    } else {
      setFormData({
        ...formData,
        data: { ...formData.data, [currentKey]: currentValue },
      });
    }
    setCurrentValue("");
    setCurrentKey("");
    setValueType("text");
    keyInput.current?.children[1].children[0].focus();
  };

  const handleSubmit = async () => {
    try {
      const res = await postConfig(formData);
      console.log("Success", { response: res });
    } catch (error) {
      console.log(error);
    }
    clearForm();
  };

  if (!formData.item_id) {
    return (
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Please enter the Item id
        </Typography>
        <form onSubmit={saveLine} id="item_id">
          <TextField
            variant="outlined"
            label="item id"
            autoFocus
            required
            fullWidth
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            type="submit"
            style={{ marginTop: "5px" }}
          >
            Create Config
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="form-container">
      <Typography variant="h5" align="center" gutterBottom>
        Create new config
      </Typography>
      <div className="form-wrapper">
        <ConfigPreview config={formData} />
        <form onSubmit={saveLine}>
          <div className="form-group">
            <TextField
              variant="outlined"
              label="Name"
              autoFocus
              required
              fullWidth
              ref={keyInput}
              value={currentKey}
              onChange={(e) => setCurrentKey(e.target.value)}
            />
          </div>
          <div className="form-group">
            <RadioButtons valueType={valueType} setValueType={setValueType} />

            <InputValue
              type={valueType}
              currentValue={currentValue}
              setCurrentValue={setCurrentValue}
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Add config line
          </Button>
        </form>
      </div>
      <Button
        style={{ marginTop: "50px" }}
        variant="contained"
        color="secondary"
        size="large"
        fullWidth
        onClick={handleSubmit}
      >
        Submit Config
      </Button>
      <Button
        style={{ marginTop: "50px" }}
        variant="outlined"
        color="default"
        size="small"
        fullWidth
        onClick={clearForm}
      >
        Cancel
      </Button>
    </div>
  );
}

export default NewConfigForm;
