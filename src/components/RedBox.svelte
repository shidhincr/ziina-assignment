<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { toBox } from "../lib/transform";
  import type { Box } from "../types";
  export let area: number;
  let redBox: HTMLDivElement;

  const dispatch = createEventDispatcher<{
    init: { baseBox: Box; baseBoxEl: HTMLDivElement };
  }>();

  onMount(() => {
    const redBoxRect = redBox.getBoundingClientRect();
    area = redBoxRect.width * redBoxRect.height;
    dispatch("init", {
      baseBox: toBox(redBoxRect),
      baseBoxEl: redBox,
    });
  });
</script>

<section>
  <div class="red-box" bind:this={redBox}>500x500</div>
  <h4 class="label">
    The visible area of the redbox: <em>{area}</em>
  </h4>
</section>

<style>
  .red-box {
    height: 500px;
    width: 500px;
    background-color: tomato;
    color: #fff;
    display: flex;
    place-items: center;
    place-content: center;
  }
  .label {
    color: #666;
  }
  .label em {
    color: #000;
  }
</style>
