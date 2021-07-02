<template>
  <b-card class="boxy itembox">
    <b-row>
      <b-col>{{itemDetails.name}}</b-col>
      <b-col>
        <b-col class="d-flex justify-content-end">
          <!---b-button class="mr-2" variant="success" >
              Update 
          </b-button-->
          <b-button variant="danger" @click="deleteItem">
              delete 
          </b-button>
      </b-col>
      </b-col>
    </b-row>
    
  </b-card>
</template>

<script>
  export default {
   props: ["itemDetails"],
   methods: {
     deleteItem() {
       this.$emit('delete-item', this.itemDetails.id);
     }
   }
  }
</script>

<style scoped>

.itembox {
  background-color: #eee;
}
</style>