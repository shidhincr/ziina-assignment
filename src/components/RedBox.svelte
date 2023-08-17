<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  export let area: number;
  let redBox: HTMLDivElement;

  const dispatch = createEventDispatcher<{
    init: { redBoxRect: DOMRect };
  }>();

  onMount(() => {
    const redBoxRect = redBox.getBoundingClientRect();
    console.log({ redBoxRect });
    area = redBoxRect.width * redBoxRect.height;
    dispatch("init", {
      redBoxRect,
    });
  });
</script>

<section>
  <div class="red-box" bind:this={redBox} />
  <h4 class="label">
    The visible area of the redbox: <em>{area}</em>
  </h4>
</section>

<style>
  .red-box {
    height: 500px;
    width: 500px;
    background-color: tomato;
  }
  .label {
    color: #666;
  }
  .label em {
    color: #000;
  }
</style>
