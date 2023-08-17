<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let left = 0;
  export let top = 0;
  export let height = 80;
  export let width = 80;
  const dispatch = createEventDispatcher<{
    move: {
      boxRect: DOMRect;
    };
  }>();

  let isMoving = false;
  let boxRef: HTMLElement;

  function onMouseDown() {
    isMoving = true;
  }

  function onMouseMove(e: MouseEvent) {
    if (isMoving) {
      left += e.movementX;
      top += e.movementY;
    }
  }

  function onMouseUp() {
    if (isMoving) {
      dispatch("move", {
        boxRect: boxRef.getBoundingClientRect(),
      });
    }
    isMoving = false;
  }
</script>

<section
  on:mousedown={onMouseDown}
  style="left: {left}px; top: {top}px; height: {height}px; width: {width}px"
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
    position: absolute;
  }
  .blue-box {
    background-color: navy;
  }
</style>
