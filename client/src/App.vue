<script setup lang="ts">
  import { onMounted } from 'vue';
  import { io } from "socket.io-client";
  import type { Socket } from "socket.io-client";

  const gridSize = 100;
  const gridStyle = `grid-template-columns: repeat(${gridSize}, 1fr);`;

  let socket: Socket;

  // Au moment du montage du composant, on vient ouvrir une connexion websocket entre le client et le serveur
  onMounted(() => {
    socket = io(); // On se connecte en websocket à un serveur : ici le serveur courant, donc pas besoin de préciser l'adresse
    
    socket.on("pixel", (pixel) => {
      console.log(`[FRONT] - On recoit le pixel du back : ${pixel.cellIndex} - ${pixel.color}`)
    })
  });

  function colorizeCell(cellIndex: number) {
    console.log(cellIndex);

    socket.emit("pixel", {
      cellIndex,
      color: "#F0F",
    });
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
