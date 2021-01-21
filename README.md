#### Dino game
Responsive dino game written in JavaScript and HTML5 Canvas

---

#### How to use in your website

##### 1)
put your canvas ID in config.js file, default is 'jesus'

```
const CANVASID = 'YOUR_CANVAS_ID';
```

##### 2)
make a game object and start the game
```
let game = new Game(); // make new game object

// start the game
game.start().then((f) => {
  console.log("the game assets has loaded successfuly with jesus christ help!");
  return true;
} , (e) => {
  console.log("the game failed to load assets " , e)
  throw e;
})
```

##### 3)
Play! <br/>
![dino](https://user-images.githubusercontent.com/54498156/105339156-0a194a00-5be5-11eb-9f08-8242feaa924f.png)

---

#### Using / updating the game
Feel free to use and/or change the game logic as it has more stuff to do! 
