<template>
  <div id="add-new">
    <button id="add" @click="submitted = !submitted" v-show="submitted">
      <router-link to="/add">ADD</router-link>
    </button>
    <form v-if="!submitted">
      <h3>Add a New Item</h3>
      <label>Trailer No.:</label>
      <input type="text" v-model="data.trailerNo" />
      <label>Company:</label>
      <input type="text" v-model="data.company" />
      <label>Status:</label>
      <input type="text" v-model="data.status" />
      <label>Location:</label>
      <input type="text" v-model="data.location" />
      <label>Job</label>
      <input type="text" v-model="data.job" />
      <label>Attached Vehicle:</label>
      <input type="text" v-model="data.attachedVehicle" />
      <button class="click" @click.prevent="post">Add</button>
      <button class="click" @click="submitted = !submitted">
        <router-link to="/">Cancel</router-link>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      submitted: true,
      data: {
        action: ["<i class='fas fa-pen'></i>", "<i class='fas fa-trash'></i>"],
        trailerNo: "",
        company: "",
        status: "",
        location: "",
        job: "",
        attachedVehicle: "",
      },
    };
  },
  methods: {
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
  width: 60px;
  margin-top: 10px;
}

.click {
  color: white;
  font-size: 12px;
}
.click:hover{
  background-color: orange;
}

h3 {
  font-size: 18px;
}
label {
  font-size: 14px;
}
</style>
