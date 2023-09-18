<script lang="ts">
import { SERVER_URL, LOCAL_SERVER_URL } from '@/assets/config';
import type { CookeaseRecipe } from '@/assets/entities';
import RecipeList from '@/components/RecipeList.vue';
import RecipeEditor from '@/components/RecipeEditor.vue'
import {store } from "@/assets/auth-service";
import {getPropertyFromJwtToken} from "@/assets/token-utils";

export default {
    components:{
        RecipeList,
        RecipeEditor
    },
  data() {
    return {
      recipes: [] as CookeaseRecipe[],
      loading: false,
      showEditor: false,
      showStarred: false,
      editRecipe: {} as CookeaseRecipe,
    };
  },
  mounted() {
    this.fetchRecipes();
  },
  methods: {
    /**
     * Deletes a given recipe
     * @param recipe
     */
    async deleteRecipe(recipe : CookeaseRecipe){
      await this.axios.delete(SERVER_URL + "/recipes/" + recipe.id,
        {
          headers: {
            Authorization: `Bearer ${store.token}`
          }
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
      await this.fetchRecipes();
    },
    /**
     * Fetches recipes from the server
     */
    async fetchRecipes(){
      this.showEditor = false;
      this.loading = true;
      if(this.showStarred){
        await this.fetchSavedRecipes();
      }else{
        await this.fetchOwnRecipes();
      }
      this.loading = false;
    },
    /**
     * Fetches the users recipes from the server
     */
     async fetchOwnRecipes(){
      await this.axios.get(SERVER_URL + "/users/" + getPropertyFromJwtToken(store.token, "id") + "/recipes",
        {
          headers: {
            Authorization: `Bearer ${store.token}`
          }
        })
        .then(response => {
            this.recipes = response.data;      
        })
        .catch(error => {
          console.error(error);
        });
    },
    /**
     * Fetches the users recipes from the server
     */
     async fetchSavedRecipes(){
      await this.axios.get(SERVER_URL + "/users/" + getPropertyFromJwtToken(store.token, "id") + "/savedRecipes",
        {
          headers: {
            Authorization: `Bearer ${store.token}`
          }
        })
        .then(response => {
            this.recipes = response.data;      
        })
        .catch(error => {
          console.error(error);
        });
    },
    /**
     * Opens the editor view for a specific recipe
     * @param recipe
     */
    openEditor(recipe : CookeaseRecipe){
      this.showEditor = true;
      this.editRecipe = recipe;
    },
    /**
     * Updates a recipe
     * @param recipe as JSON object
     */
    async updateRecipe(recipe:any){
      await this.axios.put(SERVER_URL + "/recipes/" + recipe.id,
        recipe,
        {
          headers: {
            Authorization: `Bearer ${store.token}`
          }
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
      await this.fetchRecipes();
    },
    async toggle(answer : boolean){
      this.showStarred = answer;
      await this.fetchRecipes();
    }
  }
};
</script>

<template>
  <b-input-group v-if="!showEditor" class="d-flex justify-content-center p-4 w-100 gruuup">
    <b-button variant="primary" :pressed="!showStarred" @click="toggle(false)">Show my own recipes</b-button>
    <b-button variant="primary" :pressed="showStarred" @click="toggle(true)">Show favorited recipes</b-button>
  </b-input-group>
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <RecipeEditor v-else-if="showEditor" :recipe="editRecipe" :private="true" :newRecipe="false" @deleteRecipe="deleteRecipe" @showList="fetchRecipes" @updateRecipe="updateRecipe"></RecipeEditor>
  <RecipeList v-else-if="showStarred" :recipes="recipes" :private="false"></RecipeList>
  <RecipeList v-else :recipes="recipes" :private="true" @deleteRecipe="deleteRecipe" @openEditor="openEditor" ></RecipeList>
</template>

<style>
.toggle-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: rgb(248, 162, 13);
  color: black;
  text-decoration: none;
  border-radius: 5px;
  border:none;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  margin-top: 20px;
}
.toggle-btn:hover {
  background-color: rgb(255, 183, 131);
}

</style>