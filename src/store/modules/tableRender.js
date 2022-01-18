import axios from "axios";

const tableRender = {
  state: {
    data: [],
    //load: false,
  },
  getter: { data: (state) => state.data },
  //getters: //
  actions: {
    async syncData({commit}){
      try {
        const response = await axios.get("https://61d3f493b4c10c001712bb63.mockapi.io/data")
        commit('SET_DATA', response.data)
      } catch (error) {
        console.log(data)
      }
    }
    /*async deleteData({ commit }, ) {
      try {
        await axios.delete(
          "https://61d3f493b4c10c001712bb63.mockapi.io/data/" + id,
          {
            before: () => {
              this.load = true;
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
      commit("DELETE_DATA", id);
    },*/
  },
  mutations: {
    /* DELETE_DATA(state, id) {
      state.data = state.data.splice(id, 1);
    },*/
    SET_DATA(state, data){
      state.data = data
    }
  },
};
export default tableRender;
