const { login } = require('../controllers/authController');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

jest.mock('../models/User');
jest.mock('jsonwebtoken');

describe('AuthController Login', () => {
  const mockReq = { body: { username: 'testuser', password: 'test123' } };
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return token on successful login', async () => {
    const mockUser = {
      _id: '12345',
      username: 'testuser',
      comparePassword: jest.fn().mockResolvedValue(true)
    };
    User.findOne.mockResolvedValue(mockUser);
    jwt.sign.mockReturnValue('mock-jwt-token');

    await login(mockReq, mockRes);

    expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
    expect(mockUser.comparePassword).toHaveBeenCalledWith('test123');
    expect(jwt.sign).toHaveBeenCalled();
    expect(mockRes.json).toHaveBeenCalledWith({ token: 'mock-jwt-token' });
  });
});
