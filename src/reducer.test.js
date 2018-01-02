import reducer from './reducer';
import * as actions from './actions';

describe('reducer', () => {

  it('Should set the initial state when nothing is passed in', () => {

    // call the action
    const state = reducer(undefined, {type: '__UNKNOWN'});

    // test the expected results
    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!');
    expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
    expect(state.correctAnswer).toBeLessThanOrEqual(100);
    expect(state.auralStatus).toEqual('');

  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = reducer(currentState, {type: '__UNKNOWN'});
    expect(state).toBe(currentState);
  });

  describe('restartGame', () => {
    it('Should restart the game', () => {

      // act as if a game is underway
      let state = {
        guesses: [10, 20, 30, 40],
        feedback: 'You guessed it!',
        correctAnswer: 40
      };
      const correctAnswer = 40;
      state = reducer(state, actions.restartGame(correctAnswer));
      expect(state.guesses).toEqual([]);
      expect(state.feedback).toEqual('Make your guess!');
      expect(state.correctAnswer).toEqual(correctAnswer);
      expect(state.auralStatus).toEqual('');

    });
  });

  describe('make guess', () => {
    it('Should accept a guess from user', () => {

      // Fix the correct answer so we know what we're aiming for
      let state = {
        guesses: [],
        feedback: '',
        correctAnswer: 100 // Negative so different to new game
      };

      state = reducer(state, actions.makeGuess('foobar'));
      expect(state.guesses).toEqual([NaN]);
      expect(state.feedback).toEqual("Please enter a valid number.");

      state = reducer(state, actions.makeGuess(25));
      expect(state.guesses).toEqual([NaN, 25]);
      expect(state.feedback).toEqual("You're Ice Cold...");

      state = reducer(state, actions.makeGuess(60));
      expect(state.guesses).toEqual([NaN, 25, 60]);
      expect(state.feedback).toEqual("You're Cold...");

      state = reducer(state, actions.makeGuess(80));
      expect(state.guesses).toEqual([NaN, 25, 60, 80]);
      expect(state.feedback).toEqual("You're Warm.");

      state = reducer(state, actions.makeGuess(95));
      expect(state.guesses).toEqual([NaN, 25, 60, 80, 95]);
      expect(state.feedback).toEqual("You're Hot!");

      state = reducer(state, actions.makeGuess(100));
      expect(state.guesses).toEqual([NaN, 25, 60, 80, 95, 100]);
      expect(state.feedback).toEqual('You got it!');

    });
  });

  it('Can generate aural updates', () => {
    let state = {
      guesses: [25, 3, 90],
      feedback: "You're Warm.",
      auralStatus: ''
    };

    state = reducer(state, actions.generateAuralUpdate());
    expect(state.auralStatus).toEqual(
      "Here's the status of the game right now: You're Warm. You've made 3 guesses. In order of most- to least-recent, they are: 90, 3, 25"
    );
  });

});
