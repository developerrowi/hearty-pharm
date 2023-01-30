<script>
	import BottomMenu from '$components/bottom-menu.svelte';
	import WorldMap from '$components/world-map.svelte';
	import { isProtectedRoute, authUser } from '$lib/store';
	import { onMount } from 'svelte';
	import router from 'page';
	import User from '$svgComponents/icons/user.svelte';
    import { getTotalSales, lowInventory, lowProductsQty } from '$lib/supabase-api';
    import { getToday, getTomorrow } from '$lib/utils';

    let dailySales
	onMount(async () => {
		isProtectedRoute.set(true);
		if (!$authUser) router.redirect('/');
		console.log(authUser);

        dailySales = await getTotalSales(getToday(), getTomorrow())
        await lowInventory()
	});
</script>
<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Daily Sales:</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        P{dailySales}
    </p>

</div>

<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Low Inventory:</h5>
    </a>
    {#each $lowProductsQty as item, i}
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {item.name}: {item.qty} left
    </p>
    {/each }

</div>
<style>
	.home-root {
		position: relative;
	}
</style>
