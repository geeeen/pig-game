<template>
  <div class="home">
    <div class="gameField">
      <app-user-card :player="1"></app-user-card>
      <app-user-card :player="2"></app-user-card>
      <div class="newGame">NEW GAME</div>
      <div class="dice">{{ dice }}</div>
      <div class="rollDice" @click="rollDice">ROLL DICE</div>
      <div class="hold" @click="holdScore">HOLD</div>
    </div>
  </div>
</template>

<script>
import UserCard from "../components/UserCard.vue";
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    appUserCard: UserCard
  },
  data() {
    return {
      dice: this.getRandom()
    };
  },
  methods: {
    ...mapActions(["changePlayer", "setScore", "setCurrentScore"]),
    rollDice() {
      this.dice = this.getRandom();
      if (this.dice === 1) {
        this.setCurrentScore(0);
        this.changePlayer();
      } else {
        this.setCurrentScore(this.dice);
      }
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
    cursor: pointer;
    &:hover {
      font-size: 19px;
    }
  }

  .dice {
    $diceSize: 100px;
    @include centered;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: $diceSize;
    height: $diceSize;
    background-color: lightgreen;
  }

  .rollDice {
    @extend .newGame;
    margin-top: 430px;
  }
  .hold {
    @extend .newGame;
    margin-top: 480px;
  }
}
</style>
