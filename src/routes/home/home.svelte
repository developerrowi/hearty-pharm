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
<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dashboard-card">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Daily Sales:</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {dailySales ? 'P' + dailySales : 'No available sales today'}
    </p>

</div>

<div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10 low-inventory-card dashboard-card">
    <div class="flex items-stretch">
        <div>
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Low Inventory:</h5>
            </a>
        </div>
        <div class="py-12"></div>
        <div class="py-8"></div>
    </div>


    {#each $lowProductsQty as item, i}
    <div class="flex justify-between low-inventory-items">
        <div class=""> {item.name} </div>
        <div class="py-4"></div>
        <div class="">{item.qty} left</div>
    </div>

    {/each }

</div>
<style>
	.home-root {
		position: relative;
	}
    .low-inventory-card {
        height: 600px;
        width: 600px;
        overflow-y: auto;
    }
    .low-inventory-items {
        border-bottom: 1px solid black;
        margin-top: 20px;
    }
</style>
