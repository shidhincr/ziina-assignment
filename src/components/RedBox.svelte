<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  let area;
  let observer;

  let redBox;
  const dispatch = createEventDispatcher();
  const onIntersection = (entries, obs) => {
    entries.forEach((entry) => {
      console.log({ entry, isIn: entry.isIntersecting, obs });
      if (entry.isIntersecting) {
        const { width, height } = entry.boundingClientRect();
        console.log({
          entry,
          width,
          height,
        });
      }
    });
  };

  const setupIntersectionObservers = () => {
    let options = {
      root: redBox,
      threshold: 0.5,
    };
    observer = new IntersectionObserver(onIntersection, options);
    dispatch("init", { observer });
  };

  onMount(() => {
    const bRect = redBox.getBoundingClientRect();
    area = bRect.width * bRect.height;
    setupIntersectionObservers();
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
    position: relative;
  }
  .label {
    color: #666;
  }
  .label em {
    color: #000;
  }
</style>
