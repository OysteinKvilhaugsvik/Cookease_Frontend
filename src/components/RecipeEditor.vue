<script lang="ts">
import type {Ingredient, Tag } from "@/assets/entities";
import draggable from "vuedraggable";

export interface ImgData{
    img: File,
    imgURL: string
}

export default {
  components: {
      draggable
  },
  data(){
      return{
          // Name of the recipe
          recipeName: '',
          // Visibility of recipe, private by default
          visibility: "PRIVATE",
          // Technical difficulty of the recipe, ranked by low, medium or high
          difficulty: "MEDIUM",
          // Short description of recipe
          description: "",
          // Classifiers giving an idea of what the recipe is related to
          tags: [] as string[],
          // Ingredients of the recipe
          ingredients: [] as string[],
          // Actions to take during cooking
          steps: [] as string[],
          // Estimated hours used during cooking
          hours: 0 as number,
          // Estimated minutes used during cooking
          minutes: 0 as number,
          // Total estimated time in minutes
          timeestimate: 0 as number,
          // Saves the file and URL for an image
          imgData: {} as ImgData,
          // Input for a new step to add to the steps array
          newStep: "" as string
      }
  },
  computed: {
    /**
     *  Sets CSS class based on difficulty
     */
    difficultyClass() {
      return {
        easy: this.difficulty === "EASY",
        medium: this.difficulty === "MEDIUM",
        hard: this.difficulty === "HARD",
      };
    }
  },
  props: ['recipe', 'private', 'newRecipe'],
  emits:["deleteRecipe", "updateRecipe", "createRecipe", "showList"],
  mounted(){
    if(!this.newRecipe){
      this.recipeName = this.recipe.name;
      this.visibility = this.recipe.visibility;
      this.difficulty = this.recipe.difficulty;
      this.description = this.recipe.description;
      this.tags = this.recipe.tags.map((t: Tag) => t.name);
      this.ingredients = this.recipe.ingredients.map((i: Ingredient) => i.name);
      this.steps = this.recipe.steps;
      this.timeestimate = this.recipe.timeEstimate;
      this.hours = Math.floor(this.timeestimate/60);
      this.minutes = this.timeestimate - this.hours*60;
      this.imgData.imgURL = this.recipe.image;
    }
  },
  methods: {
    /**
     * Reads in an uploaded image
     * @param img 
     */
    uploadImg(img:any){
      const imgFile = img.target.files[0]
      this.imgData.img = imgFile
      var input = img.target
      if(input.files){
          var reader = new FileReader();
          reader.onload = (e) => {
              const meh = e.target?.result!
              console.log(meh)
              if (typeof meh === "string")
                this.imgData.imgURL = meh;
          }
          reader.readAsDataURL(input.files[0])
          this.imgData.img = input.files[0];
      }
    },
    /**
     * Caluculates total estimated time from hours and minutes to minutes
     */
    toMinutes(){
        // Absolute value in case of negative input
        this.minutes = Math.abs(this.minutes);
        this.hours = Math.abs(this.hours);
        // Updating timeestimate
        this.timeestimate = this.minutes + this.hours*60;
        // Splitting timeestimate into hours and minutes, in case of input of minutes > 59 or fractional input of hours
        this.hours = Math.floor(this.timeestimate/60);
        this.minutes = this.timeestimate - this.hours*60;
    },
    /**
     * Adds a new step to the steps array
     */
    addStep() {
      if (this.newStep !== "") {
        this.steps.push(this.newStep);
        this.newStep = "";
      }
    },
    /**
     * Deletes the step with the given index in the step array
     * @param index 
     */
    deleteStep(index:number) {
      this.steps.splice(index, 1);
    },
    /**
     * Emits a createRecipe event with the necessary information in JSON format
     */
    createRecipe(){
      if(this.newRecipe){
        let recipeJson = {
          name: this.recipeName,
          visibility: this.visibility,
          difficulty: this.difficulty,
          description: this.description,
          timeEstimate: this.timeestimate,
          image: this.imgData.imgURL,
          tags: this.tags,
          steps: this.steps,               
          ingredients: this.ingredients
        }

        this.$emit('createRecipe', recipeJson)
      }
    },
    /**
     * Emits an updateRecipe event with the necessary  in JSON format
     */
    updateRecipe(){
      if(!this.newRecipe){
        let recipeJson = {
          id: this.recipe.id,
          name: this.recipeName,
          visibility: this.visibility,
          difficulty: this.difficulty,
          description: this.description,
          timeEstimate: this.timeestimate,
          image: this.imgData.imgURL,
          tags: this.tags,
          steps: this.steps,               
          ingredients: this.ingredients
        }

        this.$emit('updateRecipe', recipeJson)
      }
    }
  }
};
</script>

<template>
  <div class="recipe">
      <div class="recipe-image">
          <img v-if="imgData.imgURL" :src="imgData.imgURL" :alt=recipeName>
          <img v-else src="@/assets/images/image_placeholder.jpg" :alt="'Image placeholder'">
      </div>

      <div class="recipe-info">
        <!--Inputfield for name-->
        <label for="recipeName">Recipe name</label>
        <br>
        <input id="recipeName" v-model="recipeName">
        <br>

        <!--Inputfield for decription-->
        <label for="recipeDescription">Short description</label>
        <br>
        <textarea id="recipeDescription" class="textareainput" v-model="description"/>
        <br>

        <!--Inputfield for visibility-->
        <label for="visibility-select">Visibility:</label>
        <select id="visibility-select" v-model="visibility" default="PRIVATE">
          <option value="PRIVATE">Private</option>
          <option value="PUBLIC">Public</option>
        </select>
        <br>

        <!--Inputfield takes JPEG file types and runs the uploadImg() function-->
        <label for="imageUpload">Upload an image</label>
        <br>
        <input id="imageUpload" type="file" accept="image/JPEG" @change="uploadImg">
        <br>

        <!--Inputfield and visual for tags-->
        <strong>Tags:</strong>
        <ul class="recipe-tags">
          <li v-for="tag in tags" :key="tag">{{ tag }}</li>
        </ul>
        <label style="font-weight: normal" for="tags-basic">Type a new tag and press enter</label>
        <b-form-tags input-id="tags-basic" v-model="tags"></b-form-tags>
        <br>

        <div class="recipe-details">
            <div class="recipe-details-item">
                <!--Inputfield for difficulty-->
                <label for="dificulty-select">Difficulty:</label>
                <select id="difficulty-select" v-model="difficulty" :class="difficultyClass">
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
            </div>

            <div class="recipe-details-item">
                <strong>Time Estimate:</strong> {{timeestimate }} min
                <div class="time-inputs">
                  <!--Inputfield for estimated hours-->
                  <input id="recipeHours" type="number" v-model="hours" v-on:focusout="toMinutes" min="0" pattern="\d+">
                  <span>h</span>
                  <!--Inputfield for estimated minutes-->
                  <input id="recipeMinutes" type="number" v-model="minutes" v-on:focusout="toMinutes" min="0" max="59" pattern="\d+">
                  <span>m</span>
                </div>
            </div>

            <div class="recipe-details-item">
                <strong>Ingredients:</strong>
                <ul class="recipe-ingredients">
                    <li v-for="ingredient in ingredients" :key="ingredient">
                        {{ingredient}}
                    </li>
                </ul>
                <!--Inputfield and visual for ingredients-->
                <label for="tags-basicIngredients" style="font-weight: normal">Type a new ingredient and press enter</label>
                <b-form-tags input-id="tags-basicIngredients" placeholder="Add ingredient..." v-model="ingredients"></b-form-tags>
                <br>
            </div>

            <div class="recipe-details-item">
              <strong>Steps:</strong>
              <!--Drag and drop table for steps-->
              <div id ="recipeStepDiv">
                <table class="stepTable">
                    <draggable v-model="steps" tag="tbody" item-key="index">
                      <template #item="{ element, index }">
                        <tr>
                          <td scope="row">{{ element }}</td>
                          <td>
                            <button class="deleteBtn" @click="deleteStep(index)">  
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      </template>
                    </draggable>
                  </table>

                <!--Inputfield for steps-->
                <textarea id="recipeSteps" class="textareainput" v-model="newStep"/>
                <button @click="addStep">Add Step</button>
              </div>
          </div>
        </div>
      <div v-if=private class="buttonDiv">
        <button v-if=newRecipe class="buttons" @click="createRecipe">Create</button>
        <button v-else class="buttons" @click="updateRecipe">Save changes</button>
        <button  v-if=!newRecipe class="returnBtn buttons" @click="$emit('showList')">Return</button>
        <button  v-if=!newRecipe class="deleteBtn buttons" @click="$emit('deleteRecipe', recipe)">Delete</button>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
.recipe {
  display: flex;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
  width:100%;
}
.buttonDiv {
  position: fixed;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}
.deleteBtn {
  background-color: rgb(238, 82, 82);
  color:white;
}
.returnBtn{
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
  min-width: 100%;
  padding: 20px;

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
  width: 100%;
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
  padding-right: 20px;
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
.textareainput{
  width:100%;
  margin-bottom: 10px;
}
button {
  background-color: #4CAF50;
  color: white;
  transition: background-color 0.3s ease;
  padding: 5px;
  border: none;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
}
button:hover {
  background-color: #3e8e41;
}
label{
  font-weight: bold;
  margin-right: 10px;
}
input[type="file"] {
  cursor: pointer;
}
input{
  margin-bottom: 10px;
}
select {
  margin-bottom: 10px;
  padding: 0.5em;
  font-size: 1em;
  border: 3px solid;
  background: #fff;
  box-shadow: 0 2px 2px rgba(0,0,0,0.2);
  border-radius: 0.25em;
  appearance: none;
}
select:focus {
  outline: none;
}
select option {
  font-size: 1em;
  background: #fff;
  color: #000;
}
select option:checked {
  background: #007bff;
  color: #fff;
}
select option:hover {
  background: #f2f2f2;
}
.easy {
    border-color: green;
}
.medium {
    border-color: orange;
}
.hard {
    border-color: orangered;
}
.time-inputs {
  display: flex;
  align-items: left;
  gap: 5px;
}
.time-inputs input {
  width: 50px;
  text-align: center;
}
.time-inputs label {
  margin-bottom: 0;
}
.stepTable {
  border-collapse: collapse;
}
.stepTable td {
  padding-right: 5px;
  text-align: left;
  word-break: break-all; /* allow words to break and wrap onto a new line */
}
</style>
  