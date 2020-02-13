<template>
  <div class="home">
    <div class="gameField">
      <app-user-card v-for="p in 2" :player="p" :key="p"></app-user-card>
      <button class="newGame" @click="startNewGame" :disabled="rolling">
        NEW GAME
      </button>
      <div v-show="dice" class="dice" id="dice">
        <app-dice-image id="diceImage" :diceNumber="dice"></app-dice-image>
      </div>
      <button class="rollDice" @click="rollDice" :disabled="rolling">
        ROLL DICE
      </button>
      <button class="hold" @click="holdScore" :disabled="rolling">HOLD</button>
    </div>
    <transition name="scale">
      <div class="alertWindow" v-if="gameEnded">
        <div class="label">PLAYER {{ winner }} WIN!</div>
        <div class="button">
          <button class="okButton" @click="startNewGame">OK</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import DiceImage from "../components/DiceImage.vue";
import UserCard from "../components/UserCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    appUserCard: UserCard,
    appDiceImage: DiceImage
  },
  data() {
    return {
      dice: null,
      rolling: false
    };
  },
  computed: {
    ...mapGetters(["score"]),
    gameEnded() {
      return this.score[0] >= 100 || this.score[1] >= 100;
    },
    winner() {
      return this.score[0] >= 100 ? 1 : 2;
    }
  },
  methods: {
    ...mapActions(["newGame", "changePlayer", "setScore", "setCurrentScore"]),
    startNewGame() {
      if (this.gameEnded || confirm("Are you sure?")) {
        this.dice = null;
        this.newGame();
      }
    },
    rollDice() {
      const promise = new Promise(resolve => {
        this.rolling = true;

        let deg = 0;
        const degInterval = setInterval(() => {
          deg += 10;
          document.getElementById("dice").style.transform = `rotate(${deg}deg)`;
        }, 10);

        const diceInterval = setInterval(() => {
          this.dice = this.getRandom();
        }, 80);

        setTimeout(() => {
          clearInterval(degInterval);
          clearInterval(diceInterval);
          this.rolling = false;
          resolve();
        }, 1800);
      });

      promise.then(() => {
        if (this.dice === 1) {
          this.setCurrentScore(0);
          this.changePlayer();
        } else {
          this.setCurrentScore(this.dice);
        }
      });
    },
    holdScore() {
      this.setScore();
    },
    getRandom() {
      return Math.floor(Math.random() * 6 + 1);
    }
  }
};
</script>

<style scoped lang="scss">
@mixin centered {
  display: flex;
  align-items: center;
  justify-content: center;
}

.home {
  @include centered;
  padding-top: 80px;
  .gameField {
    position: relative;
    display: flex;
    width: 60%;
    height: 600px;
    box-shadow: 0 0 25px #292929;
    @media (max-width: 1000px) {
      width: 95%;
    }
  }

  .newGame {
    @include centered;
    position: absolute;
    width: 12%;
    height: 5%;
    margin: 15px 44%;
    font-size: 20px;
    border: none;
    background-color: initial;
    cursor: pointer;
    &:hover {
      font-size: 19px;
    }
  }

  .dice {
    $diceSize: 120px;
    $ySize: 200px;
    $xSize: 100px;
    @include centered;
    position: absolute;
    margin: auto;
    top: $ySize;
    left: $xSize;
    bottom: $ySize;
    right: $xSize;
    width: $diceSize;
    height: $diceSize;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 15px lightgrey;
  }

  .rollDice {
    @extend .newGame;
    margin-top: 430px;
  }
  .hold {
    @extend .newGame;
    margin-top: 480px;
  }
  .alertWindow {
    position: absolute;
    display: grid;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 570px;
    background-color: #ffcfcf;
    box-shadow: 0 0 5px red;
    .label {
      font-size: 100px;
    }
    .button {
      @include centered;
    }
    .okButton {
      width: 150px;
      height: 50px;
      border: none;
      box-shadow: 0 0 5px red;
      border-radius: 10px;
      background-color: lightcoral;
      font-size: 24px;
      cursor: pointer;
      &:hover {
        font-size: 22px;
      }
    }
    @media (max-width: 1000px) {
      width: 85%;
    }
  }

  .scale-enter-active {
    animation: scale-in ease-out 0.5s;
  }
  .scale-leave-active {
    animation: scale-out ease-out 0.5s;
  }

  @keyframes scale-in {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes scale-out {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0);
    }
  }
}
</style>
