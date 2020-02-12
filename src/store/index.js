import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activePlayer: Math.round(Math.random()),
    score: [0, 0],
    currentScore: [0, 0]
  },
  getters: {
    activePlayer: state => state.activePlayer,
    score: state => state.score,
    currentScore: state => state.currentScore
  },
  mutations: {
    newGame: state => {
      state.activePlayer = Math.round(Math.random());
      state.score = [0, 0];
      state.currentScore = [0, 0];
    },
    changePlayer: state => {
      state.activePlayer === 0
        ? (state.activePlayer = 1)
        : (state.activePlayer = 0);
      const newCurrentScore = [...state.currentScore];
      newCurrentScore[state.activePlayer] = 0;
      state.currentScore = newCurrentScore;
    },
    setScore: state => {
      const newScore = [...state.score];
      newScore[state.activePlayer] += state.currentScore[state.activePlayer];
      state.score = newScore;
    },
    setCurrentScore: (state, payload) => {
      const newCurrentStore = [...state.currentScore];
      if (payload === 0) {
        newCurrentStore[state.activePlayer] = 0;
        state.currentScore = newCurrentStore;
      } else {
        newCurrentStore[state.activePlayer] += payload;
        state.currentScore = newCurrentStore;
      }
    }
  },
  actions: {
    newGame: ({ commit }) => {
      commit("newGame");
    },
    changePlayer: ({ commit }) => {
      commit("changePlayer");
    },
    setScore: ({ commit }) => {
      commit("setScore");
      commit("changePlayer");
    },
    setCurrentScore: ({ commit }, payload) => {
      commit("setCurrentScore", payload);
    }
  },
  modules: {}
});
