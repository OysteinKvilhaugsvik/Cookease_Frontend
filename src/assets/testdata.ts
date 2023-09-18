// File for storing test data

// RECIPES
// Easy recipes
export const cornflakes = {
  id: "25ec851d-fcd2-438b-a720-6019cdcc6bf3",
  name: "Cornflakes",
  visibility: "Public",
  difficulty: "Easy",
  description: "An easy, fast and simple breakfast. Simply a classic for all ages!",
  timeEstimate: "2 min",
  image: "https://t4.ftcdn.net/jpg/00/53/82/15/240_F_53821531_xQ62sUAHu8u5MJxFnigJ3mCV8svrmtEa.jpg",
  tags: ["Dairy", "Corn"],
  ingredients: [
    {
      name: "Cornflakes"
    },
    {
      name: "Milk"
    }
  ],
  steps: [
    "Pour cornflakes into a bowl.",
    "Pour milk over the cornflakes.",
    "Serve and enjoy!"
  ]
};

export const pbj = {
  id: "25ec851d-fcd2-438b-a720-6019cdcc6bf3",
  name: "Peanutbutter Jelly Sandwich",
  visibility: "Public",
  difficulty: "Easy",
  description: "A peanut butter and jelly sandwich (PB&J) consists of peanut butter and fruit preserves—jelly—spread on bread.",
  timeEstimate: "5 min",
  image: "https://t4.ftcdn.net/jpg/01/87/24/55/240_F_187245570_dg8sOC6MFNaB8wpp5R4FdHJAQ0sIU15y.jpg",
  tags: ["Peanut"],
  ingredients: [
    {
      name: "Peanutbutter"
    },
    {
      name: "Bread"
    }, 
    {
      name: "Jelly"
    }
  ],
  steps: [
    "Spread peanut butter on one slice of bread.",
    "Spread jelly on another slice of bread.",
    "Place the two slices together, with the peanut butter and jelly sides facing each other.",
    "Cut the sandwich in half (if desired) and serve to Øystein."
  ]
};

export const easy_recipes = [cornflakes, pbj];

// Medium recipes
export const chicken_rice = {
  id: "3f3ee80d-70d3-4f32-8b13-84cfdcdcf14d",
  name: "Chicken and Rice",
  visibility: "Public",
  difficulty: "Medium",
  description: "This Chicken and Rice Recipe is one of my most favorite comfort foods and is simple to prepare.",
  timeEstimate: "30 min",
  image: "https://t3.ftcdn.net/jpg/02/34/40/22/240_F_234402222_1fCxnMhSU8iipIzBMgd6oNSCaM3FhEhY.jpg",
  tags: ["Bird", "Rice"],
  ingredients: [
    {
      name: "Chicken"
    },
    {
      name: "Rice"
    },
    {
      name: "Vegetables"
    }
  ],
  steps: [
    "Preheat the oven to 375°F (190°C).",
    "Combine the rice, broth, vegetables, salt, pepper, and herbs in a large baking dish.",
    "Arrange the chicken breasts on top of the rice mixture.",
    "Drizzle the olive oil over the chicken, then sprinkle with additional salt, pepper, and herbs.",
    "Cover the baking dish with foil and bake for 30 minutes.",
    "Remove the foil and bake for an additional 10-15 minutes or until the chicken is cooked through and the rice is tender.",
    "Let the chicken and rice cool for a few minutes before serving."
  ]
};


export const medium_recipes = [chicken_rice];

// Hard recipes
// Hard recipes
export const salmon = {
  id: "7c123d68-9f7d-4ba4-a4f4-4b4d0b4f8f68",
  name: "Salmon",
  visibility: "Private",
  difficulty: "Hard",
  description: "Paka refers to a silky coconut-milk-based sauce popular in East African cuisine. In this take on machi paka, a classic fish curry, quickly seared salmon takes the place of the traditional charred, grilled white fish.",
  timeEstimate: "45 min",
  image: "https://t3.ftcdn.net/jpg/01/10/26/10/240_F_110261076_gU0Ta9cFXl8KQwjL6KTZVVQLFHa9Rkyy.jpg",
  tags: ["Fish"],
  ingredients: [
    {
      name: "Salmon"
    },
    {
      name: "Potatoes"
    },
    {
      name: "Asparagus"
    }
  ],
  steps: [
    "Season salmon fillets with salt and pepper.",
    "Heat oil in a large nonstick skillet over medium-high heat.",
    "Add salmon to pan; cook 2 minutes on each side or until fish flakes easily when tested with a fork.",
    "Remove salmon from pan; keep warm.",
    "Add onion and garlic to pan; sauté 3 minutes or until tender.",
    "Stir in curry powder and red pepper; cook 1 minute.",
    "Add coconut milk and broth, stirring with a whisk.",
    "Bring to a boil; reduce heat, and simmer 5 minutes.",
    "Serve salmon with sauce."
  ]
};

const brownies = {
  id: "a73a3d3b-69e7-4f20-94f7-9d9ed5db5f5e",
  name: "Brownies",
  visibility: "Public",
  difficulty: "Medium",
  description: "Simply a classic!",
  timeEstimate: "25 min",
  image: "https://t3.ftcdn.net/jpg/02/31/21/02/240_F_231210282_bwR9xpwucgzIln1p4CXUzbJLAindnzJF.jpg",
  tags: ["dessert", "chocolate", "baking"],
  ingredients: [
    {
      name: "Flour"
    },
    {
      name: "Sugar"
    },
    {
      name: "Cocoa powder"
    },
    {
      name: "Salt"
    },
    {
      name: "Butter"
    },
    {
      name: "Eggs"
    },
    {
      name: "Vanilla extract"
    }
  ],
  steps: [
    "Preheat oven to 350°F (175°C).",
    "Grease and flour an 8-inch square baking pan.",
    "In a large saucepan, melt 1/2 cup butter.",
    "Remove from heat, and stir in sugar, eggs, and 1 teaspoon vanilla.",
    "Beat in 1/3 cup cocoa, 1/2 cup flour, salt, and baking powder.",
    "Spread batter into prepared pan.",
    "Bake in preheated oven for 25 to 30 minutes.",
    "Do not overcook.",
    "Serve warm."
  ]
};
  
export const hard_recipes = [salmon, brownies];

export const all_recipes = easy_recipes.concat(medium_recipes).concat(hard_recipes)

export const testLocalStorage = {
  "token": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ0b3JlMkBnbWFpbC5jb20iLCJzY29wZSI6IiIsImlzcyI6InNlbGYiLCJuYW1lIjoiVG9yZSIsImlkIjoiNjBmNjNkNzAtYTZiNC00NTNhLThkYTgtOTAxYTA0NThlMDYxIiwiZXhwIjoxNjgwMDIzMzA4LCJpYXQiOjE2ODAwMTk3MDgsImVtYWlsIjoidG9yZTJAZ21haWwuY29tIn0.WcuUf9bArA39QBmcWle7ur5XRTKwYLyJeEKnsswdZjVpcR1txPUlGA6RQe5srZvQQCLsY4PiQXaY9XQdBOesoLvp3fjfVGBgKwW81Ev5_-z5toOVc-Ydv8JjBty-K9STFAAw3imYW6I3T43AkRCHgBhS_AsjHYcXIvDmUcxSnqJccgdGcAxMa0eFgdYSjaGXnOoXnIpIKZhuRjo8bqRrWukwalVMh3dfHp5TbLowRNL2dITS5twtPtFJJjr2SPbfs11eUYOpdqeS9m-SJrP31U39ZMWxAqHOducFc6OKRaKtXBOp3NjVRPzljKzc6HLWB1dXjyuBCmMhODguFP4LXg"
}
