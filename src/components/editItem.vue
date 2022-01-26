<template>
  <div>
    <spinner class="spinner" v-if="loading"></spinner>
    <div v-if="!loading">
      <form @submit="editItem">
        <h3>Edit Item</h3>
        <label>Trailer No.:</label>
        <input type="text" v-model="data.trailerNo" readonly />
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
          s
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
          pattern="[a-zA-Z0-9\s]+"
          title="Cannot contain specific letter"
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
//import { mapGetters } from "vuex";
import spinner from "./spinner.vue";
import Api from "@/service/api";

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
      users: [],
      loading: false,
      isOpen: false,
      id: this.$route.params.id,
      filteredUser: [],
    };
  },
  async mounted() {
    const response = await Api().get(`/data/${this.id}`);
    this.data = response.data;
  },
  //computed: mapGetters(["loading"]),
  methods: {
    async editItem(event) {
      event.preventDefault();
      this.loading = true;
      await Api().put(`/data/${this.id}`, this.data);
      this.loading = false;
      this.$router.push("/");
    },
    setResult(value) {
      this.data.attachedVehicle = value;
      this.isOpen = false;
    },
    async inputChanged() {
      if (this.data.attachedVehicle === "") {
        this.isOpen = false;
      } else {
        const response = await Api().get("/users");
        this.users = response.data;
        let filtered = this.users.filter((user) => {
          return user.value.match(this.data.attachedVehicle.toUpperCase());
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
