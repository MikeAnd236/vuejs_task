<template>
  <div id="add-new">
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
        pattern="[a-zA-Z0-9]+"
        title="Cannot contain specific letter"
        required
      />
      <label>Status</label>
      <select v-model="data.status">
        <option v-for="state in status" :key="state.id">{{ state }}</option>
      </select>
      <label>Location:</label>
      <input
        type="text"
        v-model="data.location"
        pattern="[a-zA-Z0-9]+"
        title="Cannot contain specific letter"
        required
      />
      <label>Job</label>
      <select v-model="data.job" required>
        <option v-for="jo in job" :key="jo.id">{{ jo }}</option>
      </select>
      <label>Attached Vehicle:</label>
      <input type="text" v-model="data.attachedVehicle" required />
      <!--<button class="click" @click.prevent="post" name="submit" >
        Add
      </button>-->
      <input class="click" type="submit" value="Add" />

      <button class="click">
        <router-link to="/">Cancel</router-link>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
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

    post: function () {
      this.$http
        .post("https://61d3f493b4c10c001712bb63.mockapi.io/data", this.data)
        .then(function (data) {
          console.log(data);
          this.submitted = true;
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
};
</script>

<style lang="scss">
div {
  display: flex;
  margin-top: 10px;
  font-size: 10px;
  font-family: "Poppins", sans-serif;
}
#add {
  background-color: rgb(12, 119, 185);
  color: rgb(255, 255, 255);
  border: 1px solid rgb(12, 119, 185);
  margin-left: 10px;
  border-radius: 3px;
  padding: 5px 15px;
}
#add:hover {
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
</style>
