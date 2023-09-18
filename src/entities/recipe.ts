interface Recipe{
    name: string;
    difficulty: string;
    tags: [{id:number,tagTxt:string}];
    steps: [{id: number,stepTxt:string}];
    timeestimate: number;
    private: boolean;
    imgData: {img: File,imgURL: string};
}

export{}

/*function setName(name: string){
    name = name;
}
function getName():string{
    return this.name
}

function setDifficulty(difficulty: string){
    difficulty = difficulty;
}
function getDifficulty():string{
    return this.difficulty
}

function addTag(tag: {id: number,tagTxt: string}){
    tags.push(tag);
}
function removeTag(tag: {id: number,tagTxt: string}){
    tags = tags.filter((t) => t !== tag)
}

function addStep(step: {id: number,stepTxt: string}){
    tags.push(step);
}
function removeStep(step: {id: number,stepTxt: string}){
    tags = tags.filter((t) => t !== step)
}

function setTimeestimate(timeestimate:number){
    this.timeestimate = timeestimate;
}
function getTimeestimate():{hours: number,mins: number}{
    let num = this.timeestimate%60;
    let hours = (this.timeestimate-num)/60;
    let mins = num;
    return {hours,mins};
}

function setPrivate(){
    this.private = !this.private;
}
function getPrivate():boolean{
    return this.private;
}

function addImage(image: {img: File,imgURL: string}){
    this.imgData.img = image.img;
    this.imgData.imgURL = image.imgURL;
}
function getImage():{img: File,imgURL: string}{
    return this.imgData
}*/