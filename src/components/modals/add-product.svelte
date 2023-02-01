<script>
  import { compute_rest_props } from "svelte/internal"

  import { storeAddProduct, insertProduct, getProducts } from "$lib/supabase-api"

    let showAddModal = false

        // Get the modal
    var modal



    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        this.modal = document.getElementById("myModal");
        if (event.target == this.modal) {

            closeModal()
        }

    }

    const handle_keydown = e => {
		if (e.key === 'Escape') {
			closeModal();
			return;
		}
	};

    async function openModal() {
        showAddModal = true

    }
    
    async function closeModal() {
        showAddModal = false
    }

    async function insertNewProduct() {
        console.log($storeAddProduct)
        insertProduct($storeAddProduct)
        getProducts()
        closeModal()
        storeAddProduct.set({})
    }
 
</script>

<svelte:window on:keydown={handle_keydown}/>

<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
on:click={() =>openModal()}> Add New </button>

<!-- The Modal -->
{#if showAddModal}
    <div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="w-1/2 modal-content flex justify-center shadow-md" id="modal-main">



        <div class="max-w-xs px-10">

            <div class="flex justify-end">
                <span class="custom-close-modal" on:click={()=> closeModal()}>&times;</span>
            </div>
    
            <form class="bg-white rounded px-8 pt-6 pb-8 mb-4">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Product Name
                </label>
                <input 
                    bind:value={$storeAddProduct.name} 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="product" type="text" placeholder="eg: Biogesic">
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Price
                </label>
                <input
                    bind:value={$storeAddProduct.price}  
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="retail" type="text" placeholder="Retail Price">
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Supplier Price
                </label>
                <input
                    bind:value={$storeAddProduct.supplier_price}  
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="Supplier Price">
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Category
                </label>
                <input 
                    bind:value={$storeAddProduct.category} 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cat" type="text" placeholder="Category">
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Qty
                </label>
                <input 
                    bind:value={$storeAddProduct.qty} 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="qty" type="number" placeholder="qty">
              </div>

              <div class="flex items-center justify-between">
                <button 
                    on:click={() => {insertNewProduct()}}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button">
                  Add
                </button>
              </div>
            </form>
          </div>

    </div>

    </div>
{/if}


<style>
/* The Modal (background) */
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 50; /* Sit on top */
  padding-top: 20px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
}

/* The Close Button */
.custom-close-modal {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.custom-close-modal:hover,
.custom-close-modal:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

</style>