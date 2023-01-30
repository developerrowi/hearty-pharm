<script>
	import BottomMenu from '$components/bottom-menu.svelte';
	import WorldMap from '$components/world-map.svelte';
	import { isProtectedRoute, authUser, } from '$lib/store';
	import { onMount } from 'svelte';
	import router from 'page';
	import User from '$svgComponents/icons/user.svelte';
    import AutoComplete from "simple-svelte-autocomplete"
    import { products, invoiceDetail, totalPrice, insertSales, getProducts, storeSelectedProduct, filteredProducts, searchTerm, deleteProductItem } from '$lib/supabase-api';
    import  AddProduct from "$components/modals/add-product.svelte"
    import  UpdateProduct from "$components/modals/update-product.svelte"


    let qty 
    let selectedProduct
    let updateMod

	let val = '';
	
	$: searchTerm.set(val);

	onMount(async () => {
		isProtectedRoute.set(true);
		if (!$authUser) router.redirect('/');
		console.log($authUser);

        await getProducts()
	});

    async function addProductToInvoice() {

        if(!selectedProduct) return
        let invoices = []
        invoices =  [  ...$invoiceDetail]
        invoices.push({
            product_name: selectedProduct.name,
            qty: qty,
            price: selectedProduct.price,
        })
        invoiceDetail.set(invoices)
        console.log('changing', $invoiceDetail)

        selectedProduct = null
        qty = null
        updateTotal()
    }

    async function updateTotal() {
        let total = 0
        for(var i in $invoiceDetail) {
            total += $invoiceDetail[i].price * $invoiceDetail[i].qty
        }
        totalPrice.set(2)
    }

    async function editProduct(i) {
        storeSelectedProduct.set($products[i])
        console.log($storeSelectedProduct)
        updateMod.openModal()
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


<div class="max-w-sm p-6 bg-white p-5">
    <h5 class="text-black"> Search Product</h5>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="search" bind:value={val} id="search">    <br>
    <AddProduct />
    <UpdateProduct bind:this={updateMod} />

</div>


<div class="bg-white  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="relative overflow-x-auto shadow-lg sm:rounded-lg p-2 custom-table">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>

                    <th scope="col" class="px-6 py-1">
                        Product name
                    </th>
                    <th scope="col" class="px-6 py-1">
                        Price
                    </th>
                    <th scope="col" class="px-6 py-1">
                        Supplier Price
                    </th>
                    <th scope="col" class="px-6 py-1">
                        Category
                    </th>
                    <th scope="col" class="px-6 py-1">
                        Qty
                    </th>
                    <th scope="col" class="p-4">
                        <div class="flex items-center">
                            <label for="checkbox-all-search" class="sr-only">Actions</label>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each $filteredProducts as item, i}
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                    <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.name} 
                    </td>
                    <td class="px-6 py-2">
                        P{item.price}
                    </td>
                    <td class="px-6 py-2">
                        P{item.supplier_price}
                    </td>
                    <td class="px-6 py-2">
                        {item.category}
                    </td>
                    <td class="px-6 py-2">
                        {item.qty}
                    </td>
                    <td class="w-4 px-6 py-2">
                        <div class="flex items-center">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-5" on:click={() =>editProduct(i)}>Edit</button>

                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-5" on:click={() =>deleteProduct(i)}>Delete</button>
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
