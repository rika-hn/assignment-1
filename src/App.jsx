import React from "react";

import { useState } from "react";

export const App = () => {
  const [studyContent, setStudyContent] = useState("");
  const [studyTotalTime, setStudyTotalTime] = useState("");

  const [records, setRecords] = useState([]);

  const onChangeStudyContent = (event) => {
    setStudyContent(event.target.value);
  };

  const onChangeStudyTotalTime = (event) => {
    setStudyTotalTime(event.target.value);
  };

  const onClickRegister = () => {
    if (studyContent === "") return;
    const newStudyContent = [...records, studyContent];
    const newStudyTotalTime = [...records, studyTotalTime];
    setRecords([newStudyContent], [newStudyTotalTime]);
    setStudyContent("");
    setStudyTotalTime("");
  };

  return (
    <>
      <h1>学習記録一覧</h1>
      <div>
        学習内容
        <input
          type="text"
          value={studyContent}
          onChange={onChangeStudyContent}
        />
      </div>
      <div>
        学習時間
        <input
          type="number"
          value={studyTotalTime}
          onChange={onChangeStudyTotalTime}
        />
        時間
      </div>
      <div>入力されている学習内容: {studyContent}</div>
      <div>入力されている時間: {studyTotalTime}</div>
      <div>
        {records.map((record, key) => (
          <div key={key} style={{ display: "flex" }}>
            <p>{records}</p>
          </div>
        ))}
      </div>
      <button onClick={onClickRegister}>登録</button>
    </>
  );
};
