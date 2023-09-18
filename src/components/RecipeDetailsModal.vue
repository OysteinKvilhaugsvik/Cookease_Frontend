<script lang="ts">
import { isLoggedIn, store } from '@/assets/auth-service';
import {BIconHeart, BIconHeartFill} from 'bootstrap-icons-vue';

export default {
  props: ['recipe', 'private', 'starred'],
  emits:["deleteRecipe", "close", "openEditor", "starRecipe", "unstarRecipe"],
  components: {
    BIconHeart,
    BIconHeartFill
  },
  data() {
    return {
      isStarred: this.starred,
      loggedIn: isLoggedIn(store.token)
    };
  },
  methods: {
    toggleStar() {
      this.isStarred = !this.isStarred;
      if (this.isStarred) {
        this.$emit('starRecipe', this.recipe);
      } else {
        this.$emit('unstarRecipe', this.recipe);
      }
    },
  }
};
</script>

<template>
    <div class="recipeDetailsModal" v-if="recipe">
      <div class="modalBackground" @click="$emit('close')"></div>
      <div class="modalContent">
        <div class="recipe">
            <div class="close-icon" @click="$emit('close')">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6L6 18"></path>
                <path d="M6 6L18 18"></path>
              </svg>
            </div>
            <div class="recipe-image">
              <img v-if="recipe.image" :src="recipe.image" :alt=recipe.name>
              <img v-else src="@/assets/images/image_placeholder.jpg" :alt="'Image placeholder'">
            </div>
            <div class="recipe-info">
                <h2>{{ recipe.name }}</h2>
                <p class="recipe-description">{{ recipe.description }}</p>
                <ul class="recipe-tags">
                  <li v-for="tag in recipe.tags" :key="tag.name">{{ tag.name }}</li>
                </ul>
                <div class="recipe-details">
                    <div class="recipe-details-item">
                        <strong>Difficulty:</strong> {{ recipe.difficulty }}
                    </div>
                    <div class="recipe-details-item">
                        <strong>Time Estimate:</strong> {{ recipe.timeEstimate }} min
                    </div>
                    <div class="recipe-details-item">
                        <strong>Ingredients:</strong>
                        <ul class="recipe-ingredients">
                            <li v-for="ingredient in recipe.ingredients" :key="ingredient.name">
                                {{ingredient.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="recipe-details-item">
                        <strong>Steps:</strong>
                        <ol class="recipe-steps">
                          <li v-for="step in recipe.steps" :key="step">{{step}}</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div v-if="loggedIn" class="buttonDiv">
              <BIconHeart class="favorite" @click="toggleStar" v-if="!isStarred"></BIconHeart>
              <BIconHeartFill class="favorite" @click="toggleStar" v-if="isStarred"></BIconHeartFill>
              <b-button v-if=private class="editBtn buttons" @click="$emit('openEditor', recipe)">Edit</b-button>
              <b-button v-if=private class="deleteBtn buttons" @click="$emit('deleteRecipe', recipe)">Delete</b-button>
            </div>
        </div>
      </div>
    </div>
</template>
  
<style scoped>

.favorite{
  scale: 1.5;
  margin-right: 10px;
  color: red;
}
.recipeDetailsModal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  overflow:auto;
}
.modalBackground {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modalContent {
  padding: 20px;
  border-radius: 5px;
  z-index: 101;
  margin: 20px;
  width: 95%;
  max-height: 100%;
}
.recipe {
  position: relative;
  display: flex;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
  min-width: 600px;
}
.close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
.buttonDiv {
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}
.deleteBtn {
  background-color: rgb(238, 82, 82);
  color:white;
}
.editBtn{
  background-color: rgb(82, 95, 238);
  color:white;
}
.buttons{
  border-radius: 5%;
  border:none;
  font-weight: bold;
  margin: 2px;
}
.recipe-image {
  flex: 0 0 200px;
  height: 200px;
  border-radius: 5px 0 0 5px;
  overflow: hidden;
}
.recipe-image img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.recipe-info {
  padding: 20px;
  flex: 1;
  overflow: auto;
}
.recipe-info h2 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 40px;
}
.recipe-description {
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.5;
}
.recipe-tags {
  margin-bottom: 10px;
  list-style: none;
  padding: 0;
  display: flex;
}
.recipe-tags li {
  border: 2px solid salmon;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 5px;
  font-size: 14px;
}
.recipe-details {
  display: flex;
  flex-wrap: wrap;
}
.recipe-details-item {
  flex: 1 0 50%;
  margin-bottom: 10px;
}
.recipe-details-item strong {
  width: 50px;
  font-weight: bold;
}
.recipe-ingredients li {
  margin-bottom: 5px;
  font-size: 14px;
}
.recipe-steps {
  list-style: decimal;
}
.recipe-steps li {
  margin-bottom: 5px;
  font-size: 14px;
}
</style>
  