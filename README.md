## This document is proposal of [*Project1*](http://git.prototyping.id/20170595/Angry-Birds) by 20170595 _Yumin Jung_ 🚀

## Contents
- [Concept of the Game 🔥](#concept-of-the-game-)
  - [Angry Birds](#angry-birds)
- [Description of the Game 📚](#description-of-the-game-)
  - [Characters](#characters)
    - [Birds - Characteristics and Ability](#birds---characteristics-and-ability)
    - [Pigs - Characteristics](#pigs---characteristics)
  - [Game Mechanics and Interface](#game-mechanics-and-interface)
- [Organization of code](#organization-of-code)
  - [UML](#uml)
  - [Main Functions and Classes](#main-functions-and-classes)
  - [Design Pattern](#design-pattern)
    - [Atomic Design Pattern](#atomic-design-pattern)
    - [Observer Design Pattern](#observer-design-pattern)
    - [Factory Design Pattern](#factory-design-pattern)
  - [Class and Module](#class-and-module)
- [Main Challenge](#main-challenge)
  - [Appearance part](#appearance-part)
  - [Functional part](#functional-part)
- [Reference](#reference)

# Concept of the Game 🔥

## Angry Birds

<img src="data/img/pause-img.png" width="50%" height="50%">

`Angry Birds` is a **action-based video game** created by [Rovio Entertainment](https://www.rovio.com/).

The game series focuses on a flock of birds who try to save their eggs from green pigs.

# Description of the Game 📚

## Characters

### Birds - Characteristics and Ability
|                    Red                     |              Chuck               |              Bomb               |              Hal               |
| :----------------------------------------: | :------------------------------: | :-----------------------------: | :----------------------------: |
| <img src="data/birds/red.png" width="70%"> | <img src="data/birds/chuck.png"> | <img src="data/birds/bomb.png"> | <img src="data/birds/hal.png"> |
|                    Cute                    |             Speed Up             |           Bigger Size           |           Boomerang            |

### Pigs - Characteristics

|                      Minion                      |                      Corporal                      |                King                |
| :----------------------------------------------: | :------------------------------------------------: | :--------------------------------: |
| <img src="data/pigs/minion-pig.png" width="50%"> | <img src="data/pigs/corporal-pig.png" width="70%"> | <img src="data/pigs/king-pig.png"> |
|                The Smallest Size                 |                    Medium Size                     |          The Biggest Size          |

## Game Mechanics and Interface

- ### Home Screen
  <img src="readme-img/home-screen.png" width="80%" height="80%">

  1. home screen에서 play버튼이 아닌 다른 화면을 클릭하면 랜덤으로 앵그리 버드 캐릭터가 하늘에서 떨어진다.
  2. 유저는 화면에 있는 캐릭터들을 마우스로 드래그하여 움직일 수 있다. like mini game
  3. play 버튼을 누르면 stage를 선택하는 화면으로 넘어간다.

- ### Stage Select Screen
  <img src="readme-img/stage-screen.png" width="80%" height="80%">

  1. home screen에서 생성한 캐릭터들이 background에 그대로 남아있으며 home screen과 같이 클릭과 드래그로 즐길 수 있다.
  2. stage에 해당하는 버튼을 클릭하면 해당 스테이지 화면으로 이동한다.

- ### Stage Screen
  <img src="readme-img/stage.png" width="80%" height="80%">
  <img src="readme-img/stage-score.png" width="80%" height="80%">
  <img src="readme-img/stage-select-score.png" width="80%" height="80%">

  1. 스테이지 화면에서 공통적으로 왼쪽에 새총과 새가 존재한다.
  2. 유저는 새를 뒤로 당겨서 발사할 수 있으며 각도를 조절하여 돼지를 스크린 밖으로 내보내야 한다.
  3. 돼지가 스크린 밖으로 나가는 경우 점수를 얻으며 해당하는 점수에 따른 별의 개수가 화면에 나타난다.
  4. 남은 새는 좌측에 표시되며 새를 발사하면 하나씩 줄어든다.
  5. 스페이스바를 누르면 새가 각자 가지고 있는 능력을 사용할 수 있다.
  6. pause button을 누르면 메뉴가 나타난다.
  7. 유저가 점수를 기록하면 이는 stage의 우측 위에 나타나며 stage select screen에서도 얻은 점수가 기록된다.

- ### Pause Screen
  <img src="readme-img/pause-screen.png" width="80%" height="80%">

  1. pause screen에서는 다음과 같은 버튼이 있으며 버튼을 누르면 해당하는 기능에 따라 화면이 옮겨진다.
      - play button
      - restart button
      - home button
      - stage select button
  2. 유저는 게임 화면을 클릭할 수 없으며 네 가지 버튼 중에 하나를 선택해야 한다.

# Organization of code

## UML
This is UML of my implementation.

![uml](/readme-img/uml.png)

- 각 stage는 observer pattern을 이용하여 Subject class를 부모 클래스로 받으며 얻은 점수를 score display에 `notifySubscribers()` 함수를 사용하여 점수를 보내고 score display에서는 이 점수를 stage에 따라 구분하여 해당하는 점수에 따른 별의 개수를 부여한다.

## Main Functions and Classes
- main.js
  - getStage
  - resetStage
  - firingEvents
  - setup and draw function
    - loop()와 noLoop()를 사용하여 마치 screen이 전환하는 듯한 느낌을 주었다.
- ScoreDisplay class
- stage classes

## Design Pattern

### Atomic Design Pattern

- <img src="readme-img/atomic-design-pattern.png" width="80%" height="80%">
- Atomic design pattern helps to build consistent, solid and reusable design systems
- 코드를 구분할 때 atomic design pattern에 따라 폴더를 나누어 개발을 진행하였으며 이에 따라 재사용성을 높이고 class의 계층에 따라 이를 나눌 수 있었다.

### Observer Design Pattern
- observer design pattenrn을 이용하여 score display와 stage간 점수를 주고 받을 수 있게 하였으며 이를 통해 코드를 더욱 간결하게 짤 수 있었다.
  ```js
  // Notify event to subscribers
  this.notifySubscribers('birds', x, y);

  // Subject.js
  class Subject {
      constructor() {
          this.observers = [];
      }
      subscribe(observer) {
          if (observer != null) this.observers.push(observer);
      }
      ...
  }

  export { Subject };
  ```

### Factory Design Pattern
- factory design patten을 사용하여 각 stage를 구성하였으며 stage를 다시 시작할 때 factory design pattern을 통한 구현으로 더욱 간결하게 코드를 짤 수 있었다.

## Class and Module
How do different parts of code speak to each other?

나는 다음과 같은 방법들로 다른 부분의 코드가 서로의 정보를 주고 받을 수 있게 하였다.
- observer design pattern
- module

# Main Challenge
The main challenge of the project is,

> Implementing slingshot same as the actual Angry Birds'

<img src="readme-img/matterjs.svg" width="50%">

Therefore, I using some of the methods of [Matter.js](https://brm.io/matter-js/) library for implementation.

## Appearance part

- angry bird에서 사용되는 새총의 이미지를 게임 속 render canvas에  

## Functional part

# Reference
- ### Load Matter.js into P5.js
  - [flanniganable YouTube](https://www.youtube.com/watch?v=wcpmI8H_i8Mlist=PLuywqn95st9THjyjehRn3epVUdjbcYIAT&ab_channel=flanniganable)
- ### Implement Code with Matter.js
  - [Matter.js Documentation](https://brm.io/matter-js/docs/)
  - [Matter.js GitHub](https://github.com/liabru/matter-js)
  - [The Coding Train YouTube](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw)
  - [P5.js + Matter.js Examples](https://github.com/b-g/p5-matter-examples)
- ### Helped to Implement Angry Birds
  - [Angry Birds with Matter.js](https://www.youtube.com/watch?v=TDQzoe9nslY&ab_channel=TheCodingTrain)
  - [Angry Birds Wiki](https://angrybirds.fandom.com/wiki/Angry_Birds_Wiki)
- ### Design Pattern
  - [Atomic Design Pattern](https://danilowoz.com/blog/atomic-design-with-react)