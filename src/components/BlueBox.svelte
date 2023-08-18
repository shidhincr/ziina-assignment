<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { Box } from "../types";
  import { toBox } from "../lib/transform";

  export let left = 0;
  export let top = 0;
  export let height = 80;
  export let width = 80;
  let zIndex = 0;

  const dispatch = createEventDispatcher<{
    init: {
      overlayBox: Box;
      overlayBoxEl: HTMLElement;
    };
    move: {
      overlayBox: Box;
      overlayBoxEl: HTMLElement;
    };
  }>();

  let isMoving = false;
  let boxRef: HTMLElement;

  function dispatchPosition(eventName: "move" | "init" = "move") {
    dispatch(eventName, {
      overlayBox: toBox(boxRef.getBoundingClientRect()),
      overlayBoxEl: boxRef,
    });
  }
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
      dispatchPosition();
      zIndex++;
    }
    isMoving = false;
  }
  onMount(() => dispatchPosition("init"));
</script>

<section
  on:mousedown={onMouseDown}
  style="left: {left}px; top: {top}px; height: {height}px; width: {width}px; z-index:{zIndex}"
  class="draggable blue-box"
  bind:this={boxRef}
>
  <div class="box">{width}x{height}</div>
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
    color: #fff;
    display: flex;
    place-items: center;
    place-content: center;
    box-shadow: 0 0 1px #fff;
  }
</style>
