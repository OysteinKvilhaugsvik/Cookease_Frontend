export type CookeaseUser = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Ingredient = {
    name: string;
};

export type Tag = {
    name: string;
};

export type CookeaseRecipe = {
    id: string;
    name: string;
    visibility: string;
    difficulty: string;
    description: string;
    timeEstimate: number;
    image: string;
    tags: Tag[];
    steps: string[];
    ingredients: Ingredient[];
};

