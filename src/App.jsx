import React, { useEffect } from "react";
import { useState } from "react";
import { getAllRecords } from "./utils/supabaseFunction";

export const App = () => {
  const [content, setContent] = useState("");
  const [time, setTime] = useState("");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRecords = async () => {
      try {
        setIsLoading(true);
        const records = await getAllRecords();
        console.log(records);
        console.log("2件目の中身:", JSON.stringify(records[1], null, 2));
      } finally {
        setIsLoading(false);
      }
      console.log(records);
      console.log("1件目の中身:", JSON.stringify(records[0], null, 2));

      setRecords(records);
    };
    getRecords();
  }, []);

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

    const updateTime = [...records, newRecord];
    const totalTime = updateTime.reduce(
      (sum, newRecord) => sum + parseInt(newRecord.time),
      0
    );
    setTotalTime(totalTime);
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
      {isLoading ? (
        <p>isLoading...</p>
      ) : (
        <div>
          {records.map((record, id) => (
            <div id={id} style={{ display: "flex", mt: "0" }}>
              <p style={{ px: "0" }}>{record.content}</p>
              <p style={{ px: "0" }}>{record.time}時間</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={onClickRegister}>登録</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>合計時間：{totalTime} / 1000(h)</p>
    </>
  );
};
