jest.mock('./DbService');

import { loginAction, refreshAccessTokenAction, removeRefreshTokenAction } from './AuthService';

describe('AuthService tests', () => {
  it('should return access token', async () => {
    const response = await loginAction('test_name', 'test_password');

    expect(response).toMatchObject({ status: 200, description: expect.any(String), accessToken: expect.any(String) });
  });

  it('should return refresh token', async () => {
    const response = await refreshAccessTokenAction({ name: 'test_name', password: 'test_password' });

    expect(response).toMatchObject({ status: 200, description: expect.any(String), accessToken: expect.any(String) });
  });

  it('should remove refresh token', async () => {
    const response = await removeRefreshTokenAction('refresh_token');

    expect(response).toMatchObject({ status: 204, description: expect.any(String) });
  });
});
