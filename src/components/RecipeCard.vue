<script lang="ts">
  import { defineComponent } from 'vue';
  import type { CookeaseRecipe } from '@/assets/entities';
  
  export default defineComponent({
    props: {
      recipe: {
        type: Object as () => CookeaseRecipe,
        required: true,
      },
    }
  });
  </script>

<template>
  <div>
    <b-card no-body class="overflow-hidden" style="max-width: 700px;">
      <b-row no-gutters style="height: 200px;">
        <b-col md="6" class="image-col"
            :style="{ 
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url(${recipe.image})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '200px', 
            objectFit: 'contain' 
            }" 
            @click="$emit('recipe-clicked', recipe)">
          
            <b-card-footer style="border-color: transparent; background-color: transparent; width: 50%; position: absolute; bottom: 0;">
              <div class="d-flex justify-content-between">
                <div>
                  <span class="text" style="margin-right: 5px;">Difficulty: </span>
                  <span v-if="recipe.difficulty === 'EASY'">
                    <span class="dot green"></span>
                    <span class="hollowDot"></span>
                    <span class="hollowDot"></span>
                  </span>
                  <span v-if="recipe.difficulty === 'MEDIUM'">
                    <span class="hollowDot"></span>
                    <span class="dot yellow"></span>
                    <span class="hollowDot"></span>
                  </span>
                  <span v-if="recipe.difficulty === 'HARD'">
                    <span class="hollowDot"></span>
                    <span class="hollowDot"></span>
                    <span class="dot red"></span>
                  </span>
                </div>
            <div>
              <span class="text float-right">
                Time estimate: {{ recipe.timeEstimate }} min 
              </span> 
            </div>        
            </div>           
          </b-card-footer>
        </b-col>

        <b-col md="6">
          <b-card-body>
            <h5 class="card-title">{{ recipe.name }}</h5>
            <b-card-text class="description" style="font-size: medium;">
              {{ recipe.description }}
            </b-card-text>
            <b-card-text style="overflow: hidden;">
              <ul class="recipe-tags">
                  <li v-for="tag in recipe.tags" :key="tag.name">{{ tag.name }}</li>
              </ul>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<style scoped>
.card-title{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.description {
  overflow: hidden;
  white-space:normal;
  height: 100px;
  text-overflow: ellipsis;
}
.image-col {
  height: 400px; /* Adjust the height as per your requirement */
  background-position: center;
  background-size: cover;
  color: white;
}
.recipe-tags {
  list-style: none;
  padding: 0;
  display: flex;
}
.recipe-tags li {
  border: 2px solid salmon;
  padding: 2px 10px;
  margin-right: 5px;
  border-radius: 5px;
  font-size: 12px;
  margin:px;
}

.text {
  font-style: italic;
  color:lightgray;
  font-size:90%;
}

.hollowDot {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  background-color: transparent;
  border: 1.5px solid lightgrey;
}

.dot {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  background-color: aliceblue;
}

.green {
  background-color: #009e00;
}

.yellow {
  background-color: #cccc00;
}

.red {
  background-color: #cc0000;
}
</style>




