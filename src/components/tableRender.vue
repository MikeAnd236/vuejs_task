<template>
  <div id="table-render">
    
    <table>
      <thead>
        <tr>
          <th id="action">Action</th>
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
          <td>
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
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
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
            .delete("https://61d3f493b4c10c001712bb63.mockapi.io/data/" + id)
            .then(function (data) {
              console.log("data:" + data, "id:" + id);
              this.data.splice(id, 1);
              this.syncData();
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
          console.log("loadedddd...........");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
#table-render {
  box-sizing: border-box;
}
table {
  border-collapse: collapse;
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
    }
  }
}
</style>
