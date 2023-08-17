<script lang="ts">
  import type { ComponentEvents } from "svelte";
  import { toBox } from "./lib/transform";
  import BlueBox from "./components/BlueBox.svelte";
  import RedBox from "./components/RedBox.svelte";
  import { calculateArea } from "./lib/calculate";
  // mediator
  let area = 0;
  let base;
  let targets = [];

  const initRedBox = (event: ComponentEvents<RedBox>["init"]) => {
    const { redBoxRect } = event.detail;
    base = toBox(redBoxRect);
    console.log({ base });
  };
  const updatePositionAndCalculate = (
    event: ComponentEvents<BlueBox>["move"]
  ) => {
    const { boxRect } = event.detail;
    targets = [toBox(boxRect)];
    area = calculateArea(base, targets);
  };
</script>

<main>
  <div class="simple-grid">
    <div>
      <BlueBox top={100} left={50} on:move={updatePositionAndCalculate} />
      <BlueBox
        top={300}
        left={50}
        height={100}
        width={100}
        on:move={updatePositionAndCalculate}
      />
    </div>
    <div>
      <RedBox on:init={initRedBox} {area} />
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
