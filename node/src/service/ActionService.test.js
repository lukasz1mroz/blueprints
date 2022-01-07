jest.mock('./RequestService');

import { getAction, postAction } from './ActionService';

describe('ActionService tests', () => {
  it('should fetch item', async () => {
    // GIVEN
    const POST_ID = '1';

    // WHEN
    const response = await getAction(POST_ID);

    // THEN
    expect(response).toMatchObject({ data: expect.any(Object), status: expect.any(Number) });
  });

  it('should throw error', async () => {
    const WRONG_POST_ID = 'wrong_id';

    const errorResponse = await getAction(WRONG_POST_ID);

    await expect(errorResponse).rejects.toMatchObject({ data: 'Error', status: 500 });
  });

  it('should send the request', async () => {
    const response = await postAction();

    expect(response).toMatchObject({ data: expect.any(String), status: expect.any(Number) });
  });
});
