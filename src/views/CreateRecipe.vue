
<script lang="ts">
import { SERVER_URL, LOCAL_SERVER_URL} from '@/assets/config';
import {store } from "@/assets/auth-service";
import {getPropertyFromJwtToken} from "@/assets/token-utils";
import RecipeEditor from '@/components/RecipeEditor.vue'

export default{
    name: 'CreateRecipe',
    components: {
      RecipeEditor
    },
    methods: {
      /**
       * Creates a recipe
       * @param recipe as JSON object
       */
      createRecipe(recipe:any){
        this.axios.post(SERVER_URL + '/recipes/' +  getPropertyFromJwtToken(store.token, "id") ,
          recipe,
          {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.token}`
            }
          }).then((response) => {
              console.log(response);
              alert("Recipe created");
              this.$router.push("/myrecipes");
            }).catch((error) => {
              console.log(error);
              alert("Error creating recipe!");
            })
      }
    }
}
</script>

<template>
  <RecipeEditor :private="true" :newRecipe="true" @createRecipe="createRecipe"></RecipeEditor>
</template>

  
