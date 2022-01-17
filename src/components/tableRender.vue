<template>
  <div class="table-content">
    <spinner class="spinner" v-if="load"></spinner>
    <div class="table-render" v-if="!load">
      <div>
        <app-header />
      </div>
      <table>
        <thead>
          <tr>
            <th class="action">Action</th>
            <th>Trailer No.</th>
            <th>Company</th>
            <th>Status</th>
            <th>Location</th>
            <th>Job</th>
            <th>Attached Vehicle</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="item.id">
            <td class="icon">
              <button>
                <router-link v-bind:to="'/edit/' + item.id" exact>
                  <span v-html="item.action[0]"></span>
                </router-link>
              </button>

              <button @click="deleteItem(index)">
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
  </div>
</template>

<script>
import header from "./header.vue";
import spinner from "./spinner.vue";

export default {
  data() {
    return {
      data: [],
      load: false,
    };
  },
  components: {
    "app-header": header,
    spinner: spinner,
  },

  mounted() {
    this.syncData();
  },

  methods: {
    deleteItem(index) {
      this.$http
        .get("https://61d3f493b4c10c001712bb63.mockapi.io/data")
        .then(function (data) {
          let id = data.body[index]["id"];
          this.$http
            .delete("https://61d3f493b4c10c001712bb63.mockapi.io/data/" + id, {
              before: () => {
                this.load = true;
              },
            })
            .then(function (data) {
              console.log("data:" + data, "id:" + id);
              this.data.splice(id, 1);
              this.syncData();
              this.load = false;
            });
        })
        .catch(function (e) {
          alert("Error Message:" + e);
        });
    },

    syncData() {
      console.log("loading...");
      this.$http
        .get("https://61d3f493b4c10c001712bb63.mockapi.io/data")
        .then(function (data) {
          console.log("update data: ", data);
          this.data = data.body;
          //console.log("loadedddd...........");
        })
        .catch((err) => console.log(err));
    },
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
</style>
