<script lang="ts">
import { isLoggedIn, store } from '@/assets/auth-service';
import { SERVER_URL } from '@/assets/config';
import type { CookeaseRecipe } from '@/assets/entities';
import { getPropertyFromJwtToken } from '@/assets/token-utils';
import RecipeCard from '@/components/RecipeCard.vue'
import RecipeDetailsModal from '@/components/RecipeDetailsModal.vue'

export default {
  components:{
      RecipeCard, RecipeDetailsModal
  },
  props: ['recipes', "private"],
  data() {
    return {
      selectedRecipe: {} as CookeaseRecipe,
      showRecipeModal: false,
      savedRecipes: [] as CookeaseRecipe[],
      selectedRecipeStarred: false
    };
  },
  emits: ["deleteRecipe", "openEditor"],
  methods:{
    async showRecipeDetails(recipe : CookeaseRecipe){
      this.selectedRecipe = recipe;
     
      if(isLoggedIn(store.token)){
        await this.fetchSavedRecipes();
        // Check if the selected recipes is the users saved recipes
        let ids = this.savedRecipes.map(value => value.id);
        console.log(ids);
        this.selectedRecipeStarred = ids.includes(this.selectedRecipe.id);
      }else{
        this.selectedRecipeStarred = false;
      }

      this.showRecipeModal = true; 
    },
    closeRecipeDetails(){
      this.selectedRecipe = {} as CookeaseRecipe;
      this.showRecipeModal = false; 
    },
    deleteRecipe(recipe : CookeaseRecipe){
      this.closeRecipeDetails();
      if(this.private){
        this.$emit('deleteRecipe', recipe)
      }
    },
    openEditor(recipe : CookeaseRecipe){
      this.closeRecipeDetails();
      if(this.private){
        this.$emit('openEditor', recipe)
      }
    },
    async addToSavedRecipes(recipe : CookeaseRecipe){
      await this.axios.post(SERVER_URL + "/users/" + getPropertyFromJwtToken(store.token, "id") + "/savedRecipes",
        recipe.id,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
            "Content-Type": "text/plain"
          }
        })
        .then(response => {

        })
        .catch(error => {
          console.error(error);
        });
    },
    async removeFromSavedRecipes(recipe : CookeaseRecipe){
      await this.axios.delete(SERVER_URL + "/users/" + getPropertyFromJwtToken(store.token, "id") + "/savedRecipes/" + recipe.id,
        {
          headers: {
            Authorization: `Bearer ${store.token}`
          }
        })
        .then(response => {
          
        })
        .catch(error => {
          console.error(error);
        });
    },
    async fetchSavedRecipes(){
      await this.axios.get(SERVER_URL + "/users/" + getPropertyFromJwtToken(store.token, "id") + "/savedRecipes",
        {
          headers: {
            Authorization: `Bearer ${store.token}`
          }
        })
        .then(response => {
          this.savedRecipes = response.data;      
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<template>
    <div class="recipeList">        
      <div v-if="recipes.length == 0" class="container text-center p-5">
  <div class="row">
    <div class="col-md-12">
      <h3>Nothing to see here...</h3>
    </div>
    <div class="col-md-12 mt-3">
      <b-button variant="primary" @click="() => $router.push('/createrecipe')">Create a recipe</b-button>
    </div>
  </div>
</div>
         <div v-else>
            <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" @recipe-clicked="showRecipeDetails"></RecipeCard>
        </div>
    </div>
    <RecipeDetailsModal v-if="showRecipeModal" :recipe="selectedRecipe" :private="private" :starred="selectedRecipeStarred"  
      @unstarRecipe="removeFromSavedRecipes" @starRecipe="addToSavedRecipes" @close="closeRecipeDetails" @deleteRecipe="deleteRecipe" @openEditor="openEditor"
    />
</template>

<style scoped>
.recipeLink {
  display: inline-block;
  padding: 10px 20px;
  background-color: salmon;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  margin-top: 20px;
}
.recipeLink:hover {
  background-color: #FF5739;
}
</style>