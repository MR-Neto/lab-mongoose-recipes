const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost:27017/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


const recipeSchema = new Schema ({

title: {
  type: String,
  required: true,
  unique: true
},
level: {
  type: String,
  enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
},
ingredients: {
  type: Array
},
cuisine: {
  type: String,
  required: true,
},
dishType: {
  type: String,
  enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert','Other']
},
image: {
  type: String,
  default: 'https://images.media-allrecipes.com/images/75131.jpg'
},
duration: {
  type: Number,
  min: 0
},
creator: String,
created: {
  type: Date,
  default: Date.now
}
})


const Recipe = mongoose.model('recipe', recipeSchema);

const recipeExample ={
  title:"salad",
  level:"Easy Peasy",
  ingredients:["lettuce","tomato","cheese"],
  cuisine:"mediterranean",
  dishType:"Dish",
  duration:10,
  creator:"gypsy kings"
}



Recipe.create(recipeExample)
.then((result) => {
    console.log(result.title);
    mongoose.connection.close();
  })
.catch((err) => {
    console.log('there is an error', err);
});

Recipe.update({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 }}, () => {
  console.log('Success updated!!!');
  mongoose.connection.close();
});

Recipe.deleteOne({ title: 'Carrot Cake' }, () => {
  console.log("Success deleted!!");
  mongoose.connection.close();
});

Recipe.insertMany(data)
.then((result) => {
    console.log(result.map(item => item.title));
    mongoose.connection.close();
  })
.catch((err) => {
    console.log('there is an error', err);
});