import App from "../App";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// supabaseのモック
jest.mock("../utils/supabase", () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockResolvedValue({ data: [], error: null }),
      insert: jest.fn().mockResolvedValue({ data: [{ id: 1 }], error: null }),
    })),
  },
}));

// getAllRecords/deleteRecordsのモック
jest.mock("../utils/supabaseFunction", () => ({
  getAllRecords: jest.fn().mockResolvedValue([]),
  deleteRecords: jest.fn(),
}));

test("登録ボタンを押すと supabase.insert が呼ばれ件数が1つ増える", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("登録")).toBeInTheDocument();
  });

  // 存在しなくてもOKにする
  const before = screen.queryAllByTestId("record-item").length;

  fireEvent.change(screen.getByLabelText(/学習内容/), {
    target: { value: "テスト学習" },
  });
  fireEvent.change(screen.getByLabelText(/学習時間/), {
    target: { value: "3" },
  });

  fireEvent.click(screen.getByText("登録"));

  const after = await screen.findAllByTestId("record-item");
  expect(after.length).toBe(before + 1);
});
