import Game from '../__mocks__';

window.game = new Game();

test('should be a testament of the proper configuration of jest to handle ES6, import and canvas, working with webpacked assets (with mocking for images and css)', () => {
  expect(window.game).not.toBe(undefined);
});