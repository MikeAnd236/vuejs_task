<template>
  <div>
    <spinner class="spinner" v-if="!isLoading"></spinner>
    <div class="add-new" v-if="isLoading">
      <form @submit="addNew">
        <h3>Add a New Item</h3>
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
        <input class="click" type="submit" value="Add" />

        <button class="click">
          <router-link to="/">Cancel</router-link>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import spinner from "./spinner.vue";
import randomTrailer from "../helper/randomTrailer";
import { mapActions, mapState } from "vuex";
import Api from "@/service/api";

const LENGHT_OF_TRAILER = 6;

export default {
  data() {
    return {
      data: {
        action: ["<i class='fas fa-pen'></i>", "<i class='fas fa-trash'></i>"],
        trailerNo: randomTrailer(LENGHT_OF_TRAILER),
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
      isOpen: false,
      filteredUser: [],
    };
  },
  computed: mapState(["loading"]),
  methods: {
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
    addNew() {
      this.$store.dispatch("addNew", this.data);
      this.$router.push({ path: "/" });
    },
    ...mapActions(["isLoading"]),
  },
  components: {
    spinner: spinner,
  },
};
</script>

<style lang="scss">
div {
  display: flex;
  margin-top: 10px;
  font-size: 10px;
  font-family: "Poppins", sans-serif;
}
.add {
  background-color: rgb(12, 119, 185);
  color: rgb(255, 255, 255);
  border: 1px solid rgb(12, 119, 185);
  margin-left: 10px;
  border-radius: 3px;
  padding: 5px 15px;
}
.add:hover {
  background-color: tomato;
}
a {
  text-decoration: none;
  color: white;
  font-size: 12px;
}
i {
  color: black;
}
form {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  justify-content: center;
}
.click {
  color: white;
  font-size: 12px;
  width: 60px;
  height: 30px;
  margin-top: 5px;
  cursor: pointer;
  background-color: rgb(12, 119, 185);
  border-radius: 3px;
  font-family: "Poppins", sans-serif;
}
.click:hover {
  background-color: tomato;
}

h3 {
  font-size: 18px;
}
label {
  font-size: 14px;
}
li {
  font-size: 12px;
}
.spinner {
  margin-left: 425px;
}
</style>
