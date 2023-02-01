<script>
	import BottomMenu from '$components/bottom-menu.svelte';
	import WorldMap from '$components/world-map.svelte';
	import { isProtectedRoute, authUser, } from '$lib/store';
	import { onMount } from 'svelte';
	import router from 'page';
	import User from '$svgComponents/icons/user.svelte';
    import AutoComplete from "simple-svelte-autocomplete"
    import { getInvoiceToday , products, invoiceDetail, totalPrice, insertSales, getProducts, storeSelectedProduct, getInvoiceById, searchTerm, invoiceList } from '$lib/supabase-api';

    import InvoiceDetails from '$components/modals/invoice-details.svelte'


    let qty 
    let selectedProduct
    let detailsMod

	let val = '';
	
	$: searchTerm.set(val);

	onMount(async () => {
		isProtectedRoute.set(true);
		if (!$authUser) router.redirect('/');
		console.log($authUser);

        await getInvoiceToday()
	});

    async function updateTotal() {
        let total = 0
        for(var i in $invoiceDetail) {
            total += $invoiceDetail[i].price * $invoiceDetail[i].qty
        }
        totalPrice.set(total)
    }

    async function viewInvoice(i) {
        await getInvoiceById($invoiceList[i])
        detailsMod.openModal()
        updateTotal()
    }

    async function clearInvoice() {
        invoiceDetail.set([])
        qty = null
        totalPrice.set(0)
    }

    async function submitInvoice() {
        let finalInsert = {
            type: 'Invoice',
            cashier: $authUser.email,
            total: $totalPrice
        }
        await insertSales(finalInsert, $invoiceDetail)

        clearInvoice()
    }

    async function deleteProduct(i) {
        console.log($storeSelectedProduct)
        storeSelectedProduct.set($products[i])
        await deleteProductItem($storeSelectedProduct)
        await getProducts()
        closeModal()
        storeSelectedProduct.set({})
    }

</script>


<InvoiceDetails bind:this={detailsMod} />

<div class="bg-white  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 table-container">
    <div class="relative overflow-x-auto shadow-lg sm:rounded-lg p-2 custom-table">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>

                    <th scope="col" class="px-6 py-1">
                        Date
                    </th>
                    <th scope="col" class="px-6 py-1">
                        Cashier
                    </th>
                    <th scope="col" class="px-6 py-1">
                        Type
                    </th>
                    <th scope="col" class="px-6 py-1">
                        Total
                    </th>
                    <th scope="col" class="p-4">
                        <div class="flex items-center">
                            <label for="checkbox-all-search" class="sr-only">Actions</label>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each $invoiceList as item, i}
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="px-6 py-2">
                        {item.created_at}
                    </td>
                    <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.cashier} 
                    </td>
                    <td class="px-6 py-2">
                        P{item.type}
                    </td>
 
                    <td class="px-6 py-2">
                        {item.total}
                    </td>
                    <td class="w-4 px-6 py-2">
                        <div class="flex items-center">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-5" on:click={() =>viewInvoice(i)}>View</button>
                        </div>
                    </td>
                </tr>
                {/each}
           
            </tbody>
        </table>
        

    </div>
</div>



<style>
	.home-root {
		position: relative;
	}
</style>
