import React from "react";

import { useState } from "react";

export const App = () => {
  const [content, setContent] = useState("");
  const [time, setTime] = useState("");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const onChangeTime = (event) => {
    setTime(event.target.value);
  };

  const onClickRegister = () => {
    if (content === "" || time === "") {
      setError("入力されていない項目があります");
      return;
    } else {
      setError("");
    }

    const newRecord = {
      content,
      time,
    };

    setRecords([...records, newRecord]);
    setContent("");
    setTime("0");
  };

  return (
    <>
      <h1>学習記録一覧</h1>
      <div>
        学習内容
        <input type="text" value={content} onChange={onChangeContent} />
      </div>
      <div>
        学習時間
        <input type="number" value={time} onChange={onChangeTime} />
        時間
      </div>
      <div>入力されている学習内容: {content}</div>
      <div>入力されている時間: {time}時間</div>
      <div>
        {records.map((record, key) => (
          <div key={key} style={{ display: "flex", mt: "0" }}>
            <p>{record.content}</p> <p>{record.time}時間</p>
          </div>
        ))}
      </div>
      <button onClick={onClickRegister}>登録</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};
