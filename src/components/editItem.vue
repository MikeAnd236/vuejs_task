<template>
  <div>
    <form @submit="editItem">
      <h3>Edit Item</h3>
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
      <button class="click">Save</button>
      <button class="click">
        <router-link to="/" exact>Cancel</router-link>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        action: [`<i class='fas fa-pen'></i>", "<i class='fas fa-trash'></i>`],
        trailerNo: "",
        company: "",
        status: "",
        location: "",
        job: "",
        attachedVehicle: "",
      },
      id: this.$route.params.id,
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
          payload
        )
        .then(function (data) {
          console.log(data);
          this.$router.push('/')
        });
    },
  },
};
</script>

<style lang="scss">

</style>
