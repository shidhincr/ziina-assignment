<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let left = 0;
  export let top = 0;
  const dispatch = createEventDispatcher();

  let isMoving = false;
  let boxRef;

  function onMouseDown() {
    isMoving = true;
    dispatch("move", { target: boxRef });
  }

  function onMouseMove(e) {
    if (isMoving) {
      left += e.movementX;
      top += e.movementY;
    }
  }

  function onMouseUp() {
    isMoving = false;
    dispatch("stop", {});
  }
</script>

<section
  on:mousedown={onMouseDown}
  style="left: {left}px; top: {top}px;"
  class="draggable blue-box"
  bind:this={boxRef}
>
  <div class="box" />
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
  .draggable {
    user-select: none;
    cursor: move;
    border: solid 1px gray;
    position: absolute;
  }
  .blue-box {
    height: 100px;
    width: 100px;
    background-color: navy;
  }
</style>
