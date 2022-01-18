import axios from "axios";

const menuRender = {
  state: {
    trailers: [],
    damages: [],
  },
  getters: {
    trailers: (state) => state.trailers,
    damages: (state) => state.damages,
  },
  actions: {
    async getTrailers({ commit }) {
      try {
        const response = await axios.get(
          "https://61d3f493b4c10c001712bb63.mockapi.io/trailer"
        );
        commit("SET_TRAILERS", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getDamages({ commit }) {
      try {
        const response = await axios.get(
          "https://61d3f493b4c10c001712bb63.mockapi.io/damage"
        );
        commit("SET_DAMAGES", response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_TRAILERS(state, trailers) {
      state.trailers = trailers;
    },
    SET_DAMAGES(state, damages) {
      state.damages = damages;
    },
  },
};
export default menuRender;
