<template>
  <div>
    <spinner class="spinner" v-if="load"></spinner>
    <div v-if="!load">
      <form @submit="editItem">
        <h3>Edit Item</h3>
        <label>Trailer No.:</label>
        <input type="text" v-model="data.trailerNo" readonly/>
        <label>Company:</label>
        <input
          type="text"
          v-model="data.company"
          :maxlength="100"
          minlength="10"
          pattern="[a-zA-Z0-9\s]+"
          title="Cannot contain specific letter"
          required
        />
        <label>Status</label>
        <select v-model="data.status" required>
          <option v-for="state in status" :key="state.id">{{ state }}</option>
        </select>
        <label>Location:</label>
        <input
          type="text"
          v-model="data.location"
          pattern="[a-zA-Z0-9\s]+"
          title="Cannot contain specific letter"
          required
        />
        <label>Job</label>
        <select v-model="data.job" required>
          <option v-for="jo in job" :key="jo.id">{{ jo }}</option>
        </select>
        <label>Attached Vehicle:</label>
        <input
          type="text"
          v-model="data.attachedVehicle"
          placeholder="search"
          @keyup="inputChanged"
          @keydown.down="onArrowDown"
          pattern="[A-Z0-9]+"
          title="Please enter Captitalize letter"
          required
        />
        <ul v-for="user in filteredUser" :key="user.id" v-show="isOpen">
          <li @click="setResult(user.value)">{{ user.value }}</li>
        </ul>
        <button class="click">Save</button>
        <button class="click">
          <router-link to="/" exact>Cancel</router-link>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import spinner from "./spinner.vue";
export default {
  data() {
    return {
      data: {
        action: [`<i class='fas fa-pen'></i>", "<i class='fas fa-trash'></i>`],
        trailerNo: "",
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
      id: this.$route.params.id,
      load: false,
    };
  },
  mounted() {
    this.$http
      .get("https://61d3f493b4c10c001712bb63.mockapi.io/data/" + this.id)
      .then(function (data) {
        this.data = data.body;
      });
  },
  methods: {
    editItem(event) {
      event.preventDefault();
      const payload = this.data;

      console.log("payload...: ", payload);

      this.$http
        .put(
          "https://61d3f493b4c10c001712bb63.mockapi.io/data/" + this.id,
          payload,
          {
            before: () => {
              this.load = true;
            },
          }
        )
        .then(function (data) {
          console.log(data);
          this.$router.push("/");
          this.load = false;
        });
    },
    setResult(value) {
      this.data.attachedVehicle = value;
      this.isOpen = false;
    },
    inputChanged() {
      if (this.data.attachedVehicle === "") {
        this.isOpen = false;
      } else {
        let filtered = this.users.filter((user) => {
          return user.value.match(this.data.attachedVehicle);
        });
        this.filteredUser = [];
        this.isOpen = true;
        this.filteredUser.push(...filtered);
        return this.filteredUser;
      }
    },
  },
  components: {
    spinner: spinner,
  },
};
</script>

<style lang="scss">
</style>
