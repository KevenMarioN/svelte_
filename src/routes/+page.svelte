<script>
    // Use $state when you need a reactive variable
    let count = $state(0);

    // Use $derived when you need a new result derived from a $state
    let doubleCount = $derived(count * 2);

    // Use $effect when you need to execute another function when the state changes
    $effect(() => {
        console.log(`Count: ${count}, Double Count: ${doubleCount}`);
    });

    function increment() {
        count++;
    }

    function decrement() {
        count--;
    }

    function reset() {
        count = 0;
    }
</script>

<button onclick={increment}>Increment</button>
<button onclick={decrement}>Decrement</button>

<button onclick={reset}>Reset</button>

<p>Counter: {count}</p>
<p>Double Counter: {doubleCount}</p>

<style></style>
