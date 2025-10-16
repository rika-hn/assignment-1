import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

let App;

const mockSelect = jest.fn().mockResolvedValue({ data: [], error: null });
const mockInsert = jest
  .fn()
  .mockResolvedValue({ data: [{ id: 1 }], error: null });

const mockDelete = jest.fn(() => ({
  eq: jest.fn().mockResolvedValue({ data: [{ id: 1 }], error: null }),
  match: jest.fn().mockResolvedValue({ data: [{ id: 1 }], error: null }),
}));

const mockFrom = jest.fn(() => ({
  select: mockSelect,
  insert: mockInsert,
  delete: mockDelete,
}));

jest.doMock("../utils/supabaseClient", () => ({
  createSupabaseClient: jest.fn(() => ({
    from: mockFrom,
  })),
}));

beforeAll(async () => {
  const module = await import("../App");
  App = module.default;
});

test("登録後に削除ボタンを押すと件数が1つ減る", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("登録")).toBeInTheDocument();
  });

  const before = screen.queryAllByTestId("record-item").length;

  fireEvent.change(screen.getByLabelText(/学習内容/), {
    target: { value: "テスト学習" },
  });
  fireEvent.change(screen.getByLabelText(/学習時間/), {
    target: { value: "3" },
  });

  fireEvent.click(screen.getByText("登録"));

  const deleteButton = await screen.findByText("削除");

  const middle = screen.queryAllByTestId("record-item").length;
  expect(middle).toBe(before + 1);

  fireEvent.click(deleteButton);

  const after = screen.queryAllByTestId("record-item").length;
  expect(after).toBe(before);
});
