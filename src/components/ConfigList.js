import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { fetchConfig } from "../api";
import ConfigItem from "./ConfigItem";
import "./style.css";

function ConfigList() {
  const [configList, setConfigList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const { data } = await fetchConfig();
        setConfigList(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchList();
  }, []);

  return !configList.length ? (
    <div className="items-container">
      <CircularProgress />
    </div>
  ) : (
    <div className="items-container">
      {configList.map((item) => (
        <ConfigItem key={item.item_id} item={item} />
      ))}
    </div>
  );
}

export default ConfigList;
