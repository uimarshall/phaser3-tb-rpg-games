/* eslint-disable no-undef */

import setup from "../__mocks__/gameConfigMock";


describe('test the game creation configuration', () => {
  test('create a new game object', () => {
    expect(typeof setup()).toBe('object');
  });

  test('create all the provided scenes', () => {
    expect(typeof setup().scene.scenes.length).toBe('number');
  });
});