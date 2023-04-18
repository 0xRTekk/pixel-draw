<script setup lang="ts">
  const gridSize = 100;
  const gridStyle = `grid-template-columns: repeat(${gridSize}, 1fr);`;

  function colorizeCell(cellIndex: number) {
    console.log(cellIndex);

    // Dire au backend que la cellule cellIndex a été colorié (en #F0F dans un premier temps)
    // await fetch(POST "/colorize", { cellIndex: cellIndex, color: "#F0F" })
    // await fetch(GET "/colors")
    // Refresh les pixels
  }
</script>

<template>
  <header>
    <h1>O'Draw</h1>
  </header>

  <main>
    <div class="grid" :style="gridStyle">
      <div
        v-for="cellIndex in gridSize * gridSize"
        :key="cellIndex"
        class="cell"
        @click="colorizeCell(cellIndex)"
      ></div>
    </div>
  </main>
</template>

<style scoped>
  h1 {
    font-size: 3rem;
    text-align: center;
    margin: 0.5rem;
  }

  .grid {
    display: grid;
    box-shadow: lightgray 0px 3px 8px;
    width: fit-content;
    cursor: pointer;
  }

  .cell {
    width: 5px;
    height: 5px;
  }
</style>
