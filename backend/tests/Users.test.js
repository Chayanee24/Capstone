"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../src/index"));
const supabase_1 = __importDefault(require("../src/services/supabase"));
jest.mock("../src/services/supabase");
describe("User API", () => {
    const mockAuth = supabase_1.default.auth;
    const mockFrom = supabase_1.default.from;
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
        const res = await (0, supertest_1.default)(index_1.default)
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
        const res = await (0, supertest_1.default)(index_1.default)
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
        const res = await (0, supertest_1.default)(index_1.default)
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
        const res = await (0, supertest_1.default)(index_1.default)
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
        const res = await (0, supertest_1.default)(index_1.default)
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
        const res = await (0, supertest_1.default)(index_1.default)
            .post("/users/login")
            .send({ email: "wichitchai63@gmail.com", password: "wrong" });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Invalid password");
    });
});
afterAll(async () => {
    await supabase_1.default.removeAllChannels(); // ปิด realtime channel
});
