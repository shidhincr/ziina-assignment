<script lang="ts">
  import BlueBox from "./components/BlueBox.svelte";
  import RedBox from "./components/RedBox.svelte";
  // mediator
  let observer, target;
  const initObserver = (event) => {
    observer = event.detail.observer;
  };
  const setTarget = (event) => {
    target = event.detail.target;
    if (observer) {
      observer.unobserve(target);
    }
  };
  const observeInteraction = () => {
    if (observer && target) {
      observer.observe(target);
    }
  };
</script>

<main>
  <div class="simple-grid">
    <div>
      <BlueBox
        top={100}
        left={50}
        on:move={setTarget}
        on:stop={observeInteraction}
      />
    </div>
    <div>
      <RedBox on:init={initObserver} />
    </div>
  </div>
</main>

<style>
  .simple-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
</style>
