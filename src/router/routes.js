import editItem from "../components/editItem.vue";
import tableRender from "../components/tableRender.vue";
import addNew from "../components/addNew.vue";

export default [
  { path: "/", component: tableRender },
  { path: "/edit/:id", component: editItem },
  { path: "/add", component: addNew },
];
