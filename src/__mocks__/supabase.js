// __mocks__/supabase.js
export const supabase = {
  from: jest.fn(() => ({
    select: jest.fn().mockResolvedValue({
      data: [{ id: 1, title: "React Hooks", time: 2 }],
      error: null,
    }),
    insert: jest.fn().mockResolvedValue({
      data: [{ id: 2, title: "New Record", time: 1 }],
      error: null,
    }),
  })),
};
