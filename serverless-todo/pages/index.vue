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
      todoItems: []
    }
  },
  created() {
    this.getItemsFromDB();
  },

  methods: {

    getItemsFromDB() {
      this.todoItems = [
        {
          id: 1234, 
          name: "do the dishes"
        },
        {
          id: 1235, 
          name: "deploy a serverless app"
        },
        {
          id: 1236, 
          name: "continue using Vim"
        }
      ]
    },

    addNewItem(newItem) {
      // add item to list 
      this.todoItems.push(newItem)
      console.log(this.todoItems)
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