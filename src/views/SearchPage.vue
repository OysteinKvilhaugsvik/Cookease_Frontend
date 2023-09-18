<script lang="ts">
import { SERVER_URL, LOCAL_SERVER_URL } from '@/assets/config';
import type { CookeaseRecipe } from '@/assets/entities';
import RecipeList from '@/components/RecipeList.vue'
import { store } from '@/assets/auth-service';

export default {
  components:{
      RecipeList
  },
  data() {
    return {
      recipes: [] as CookeaseRecipe[],
      loading: false,
      filterShow: false,
      searchString: "",
      filterOptions: [
          { text: 'Easy', value: 'EASY' },
          { text: 'Medium', value: 'MEDIUM' },
          { text: 'Hard', value: 'HARD' }
      ],
      filter: {
        tags: [] as string[],
        ingredients: [] as string[],
        difficulties: [] as string[]
      }
    };
  },
  mounted() {
    this.fetchRecipes();
  },
  methods: {
    getHeaders(){
      if (store.token === "") {
        return {
          "Content-Type": "application/json"
        }
      }
      return {
        Authorization: `Bearer ${store.token}`,
        "Content-Type": "application/json"
      }
    },
    clearFilter(){
      this.filter = {
        tags: [] as string[],
        ingredients: [] as string[],
        difficulties: [] as string[]
      }
      this.searchString = "";
      this.filterShow = !this.filterShow;
      this.$router.push("/search?str=" + this.searchString);
    },
    async fetchRecipes(){
      this.loading = true;
      try {
        let str = this.$route.query.str
        if(str !== undefined){
          this.searchString = str as string;
          await this.axios.post(SERVER_URL + "/recipes/search?str=" + str, this.filter,
          {
            headers: this.getHeaders()
          }
          )
          .then(response => {
              this.recipes = response.data;
              this.loading = false;
          })
          .catch(error => {
            console.error(error);
            this.loading = false;
          });
        }else{
          await this.axios.post(SERVER_URL + "/recipes/search", this.filter,
          {
            headers: this.getHeaders()
          }
          )
          .then(response => {
              this.recipes = response.data;      
              this.loading = false;
          })
          .catch(error => {
            console.error(error);
            this.loading = false;
          });
          }
      } catch (error) {
        console.log(error)
      }
    },
    async fetchRecipesWithFilter(){
      this.loading = true;
      let query = this.searchString !== "" ? "?str=" + this.searchString : "";
      await this.axios.post(SERVER_URL + "/recipes/search" + query,
        this.filter,
        {
          headers: this.getHeaders()
        }
        )
        .then(response => {
            this.recipes = response.data;      
            this.loading = false;
        })
        .catch(error => {
          console.error(error);
          this.loading = false;
        });
    }
  },
  watch:{
    $route (to, from){
        this.fetchRecipes()
    }
} 
};
</script>

<template>
  <div>
    <b-button @click="filterShow = !filterShow" variant="outline-secondary" squared="true" ><b-icon-funnel></b-icon-funnel> Filter</b-button>
    <b-collapse v-model="filterShow">
      <b-card>        
        <b-form>
          <b-form-group label="Search string:" label-for="srch">
            <b-form-input id="srch" v-model="searchString" placeholder="Search..."></b-form-input>
          </b-form-group>
          <b-form-group label="Tags:" label-for="tags">
            <b-form-tags id="tags" v-model="filter.tags" placeholder="Filter by tags..."></b-form-tags>
          </b-form-group>
          <b-form-group label="Ingredients:" label-for="ingredients">
            <b-form-tags id="ingredients" v-model="filter.ingredients" placeholder="Filter by ingredients..."></b-form-tags>
          </b-form-group>
          <b-form-group label="Difficulty" label-for="diff">
            <b-form-checkbox-group id="diff" v-model="filter.difficulties" :options=filterOptions></b-form-checkbox-group>
          </b-form-group>
          <b-button squared
                    variant="outline-success" 
                    @click="fetchRecipesWithFilter();filterShow = !filterShow">
                    Save
          </b-button>
          <b-button squared 
                    variant="outline-danger" 
                    @click="clearFilter()">
                    Clear filters
          </b-button>
        </b-form>
      </b-card>
    </b-collapse>
</div>
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <RecipeList v-else :recipes="recipes" :private=false></RecipeList>
</template>