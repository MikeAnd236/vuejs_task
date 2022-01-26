<template>
  <div class="table-content">
    <spinner class="spinner" v-if="loading"></spinner>
    <div class="search-content">
      <input
        class="search"
        v-model="search"
        type="text"
        placeholder="Search trailer..."
      />
      <select class="search-select" v-model="searchStatus">
        <option value="" selected disabled>Select status...</option>
        <option value="">None</option>
        <option v-for="stati in status" :key="stati.id">
          {{ stati }}
        </option>
      </select>
      <select class="search-select" v-model="searchJob">
        <option value="" selected disabled>Select job...</option>
        <option value="">None</option>
        <option v-for="jo in job" :key="jo.id">
          {{ jo }}
        </option>
      </select>
      <input
        class="search"
        v-model="searchUsers"
        type="text"
        placeholder="Search vehicle..."
      />

      <i id="search-icon" class="fas fa-search fa-lg"></i>
    </div>
    <div class="table-render" v-if="!loading">
      <div>
        <app-header />
      </div>
      <table>
        <thead>
          <tr>
            <th class="action">Action</th>
            <th v-for="con in config" :key="con.key">{{ con.value }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in computedData" :key="item.id">
            <td class="icon">
              <button>
                <router-link v-bind:to="'/edit/' + item.id" exact>
                  <span v-html="item.action[0]"></span>
                </router-link>
              </button>

              <button @click="deleteData(item.id)">
                <span v-html="item.action[1]"></span>
              </button>
            </td>
            <td>
              {{ item.trailerNo }}
            </td>
            <td>
              {{ item.company }}
            </td>
            <td>
              {{ item.status }}
            </td>
            <td>{{ item.location }}</td>
            <td>
              {{ item.job }}
            </td>
            <td>
              {{ item.attachedVehicle }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination
      :totalRecords="data.length"
      :perPageOptions="perPageOptions"
      v-model="pagination"
    />
  </div>
</template>

<script>
import header from "./header.vue";
import spinner from "./spinner.vue";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import pagination from "./pagination.vue";

const perPageOptions = [5, 7, 10];
export default {
  data() {
    return {
      search: "",
      searchStatus: "",
      searchJob: "",
      searchUsers: "",
      pagination: { page: 1, perPage: perPageOptions[0] },
      perPageOptions,
      status: [
        "Allocation",
        "Unallocation",
        "Under repair",
        "Not for Allocation",
        "Not Servicable",
      ],
      job: ["soldier", "driver", "doctor", "teacher"],
      users: [],
      config: [
        { key: "trailer", value: "Trailer No." },
        { key: "company", value: "Company" },
        { key: "status", value: "Status" },
        { key: "loaction", value: "Location" },
        { key: "job", value: "Job" },
        { key: "attachedVehicle", value: "Attached Vehicle" },
      ],
    };
  },
  computed: {
    ...mapGetters(["data"]),
    ...mapState(["loading"]),

    computedData() {
      if (!this.data) return [];
      else {
        const firstIndex = (this.pagination.page - 1) * this.pagination.perPage;
        const lastIndex = this.pagination.page * this.pagination.perPage;
        return this.filterTrailer.slice(firstIndex, lastIndex);
      }
    },
    filterTrailer: function () {
      return this.data.filter((item) => {
        return (
          item.trailerNo.match(this.search.toUpperCase()) &&
          item.status.match(this.searchStatus) &&
          item.job.match(this.searchJob) &&
          item.attachedVehicle.match(this.searchUsers.toUpperCase())
        );
      });
    },
  },

  components: {
    "app-header": header,
    spinner: spinner,
    pagination: pagination,
  },
  mounted() {
    this.syncData();
  },

  methods: {
    ...mapActions(["syncData", "deleteData"]),
    ...mapMutations(["SET_DATA", "DELETE_DATA", "isLoading"]),
  },
};
</script>

<style lang="scss">
.table-content {
  display: flex;
  flex-direction: column;
}
.table-render {
  box-sizing: border-box;
  margin-top: -10px;
  display: flex;
  flex-direction: column;
}
table {
  border-collapse: collapse;
  width: 100%;
  th {
    padding-bottom: 10px;
    text-align: left;
    padding: 0 0.75em;
    padding-bottom: 10px;
  }
  tr {
    border-bottom: 1px solid #cecece;
  }
  td {
    padding: 1em 0.75em;
    text-align: left;
    button {
      margin: 0 5px;
      background-color: Transparent;
      background-repeat: no-repeat;
      border: none;
      width: 20px;
      height: 20px;
      cursor: pointer;
      .fas:hover {
        color: tomato;
      }
    }
  }
}
.action {
  text-align: center;
}
.icon {
  text-align: center;
}
.header {
  margin-top: -10px;
  margin-bottom: 20px;
}
input,
select {
  font-family: "Poppins", sans-serif;
  font-size: 12px;
}
button {
  font-family: "Poppins", sans-serif;
  background: rgb(12, 119, 185);
  border-radius: 3px;
}
.search-content {
  margin: 0 150px 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid gray;
  height: 22px;
  border-radius: 5px;
  box-shadow: 3px 3px gray;
  background: rgb(12, 119, 185);
  .search {
    border: 1px solid gray;
    height: 20px;
    border: none;
    border-right: 1px solid gray;
    width: 150px;
    cursor: pointer;
  }
  .search-select {
    height: 22px;
    width: 150px;
    border: none;
    border-right: 1px solid gray;
  }
  #search-icon {
    width: 20px;
    height: 20px;
    margin-top: 10px;
    color: white;
    margin-left: 3px;
  }
}
select option:first-child {
  color: gray;
}
</style>
