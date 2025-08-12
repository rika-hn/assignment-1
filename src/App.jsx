import React, { useEffect } from "react";
import { useState } from "react";
import { getAllRecords } from "./utils/supabaseFunction";
import { supabase } from "./utils/supabase";

export const App = () => {
  const [content, setContent] = useState("");
  const [time, setTime] = useState("");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRecords = async () => {
      setIsLoading(true);
      const records = await getAllRecords();
      setRecords(records);
      setIsLoading(false);
      console.log(records);
    };
    getRecords();
  }, []);

  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const onChangeTime = (event) => {
    setTime(event.target.value);
  };

  const onClickRegister = async () => {
    if (content === "" || time === "") {
      setError("入力されていない項目があります");
      return;
    } else {
      setError("");
    }

    const { error } = await supabase
      .from("study-record")
      .insert([{ content, time }]);
    if (error) {
      console.error("データ追加エラー:", error);
      return;
    }

    await fetchData();

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
      <h1 className="text-xl m-2">学習記録一覧</h1>
      <div className="flex items-center ml-2">
        学習内容
        <input
          type="text"
          class="block w-40 p-2 m-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
          value={content}
          onChange={onChangeContent}
        />
      </div>
      <div className="flex items-center ml-2 mb-4">
        学習時間
        <input
          type="number"
          class="block w-24 p-2 m-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
          value={time}
          onChange={onChangeTime}
        />
        時間
      </div>
      <div className="ml-2">入力されている学習内容: {content}</div>
      <div className="ml-2">入力されている時間: {time}時間</div>
      {isLoading ? (
        <p className="m-2 mb-4">ローディング中</p>
      ) : (
        <div className="m-2 mt-4">
          {records.map((record, id) => (
            <div key={id} className="flex mb-2 items-center">
              <p className="w-32">{record.content}</p>
              <p className="w-32">{record.time}時間</p>
              <button className="w-14 group relative h-8 overflow-hidden rounded-md bg-red-500 px-2 text-neutral-50 transition">
                <span className="text-sm">削除</span>
                <div className="absolute inset-0 h-full w-0 bg-white/30 transition-[width] group-hover:w-full"></div>
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onClickRegister}
        className="group relative h-8 overflow-hidden rounded-md bg-blue-500 px-3 text-neutral-50 transition ml-2 my-4"
      >
        <span className="text-sm">登録</span>
        <div className="absolute inset-0 h-full w-0 bg-white/30 transition-[width] group-hover:w-full"></div>
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p className="m-2">合計時間：{totalTime} / 1000(h)</p>
    </>
  );
};
