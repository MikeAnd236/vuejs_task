import Api from "@/service/api";

const perPageOptions = [5, 7, 10];
const tableRender = {
  state: {
    data: [],
    loading: false,
    error: null,
    pagination: { page: 1, perPage: perPageOptions[0] },
    perPageOptions,
  },
  getters: {
    data: (state) => state.data,
  },
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
    isLoading(state, loading) {
      if (loading) {
        state.loading = true;
      } else {
        state.loading = false;
      }
    },
    computedData() {
      if (!this.data) return [];
      else {
        const firstIndex = (this.pagination.page - 1) * this.pagination.perPage;
        const lastIndex = this.pagination.page * this.pagination.perPage;
        return this.data.slice(firstIndex, lastIndex);
      }
    },
  },
  actions: {
    async syncData({ commit }) {
      commit("isLoading", true);
      try {
        const response = await Api().get("/data");
        commit("SET_DATA", response.data);
        // if respose error => commit error ||
      } catch (error) {
        console.log(error);
        commit("isLoading", false);
        throw error;
        // commit error
      } finally {
        //this.loading = false;
        commit("isLoading", false);
      }
    },
    async deleteData({ commit }, dataId) {
      commit("isLoading", true);
      try {
        await Api().delete(
          `/data/${dataId}` /*{
          before: () => {
            this.loading = true;
          },
        }*/
        );
        commit("DELETE_DATA", dataId);
        // throw { error };
      } catch (error) {
        console.log(error);
        commit("isLoading", false);
        throw error;
      } finally {
        commit("isLoading", false);
      }
    },
    async addNew({ commit }, newData) {
      commit("isLoading", true);
      try {
        await Api().post("/data", newData);
        commit("ADD_NEW", newData);
        if (!this.data) return [];
        else {
          const firstIndex =
            (this.pagination.page - 1) * this.pagination.perPage;
          const lastIndex = this.pagination.page * this.pagination.perPage;
          return this.data.slice(firstIndex, lastIndex);
        }

        // throw { error };
      } catch (error) {
        console.log(error);
        commit("isLoading", false);
        throw error;
      } finally {
        commit("isLoading", false);
      }
    },
  },
};
export default tableRender;
