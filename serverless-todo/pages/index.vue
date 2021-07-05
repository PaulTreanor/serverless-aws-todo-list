<template>
  <b-container>
    <h1>Todo list</h1>
    <InputBox v-on:new-item='addNewItem'/>
    <div class="itemarea" v-for="item in todoItems" :key="item.id">
      <ItemBox v-bind:itemDetails="item" v-on:delete-item="deleteItem"/>
    </div>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      todoItems: [],
      url: "http://localhost:3000/dev/cars"
    }
  },
  created() {
    this.getItemsFromDB();
  },

  methods: {

    getItemsFromDB() {
      fetch(this.url)
      .then(response => response.json())
      .then(data => {
        this.todoItems = data.cars.Items
      });
    },

    deleteItem(itemId) {
      this.todoItems = this.todoItems.filter(item => item.id !== itemId)
      console.log(this.todoItems)

      // delete item in DB 
      fetch('url/delete/id')
      .then(response => response.json())
      .then(data => console.log(data));
    }
  }
}
</script>





<style>
.boxy {
    border: 1px solid grey;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.4);
    margin-bottom: 20px;
}

</style>