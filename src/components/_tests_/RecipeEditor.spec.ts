import { describe, it, expect } from "vitest";

import {shallowMount} from "@vue/test-utils";
import RecipeEditor from "../RecipeEditor.vue";
import type {Ingredient, Tag } from "@/assets/entities";

const wrapper : any = shallowMount(RecipeEditor, {
  propsData: {
    newRecipe: true
  },
  data() {
    return {
      recipeName: '',
      visibility: "PRIVATE",
      difficulty: "MEDIUM",
      description: "",
      tags: [] as string[],
      ingredients: [] as string[],
      steps: [] as string[],
      hours: 0,
      minutes: 0,
      timeestimate: 0,
      newStep: "" as string
    }
  }
})

describe("setEstimatedTime", () => {
  it("Sets estimated time for the recipe", () => {
    wrapper.vm.hours = 2;
    wrapper.vm.minutes = 30;
    wrapper.vm.toMinutes();
    expect(wrapper.vm.timeestimate).toBe(150);
  })
})

describe("toMinutesSplitsHoursAndMinutesCorrectly", () => {
  it("Sets estimated time for the recipe and splits the total minutes into minutes and hours correctly", () => {
    wrapper.vm.hours = 2;
    wrapper.vm.minutes = 70;
    wrapper.vm.toMinutes();
    expect(wrapper.vm.timeestimate).toBe(190);
    expect(wrapper.vm.hours).toBe(3);
    expect(wrapper.vm.minutes).toBe(10);
  })
})


describe("createRecipe", () => {
  it("Emits a 'createRecipe' event with the recipe data when newRecipe is true", () => {
    wrapper.setProps({newRecipe:true});
    wrapper.setData({
      recipeName: 'Pancakes',
      visibility: 'PRIVATE',
      difficulty: 'EASY',
      description: 'A delicious breakfast treat',
      tags: ['breakfast', 'pancakes'],
      ingredients: ['flour', 'sugar', 'eggs', 'milk'],
      steps: ['Mix dry ingredients', 'Mix wet ingredients', 'Combine', 'Cook'],
      hours: 0,
      minutes: 30,
      timeestimate: 30
    });

    const recipeJson : any = {
      name: 'Pancakes',
      visibility: 'PRIVATE',
      difficulty: 'EASY',
      description: 'A delicious breakfast treat',
      timeEstimate: 30,
      image: undefined,
      tags: ['breakfast', 'pancakes'],
      steps: ['Mix dry ingredients', 'Mix wet ingredients', 'Combine', 'Cook'],
      ingredients: ['flour', 'sugar', 'eggs', 'milk']
    };

    wrapper.vm.createRecipe();
    expect(wrapper.emitted().createRecipe).toBeTruthy();
    expect(wrapper.emitted().createRecipe[0][0]).toEqual(recipeJson);
  });
});

describe("addStep", () => {
  it("Adds a step to the recipe", () => {
    wrapper.vm.newStep = 'Preheat oven to 350°F';
    wrapper.vm.addStep();
    expect(wrapper.vm.steps).toContain('Preheat oven to 350°F');
  });
});

describe("deleteStep", () => {
  it("Removes a step from the recipe", () => {
    wrapper.vm.steps = ['Mix dry ingredients', 'Mix wet ingredients', 'Combine', 'Cook'];
    wrapper.vm.deleteStep(2);
    expect(wrapper.vm.steps).toEqual(['Mix dry ingredients', 'Mix wet ingredients', 'Cook']);
  });
});

describe("updateRecipeDataFromProp", () => {
  it("Updates component data based on the recipe prop", () => {
    // Define a recipe object to use as the prop
    const recipe = {
      name: "Spaghetti Bolognese",
      visibility: "PUBLIC",
      difficulty: "MEDIUM",
      description: "A classic Italian pasta dish",
      tags: [{name:"pasta"}, {name:"meat"}] as Tag[],
      ingredients: [{name:"spaghetti"}, {name:"ground beef"}, {name:"tomato sauce"}, {name:"onion"}, {name:"garlic"}],
      steps: ["Cook spaghetti according to package directions", "Brown ground beef in a skillet", "Add onion and garlic and cook until softened", "Stir in tomato sauce and simmer for 10 minutes", "Serve sauce over spaghetti"],
      timeEstimate: 45,
    };

    // Mount the RecipeEditor component with the recipe prop
    const wrapper = shallowMount(RecipeEditor, {
      propsData: {
        recipe: recipe,
        newRecipe : false
      },
    });

    // Check that the component data matches the recipe object
    expect(wrapper.vm.recipeName).toBe(recipe.name);
    expect(wrapper.vm.visibility).toBe(recipe.visibility);
    expect(wrapper.vm.difficulty).toBe(recipe.difficulty);
    expect(wrapper.vm.description).toBe(recipe.description);
    expect(wrapper.vm.tags).toEqual(recipe.tags.map((t: Tag) => t.name));
    expect(wrapper.vm.ingredients).toEqual(recipe.ingredients.map((i: Ingredient) => i.name));
    expect(wrapper.vm.steps).toEqual(recipe.steps);
    expect(wrapper.vm.timeestimate).toBe(recipe.timeEstimate);
  });
});

describe("updateRecipe", () => {
  it("Emits a 'updateRecipe' event with the recipe data when newRecipe is false", () => {
    const recipe = {
      id: 1,
      name: "Spaghetti Bolognese",
      visibility: "PUBLIC",
      difficulty: "MEDIUM",
      description: "A classic Italian pasta dish",
      tags: [{name:"pasta"}, {name:"meat"}] as Tag[],
      ingredients: [{name:"spaghetti"}, {name:"ground beef"}, {name:"tomato sauce"}, {name:"onion"}, {name:"garlic"}],
      steps: ["Cook spaghetti according to package directions", "Brown ground beef in a skillet", "Add onion and garlic and cook until softened", "Stir in tomato sauce and simmer for 10 minutes", "Serve sauce over spaghetti"],
      timeEstimate: 45,
    };
    
    const wrapper : any = shallowMount(RecipeEditor, {
      propsData: {
        recipe: recipe,
        newRecipe : false
      },
    });

    wrapper.vm.recipeName = "Spaghetti a la Capri"

    const recipeJson : any = {
      id: 1,
      name: wrapper.vm.recipeName,
      visibility: wrapper.vm.visibility,
      difficulty: wrapper.vm.difficulty,
      description: wrapper.vm.description,
      tags: wrapper.vm.tags,
      ingredients: wrapper.vm.ingredients,
      steps: wrapper.vm.steps,
      timeEstimate: wrapper.vm.timeestimate,
      image: undefined
    };

    wrapper.vm.updateRecipe();
    expect(wrapper.emitted().updateRecipe).toBeTruthy();
    expect(wrapper.emitted().updateRecipe[0][0]).toEqual(recipeJson);
  });
});

