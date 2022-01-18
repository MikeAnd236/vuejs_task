<template>
<div>
  <spinner class="spinner" v-if="load"></spinner>
  <div class="add-new" v-if="!load">
    <form v-if="submitted" @submit="post">
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
        pattern="[A-Z0-9]+"
        title="Please enter Captitalize letter"
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
export default {
  data() {
    return {
      submitted: true,
      data: {
        action: ["<i class='fas fa-pen'></i>", "<i class='fas fa-trash'></i>"],
        trailerNo: this.randomTrailer(6),
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
      load: false,
    };
  },

  methods: {
    randomTrailer: function (length) {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return "CDAS-" + result;
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
    post: function () {
      this.$http
        .post("https://61d3f493b4c10c001712bb63.mockapi.io/data", this.data, {
          before: () => {
            this.load = true;
          },
        })
        .then(function (data) {
          console.log(data);
          this.submitted = true;
          this.load = false;
          this.$router.push({ path: "/" }).catch((error) => {
            if (
              error.name !== "NavigationDuplicated" &&
              !error.message.includes(
                "Avoided redundant navigation to current location"
              )
            ) {
              console.log(error);
            }
          });
        });
    },
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
  background-color: orange;
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
}
button {
  background-color: rgb(12, 119, 185);
  border-radius: 3px;
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
}
.click:hover {
  background-color: orange;
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
.spinner{
  margin-left: 425px;
}
</style>
