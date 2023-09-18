<script lang="ts">
import {BIconSearch} from 'bootstrap-icons-vue';
export default {
    data() {
    return {
      str: '',
      searching: false
    }
  },
  components: {
    BIconSearch
  },
    methods:{
        reveal(){
            this.searching = !this.searching
        },
        search(){
            console.log(this.$route.path)
            //if(this.$route.path != '/search'){
                this.$router.push("/search?str=" + this.str);
            
        }
    }
}
</script>
<template>
    <div class="header">
        <div class="text">
            <h1 class="d-flex p-3">Cookease</h1>
        </div>
        <div class="search">
            <input type="text" v-model="str"  v-on:keyup.enter="search()">
            <BIconSearch class="srcBtn" @click="search()"></BIconSearch>
        </div>
    </div>
</template>

<style scoped>
.header {
    background-color: red;  
    background-image: linear-gradient(rgba(248, 143, 85, 1), rgba(204, 72, 42, 1));
    width: 100%;
    color: white;
    overflow: hidden;
    display: flex;
    position:relative;
    z-index: 2;
}
h1 {
    margin-left: 20px;
    font-family: 'Playfair Display', serif;
}
.text{
    overflow: hidden;
}
.search{
    position:absolute;
    right: 0;
    bottom: 0;
    margin-right: 15px;
    margin-bottom: 5px;
}
.search input{
    margin-right: 5px;
}
.srcBtn {
    color:white;
    font-size: 20px;
}
.srcBtn:hover{
  color: lightgray;
  cursor: pointer;

}
</style>