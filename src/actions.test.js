import * as actions from './actions';

describe('generateAuralUpdate', () => {
  it('Should return the action', () => {
    const action = actions.generateAuralUpdate();
    expect(action.type).toEqual(actions.GENERATE_AURAL_UPDATE);
  });
});

describe('restartGame', () => {
  it('Should return the action', () => {
    const correctAnswer = 10;
    const action = actions.restartGame(correctAnswer);
    expect(action.type).toEqual(actions.RESTART_GAME);
    expect(action.correctAnswer).toEqual(correctAnswer);
  });
});

describe('makeGuess', () => {
  it('Should return the action', () => {
    const guess = 10;
    const action = actions.makeGuess(guess);
    expect(action.type).toEqual(actions.MAKE_GUESS);
    expect(action.guess).toEqual(guess);
  });
});
