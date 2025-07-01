import { React } from "react";

export const App = () => {
  const records = [
    { title: "勉強の記録1", time: 1 },
    { title: "勉強の記録2", time: 3 },
    { title: "勉強の記録3", time: 5 },
  ];

  return (
    <>
      <h1>学習記録一覧</h1>
      <div>
        {records.map((record, key) => (
          <div key={key} style={{ display: "flex" }}>
            <p style={{ paddingRight: "4px" }}>{records[key].title}</p>
            <p>{records[key].time}時間</p>
          </div>
        ))}
      </div>
    </>
  );
};
