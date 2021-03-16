import React, { useState, useEffect } from "react";
import { postConfig } from "../api";
import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import RadioButtons from "./RadioButtons";
import InputValue from "./InputValue";
import "./style.css";

function ConfigItem({ item }) {
  const [newItem, setNewItem] = useState({ item_id: "", data: {} });
  const [prevItem, setPrevItem] = useState({});
  const [editForm, setEditForm] = useState(false);
  const [currentKey, setCurrentKey] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [valueType, setValueType] = useState("text");

  useEffect(() => {
    const createNewItem = () => {
      const refactoredItem = { ...newItem };
      if (item.data) {
        setNewItem({ ...item });
      } else {
        refactoredItem.item_id = item.item_id;
        refactoredItem.data = { ...item };
        delete refactoredItem.data.item_id;
        setNewItem(refactoredItem);
      }
    };
    createNewItem();
  }, []);

  useEffect(() => {
    editForm && setPrevItem({ ...newItem });
  }, [editForm]);

  const handleEditForm = () => {
    setEditForm(true);
  };

  const handleValueEdit = (key, e) => {
    const value = e.target.value;
    let bool = false;

    if (value === "true" || value === "false") {
      value === "false" && (bool = !bool);
      setNewItem({
        ...newItem,
        data: { ...newItem.data, [key]: bool },
      });
    } else {
      setNewItem({
        ...newItem,
        data: { ...newItem.data, [key]: value },
      });
    }
  };

  const handleCancel = () => {
    setNewItem({ ...prevItem });
    setEditForm(false);
  };

  const handleSaveChanges = async () => {
    try {
      const res = await postConfig(newItem);
      console.log("Success", { response: res });
    } catch (error) {
      console.log(error);
    }
    setEditForm(false);
  };

  const editInput = (key, val) => {
    if (typeof val === "boolean") {
      return (
        <input
          type="checkbox"
          checked={val}
          value={val}
          onChange={(e) => handleValueEdit(key, e)}
        />
      );
    } else if (!isNaN(val)) {
      return (
        <input
          type="number"
          value={val}
          onChange={(e) => handleValueEdit(key, e)}
        />
      );
    } else {
      return (
        <input
          type="text"
          value={val}
          onChange={(e) => handleValueEdit(key, e)}
        />
      );
    }
  };

  const addNewLine = (e) => {
    e.preventDefault();
    setNewItem({
      ...newItem,
      data: { ...newItem.data, [currentKey]: currentValue },
    });
    setCurrentKey("");
    setCurrentValue("");
    setValueType("text");
  };

  return (
    <div className="config-item">
      <h3>{`item_id: ${newItem.item_id}`}</h3>
      {Object.entries(newItem.data).map(([key, val], i) => (
        <div key={i} className="config-line">
          <p className="key">{key}:</p>
          {editForm ? editInput(key, val) : <p className="val">{`${val}`}</p>}
        </div>
      ))}
      {!editForm ? (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleEditForm}
          fullWidth
        >
          Edit
        </Button>
      ) : (
        <>
          <form
            onSubmit={addNewLine}
            style={{
              marginBottom: "30px",
              padding: "10px 10px",
              border: "1px solid grey",
              borderRadius: "5px",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              style={{ margin: "0 0 20px 0" }}
            >
              Add config line
            </Typography>
            <div className="form-group">
              <TextField
                variant="outlined"
                label="Name"
                autoFocus
                required
                fullWidth
                size="small"
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
                size="small"
              />
            </div>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              size="small"
              type="submit"
            >
              Add new line
            </Button>
          </form>
          <ButtonGroup fullWidth>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </>
      )}
    </div>
  );
}

export default ConfigItem;
