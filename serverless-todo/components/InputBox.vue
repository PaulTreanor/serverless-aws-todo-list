<template>
  <b-card class="boxy">
    <b-row>
        <form  v-on:submit.prevent="addNewItem">
            <b-col>
                <input v-model ="tempNewItem" type="text" id="item" name="item" required maxlength="100" size="35" placeholder="Deploy a serverless app">
            </b-col>
            <b-col>
                <button type="submit" class="btn btn-primary mt-3">Add</button>  
            </b-col>
        </form>
    </b-row>
  </b-card>
</template>

<script>
import Vue from "vue";
import UUID from "vue-uuid";
 
Vue.use(UUID);
import { uuid } from 'vue-uuid';

export default {
    data () {
        return {
            uuid: uuid.v1(),
            tempNewItem: "",
            url: "http://localhost:3000/dev/cars"
        }
    },

    methods: {
        addNewItem() {
            console.log("New item added ");
            
            // item object with uuid
            var newItem = {
                id: this.$uuid.v4(),
                name: this.tempNewItem
            }
            // make POST request
            this.postNewItem(newItem);
 
            // add it to local list
            this.$emit('new-item', newItem);
            this.tempNewItem = "";
        },

        async postNewItem(item) {       // POST request to dynamoDB
            await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });
        }
    }

}
</script>


