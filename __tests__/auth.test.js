const { register } = require("../controllers/authController");
const User = require("../models/User");

jest.mock("../models/User");

describe("AuthController Unit Test", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = {
      body: { username: "testuser", password: "test123" }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it("should return 201 when user is successfully registered", async () => {
    const saveMock = jest.fn().mockResolvedValue(true);
    User.findOne.mockResolvedValue(null);
    User.mockImplementation(() => ({ save: saveMock }));

    await register(mockReq, mockRes);

    expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
    expect(saveMock).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "User registered successfully"
    });
  });
});
