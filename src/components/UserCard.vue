<template>
  <div class="userCard" :class="{ activeCard: active }">
    <div class="header">
      <div class="player">PLAYER {{ player }}</div>
      <div class="dot" v-if="active" />
    </div>
    <div class="totalScore">
      {{ score[player - 1] }}
    </div>
    <div class="footer">
      <div class="currentScore">
        <div>CURRENT</div>
        <div>{{ currentScore[player - 1] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserCard",
  props: {
    player: Number
  },
  computed: {
    ...mapGetters(["activePlayer", "score", "currentScore"]),
    active() {
      return this.player === this.activePlayer + 1;
    }
  }
};
</script>

<style scoped lang="scss">
$lightRed: #ff2c2c;
@mixin centered {
  display: flex;
  align-items: center;
  justify-content: center;
}
.userCard {
  width: 50%;
  .header {
    margin-top: 75px;
    @include centered;
    .player {
      font-size: 40px;
    }
    .dot {
      height: 15px;
      width: 15px;
      margin: 10px;
      background-color: $lightRed;
      border-radius: 50%;
    }
  }
  .totalScore {
    @include centered;
    height: 50%;
    font-size: 80px;
    color: $lightRed;
  }
  .footer {
    @include centered;
    .currentScore {
      display: grid;
      align-items: center;
      justify-content: center;
      width: 150px;
      height: 100px;
      background-color: $lightRed;
      box-shadow: 0 0 5px $lightRed;
      div:last-child {
        font-size: 35px;
        text-align: center;
        color: white;
      }
    }
  }
}
.activeCard {
  background-color: aliceblue;
  font-weight: bold;
}
</style>
