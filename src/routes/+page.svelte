<script>
    let disabled = $state(true);
    let isLoged = $state(false);

    function toogleClickMe() {
        disabled = !disabled;
    }
</script>

<div class="flex justify-center items-center h-screen">
    <div class="text-center">
        <button
            {disabled}
            onclick={() => console.log("Button Clicked")}
            class="px-4 py-2 bg-blue-500 text-white roudend disabled:bg-gray-400"
        >
            Click Me
        </button>

        <button
            onclick={toogleClickMe}
            class="px-4 py-2 bg-green-700 text-white roudend"
        >
            Toggle
        </button>
    </div>
    <div class="text-center">
        <p>{isLoged ? "Welcome back!" : "Login is necessary"}</p>
        <button
            class="px-4 py-2 {isLoged
                ? 'bg-red-500'
                : 'bg-green-700'} text-white roudend"
            onclick={() => {
                isLoged = !isLoged;
            }}>{isLoged ? "Logout" : "Login"}</button
        >
    </div>
</div>

<style></style>
