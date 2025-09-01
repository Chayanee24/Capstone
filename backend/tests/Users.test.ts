import request from "supertest";
import app from "../src/index";

import supabase from "../src/services/supabase";

jest.mock("../src/services/supabase");

describe("User API", () => {
  const mockAuth: any = (supabase as any).auth;
  const mockFrom: any = (supabase as any).from;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // === TEST REGISTER ===
  it("สมัครสมาชิกได้สำเร็จ", async () => {
    mockAuth.signUp.mockResolvedValue({
      data: { user: { id: "123" } },
      error: null,
    });
    mockFrom.mockReturnValue({
      insert: jest.fn().mockResolvedValue({ data: [{}], error: null }),
    });

    const res = await request(app)
      .post("/users/register")
      .send({ email: "test@test.com", password: "123456", username: "tester", role_id: 1, phone: "0800000000" });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });

  it("email ซ้ำ", async () => {
    mockAuth.signUp.mockResolvedValue({
      data: { user: null },
      error: { message: "Email already registered" },
    });

    const res = await request(app)
      .post("/users/register")
      .send({ email: "wichitchai63@gmail.com", password: "123456", username: "tester", role_id: 1, phone: "0800000000" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email already registered");
  });

  it("รหัสผ่านควรมีมากกว่า 5 ตัว", async () => {
    mockAuth.signUp.mockResolvedValue({
        data: { user: null },
        error: { message: "Password should be more than 5 characters." },
      });
    const res = await request(app)
      .post("/users/register")
      .send({ email: "praewapk2003@gmail.com", password: "1234", username: "tester", role_id: 1, phone: "0800000000" });
  
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Password should be more than 5 characters.");
  });

  // === TEST LOGIN ===
  it("เข้าสู่ระบบได้สำเร็จ", async () => {
    mockAuth.signInWithPassword.mockResolvedValue({
      data: {
        session: { access_token: "fake-token" },
        user: { id: "123", email: "test@test.com" },
      },
      error: null,
    });

    const res = await request(app)
      .post("/users/login")
      .send({ email: "wichitchai63@gmail.com", password: "123456" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBe("fake-token");
  });

  it("ใส่ email ผิด", async () => {
    mockAuth.signInWithPassword.mockResolvedValue({
      data: null,
      error: { message: "Invalid email" },
    });

    const res = await request(app)
      .post("/users/login")
      .send({ email: "wrong@test.com", password: "123456" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid email");
  });

  it("ใส่ password ผิด", async () => {
    mockAuth.signInWithPassword.mockResolvedValue({
      data: null,
      error: { message: "Invalid password" },
    });

    const res = await request(app)
      .post("/users/login")
      .send({ email: "wichitchai63@gmail.com", password: "wrong" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid password");
  });

  
});

afterAll(async () => {
  await supabase.removeAllChannels(); // ปิด realtime channel
});
