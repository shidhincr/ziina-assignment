<script lang="ts">
  import BlueBox from "./components/BlueBox.svelte";
  import RedBox from "./components/RedBox.svelte";
  import { calculateVisibleArea } from "./lib/calculate";

  import type { Box } from "./types";
  import type { ComponentEvents } from "svelte";

  const blueBoxesConfig = [
    { top: 100, left: 50 },
    { top: 50, left: 250, height: 200, width: 200 },
    { top: 180, left: 150 },
    { top: 300, left: 50, height: 100, width: 100 },
    { top: 300, left: 220, height: 100, width: 80 },
    { top: 450, left: 150, height: 50, width: 80 },
  ];

  // mediator
  let area = 0;
  let base: Box;
  let targets = new Map();

  const initBase = (event: ComponentEvents<RedBox>["init"]) => {
    base = event.detail.baseBox;
  };

  const setTargets = (event: ComponentEvents<BlueBox>["init" | "move"]) => {
    const { overlayBoxEl, overlayBox } = event.detail;
    targets.set(overlayBoxEl, overlayBox);
  };

  const initOverlay = (event: ComponentEvents<BlueBox>["init"]) => {
    setTargets(event);
  };

  const updateOverlayPosition = (event: ComponentEvents<BlueBox>["move"]) => {
    setTargets(event);
    const overlayBoxes = Array.from(targets.values());
    area = calculateVisibleArea(base, overlayBoxes);
  };
</script>

<main>
  <div class="simple-grid">
    <div>
      {#each blueBoxesConfig as config}
        <BlueBox
          {...config}
          on:move={updateOverlayPosition}
          on:init={initOverlay}
        />
      {/each}
    </div>
    <div>
      <RedBox on:init={initBase} {area} />
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
