jest.mock('../service/RequestService');

import { loginRoute, tokenRoute, getActionRoute, postActionRoute, errorRoute } from '../controller/Controller';
import httpMocks from 'node-mocks-http';
import { InternalServerError } from '../types/errors';

describe('Controller tests', () => {
  it('should login user', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'GET',
      user: {
        name: 'test_user',
        password: 'test_password',
      },
    });
    const response = await loginRoute(req, res);
    const data = JSON.parse(res._getData());

    expect(response.statusCode).toEqual(200);
    expect(data).toEqual({
      status: expect.any(Number),
      description: expect.any(String),
      accessToken: expect.any(String),
    });
  });

  it('should refresh token', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'GET',
      headers: {
        authorization: 'sample_token',
      },
    });
    const response = await tokenRoute(req, res);
    const data = JSON.parse(res._getData());

    expect(response.statusCode).toEqual(200);
    expect(data).toEqual({
      status: expect.any(Number),
      description: expect.any(String),
      accessToken: expect.any(String),
    });
  });

  it('should get item', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'GET',
      params: {
        postId: 1,
      },
    });
    const response = await getActionRoute(req, res);
    const data = JSON.parse(res._getData());

    expect(response.statusCode).toEqual(200);
    expect(data).toEqual({
      data: expect.any(Object),
      status: expect.any(Number),
    });
  });

  it('should send request', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'POST',
      body: {
        id: 1,
        value: 2,
        comment: 'test_comment',
      },
    });
    const response = await postActionRoute(req, res);
    const data = JSON.parse(res._getData());

    expect(response.statusCode).toEqual(200);
    expect(data).toEqual({
      data: expect.any(String),
      status: expect.any(Number),
    });
  });

  it('should throw error', () => {
    expect(errorRoute).toThrow(InternalServerError);
  });
});
