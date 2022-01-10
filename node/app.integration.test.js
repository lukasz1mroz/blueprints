import supertest from 'supertest';
import app from './app';

let server;
let request;
let token;
const PORT = 3000;

beforeAll(async () => {
  server = await app.expressApp();
  request = supertest(server);
  const tokenResp = await request.get('/login').auth('test_user', 'test_password');
  token = JSON.parse(tokenResp.text).accessToken;
});

afterAll(async () => {
  await server.close();
});

describe('Integration tests', () => {
  it('should start server', () => {
    expect(server.address().port).toBe(PORT);
  });

  it('should get item', async () => {
    const response = await request.get('/getPosts').auth(token, { type: 'bearer' });
    expect(response.statusCode).toEqual(200);
  });

  it('should send request', async () => {
    const response = await request
      .post('/post')
      .send({ id: 1, value: 1, comment: 'test_comment' })
      .auth(token, { type: 'bearer' });
    expect(response.statusCode).toEqual(200);
  });
});
