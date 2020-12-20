import { createGame, getScores, putScore } from '../API/leaderBoard';
import 'babel-polyfill';


describe('The scores should be written and read from the API', () => {
  it('Should post the score', () => {
    putScore('fred', 150).then(data => {
      expect(data).toBe('Leaderboard score created correctly.');
    });
  });
  it('Should get all the scores from the API', () => {
    getScores().then(data => {
      expect(typeof data).toBe('object');
      expect(data.result).toContainEqual('user');
    });
  });
});


describe('create a game with a valid name', () => {
  it('create a game to if the name is valid', () => {
    createGame().then((data) => {
      expect(data).toBeTruthy();
    });
  });
});

describe('retrieve the score', () => {
  it('return the score if the app exists', () => {
    getScores().then((data) => {
      expect(typeof data).toBe('object');
    });
  });
});
