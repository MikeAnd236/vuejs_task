<template>
  <section>
    <p class="pagination-container">
      <span class="inner-pagination-container">
        <b> Page {{ page }} of {{ pages }} </b>
      </span>
      <span class="pagination-icon">
        <i class="fas fa-chevron-left fa-lg" @click="changePage(0)" />
        <i class="fas fa-chevron-right fa-lg" @click="changePage(1)" />
      </span>
      <span class="showing">
        Showing:
        <span
          class="showing-item"
          v-for="(amount, index) in perPageOptions"
          :key="index"
          @click="setPerPage(amount)"
          >{{ amount }}
        </span>
      </span>
    </p>
  </section>
</template>
<script>
export default {
  props: ["totalRecords", "perPageOptions"],
  data() {
    return {
      page: 1,
      perPage: this.perPageOptions[0],
    };
  },
  computed: {
    pages() {
      const remainder = this.totalRecords % this.perPage;
      if (remainder > 0) {
        return Math.floor(this.totalRecords / this.perPage) + 1;
      } else {
        return this.totalRecords / this.perPage;
      }
    },
  },
  methods: {
    setPerPage(amount) {
      this.perPage = amount;
      this.$emit("input", { page: this.page, perPage: amount });
    },
    changePage(val) {
      switch (val) {
        case 0:
          this.page = this.page > 1 ? this.page - 1 : this.page;
          break;
        case 1:
          this.page = this.page < this.pages ? this.page + 1 : this.page;
          break;
      }
      this.$emit("input", { page: this.page, perPage: this.perPage });
    },
  },
};
</script>
<style lang="scss">
.pagination-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 30px;
  margin-bottom: 10px;
  font-size: 11px;
  i {
    width: 20px;
    height: 20px;
    margin-bottom: -7px;
  }
  .inner-pagination-container {
    margin-right: 20px;
    padding-right: 10px;
    border-right: 1px solid gray;
  }
  .pagination-icon {
    border-right: 1px solid gray;
    margin-left: -5px;
  }
  .showing {
    margin: 0 5px;
    .showing-item {
      margin-left: 5px;
      cursor: pointer;
    }
    .showing-item:hover {
      color: tomato;
    }
  }
  .fas {
    color: rgb(12, 119, 185);
    cursor: pointer;
  }
  .fas:hover {
    color: tomato;
  }
}
</style>
