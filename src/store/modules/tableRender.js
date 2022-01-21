import Api from "@/service/api";

const tableRender = {
  state: {
    data: [],
    loading: false,
    error: null,
  },
  getters: {
    data: (state) => state.data,
  },

  //getters: //

  mutations: {
    SET_DATA(state, data) {
      state.data = data;
    },
    DELETE_DATA(state, dataId) {
      let data = state.data.filter((d) => d.id != dataId);
      state.data = data;
    },
    ADD_NEW(state, newData) {
      let data = state.data.concat(newData);
      state.data = data;
    },
    isLoading(state, loading){
      if(loading){
        state.loading = true
      } else {
        state.loading = false
      }
    }
  },
  actions: {
    async syncData({ commit }) {
      //this.loading = true;
      commit("isLoading", true)
      try {
        const response = await Api().get(
          "/data" /*, {
          before: () => {
            this.loading = true;
          },
        }*/
        );
        commit("SET_DATA", response.data);
        commit("isLoading", false)
        //this.loading = false;
        // if respose error => commit error ||
      } catch (error) {
        console.log(error);
        throw error;
        // commit error
      } finally {
       //this.loading = false;
       commit("isLoading", false)
      }
    },
    async deleteData({ commit }, dataId) {
      commit("isLoading", true)
      try {
        await Api().delete(
          `/data/${dataId}` /*{
          before: () => {
            this.loading = true;
          },
        }*/
        );
        commit("DELETE_DATA", dataId);
        commit("isLoading", false)
        // throw { error };
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        commit("isLoading", false)
      }
    },

    async addNew({ commit }, newData) {
      commit("isLoading", true)
      try {
        await Api().post("/data", newData);
        commit("ADD_NEW", newData);
        // throw { error };
        commit("isLoading", false)
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        commit("isLoading", false)
      }
    },
  },
};
export default tableRender;
