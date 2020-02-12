<template>
  <div class="diceContainer">
    <div class="dot" v-for="dot in diceNumber" :key="dot"></div>
  </div>
</template>

<script>
export default {
  props: {
    diceNumber: Number
  }
};
</script>

<style scoped lang="scss">
$lightRed: #ff2c2c;
.diceContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 15px;
  .dot {
    height: 15px;
    width: 15px;
    margin: 10px;
    background-color: $lightRed;
    border-radius: 50%;
  }
}
</style>
