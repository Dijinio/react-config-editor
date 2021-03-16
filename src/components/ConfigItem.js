import React, { useState, useEffect } from "react";
import { postConfig } from "../api";
import { Button, ButtonGroup } from "@material-ui/core";
import "./style.css";

function ConfigItem({ item }) {
  const [newItem, setNewItem] = useState({ item_id: "", data: {} });
  const [prevItem, setPrevItem] = useState({});
  const [editForm, setEditForm] = useState(false);

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
        <ButtonGroup fullWidth>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
}

export default ConfigItem;
