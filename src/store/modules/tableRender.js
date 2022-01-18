import axios from "axios";

const tableRender = {
  state: {
    load: false,
    data: {
      action: ["<i class='fas fa-pen'></i>", "<i class='fas fa-trash'></i>"],
      trailerNo: '',
      company: "",
      location: "",
      attachedVehicle: "",
    },
    status: [
      "Allocation",
      "Unallocation",
      "Under repair",
      "Not for Allocation",
      "Not Servicable",
    ],
    job: ["soldier", "driver", "doctor", "teacher"],
    users: [
      {
        id: "l1",
        value: "AB024",
      },
      {
        id: "l2",
        value: "QT163",
      },
      {
        id: "l3",
        value: "GV220",
      },
      {
        id: "l4",
        value: "TH120",
      },
      {
        id: "l5",
        value: "KM089",
      },
      {
        id: "l6",
        value: "DR058",
      },
      {
        id: "l7",
        value: "GV110",
      },
      {
        id: "l8",
        value: "DW098",
      },
      {
        id: "l9",
        value: "AC148",
      },
      {
        id: "l10",
        value: "GR233",
      },
    ],
    isOpen: false,
    filteredUser: [],
  },
  getters: { data: (state) => state.data, load: (state) => state.load },

  //getters: //
  actions: {
    async syncData({ commit }) {
      try {
        const response = await axios.get(
          "https://61d3f493b4c10c001712bb63.mockapi.io/data"
        );
        commit("SET_DATA", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteData({ commit }, dataId) {
      try {
        await axios.delete(
          `https://61d3f493b4c10c001712bb63.mockapi.io/data/${dataId}`,
          {
            before: () => {
              this.load = true;
            },
          }
        );
        this.load = false;
      } catch (error) {
        console.log(error);
      }
      commit("DELETE_DATA", dataId);
    },
    async addNew({ commit }, newData) {
      try {
        await axios.post(
          "https://61d3f493b4c10c001712bb63.mockapi.io/data",
          newData
        );
      } catch (error) {
        console.log(error);
      }
      commit("ADD_NEW", newData);
    },
    randomTrailer({commit},length) {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        return result = "CDAS-" + result;
      }
      
      commit('RANDOM_TRAILER', result)
    },
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
      state.data.push(newData);
      this.$router.push({ path: "/" });
    },
    RANDOM_TRAILER(state, result){
      state.result = result;
    }
  },
};
export default tableRender;
