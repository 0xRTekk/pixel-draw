<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { io } from "socket.io-client";
  import type { Socket } from "socket.io-client";
  import { VSwatches } from "vue3-swatches";
  import "vue3-swatches/dist/style.css"

  interface Pixel {
    cellIndex: number;
    color: string;
  }

  const gridSize = 100;
  const gridStyle = `grid-template-columns: repeat(${gridSize}, 1fr);`;

  let socket: Socket;

  const cellRefs = ref<HTMLElement[]>([]);
  const colorRef = ref("#F0F");

  // Au moment du montage du composant, on vient ouvrir une connexion websocket entre le client et le serveur
  onMounted(() => {
    socket = io(); // On se connecte en websocket à un serveur : ici le serveur courant, donc pas besoin de préciser l'adresse
    
    socket.on("pixels", (pixels: Pixel[]) => {
      pixels.forEach((pixel) => {
        displayPixel(pixel);
      });
    });

    socket.on("pixel", (pixel: Pixel) => {
      console.log(`[FRONT] - On recoit le pixel du back : ${pixel.cellIndex} - ${pixel.color}`);
      displayPixel(pixel);
    });
  });

  function displayPixel(pixel: Pixel) {
    // On va venir recup le pixel qu'il faut MaJ dans le front
    const cellDiv = cellRefs.value[pixel.cellIndex];
    // Lui appliquer la nouvelle couleur
    cellDiv.style.backgroundColor = pixel.color;
  }

  function colorizeCell(cellIndex: number) {
    console.log(cellIndex);

    socket.emit("pixel", {
      cellIndex: cellIndex - 1, // Pour ne pas avoir le décallage
      color: colorRef.value,
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
        ref="cellRefs"
      ></div>
    </div>

    <div>
      <VSwatches v-model="colorRef" />
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
