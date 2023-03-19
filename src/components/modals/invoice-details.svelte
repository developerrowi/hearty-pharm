<script>
    import { compute_rest_props } from "svelte/internal"

    import { storeSelectedProduct, updateProduct, getProducts, deleteProductItem, invoiceDetail, totalPrice } from "$lib/supabase-api"
  
  
  
      let showAddModal = false
  
          // Get the modal
      var modal

      
  
  
  
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          this.modal = document.getElementById("updateProductModal");
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
  
      export async function openModal() {
          showAddModal = true
  
      }
      
      async function closeModal() {
          showAddModal = false
      }

      async function updateProductItem() {
        console.log($storeSelectedProduct)
        await updateProduct($storeSelectedProduct)
        await getProducts()
        closeModal()
        storeSelectedProduct.set({})
    }
   
  </script>
  
  <svelte:window on:keydown={handle_keydown}/>
  
  <!-- The Modal -->
  {#if showAddModal}
      <div id="updateProductModal" class="modal">
  
      <!-- Modal content -->
      <div class="w-full modal-content flex justify-center" id="modal-main">
  
  
  
          <div class="px-10">
  
              <div class="flex justify-end">
                  <span class="custom-close-modal" on:click={()=> closeModal()}>&times;</span>
              </div>
      
                <div class="relative overflow-x-auto shadow-lg sm:rounded-lg p-5 custom-table">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
            
                                <th scope="col" class="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Qty
                                </th>
                                <th scope="col" class="px-6 py-3">
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
                            {#each $invoiceDetail as item, i}
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.product_name}
                                </td>
                                <td class="px-6 py-4">
                                    P{item.price}
                                </td>
                                <td class="px-6 py-4">
                                    {item.qty}
                                </td>
                                <td class="px-6 py-4">
                                    P{item.price * item.qty}
                                </td>
                                <td class="w-4 p-4">
                                    <div class="flex items-center">
                                        <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-5" on:click={() =>removeInvoice(i)}>Delete</button> -->
                                    </div>
                                </td>
                            </tr>
                            {/each}
                
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="w-4 p-4 text-lg">Total</td>
                                <td class="w-4 p-4"></td>
                                <td class="w-4 p-4"></td>
                                <td class="w-4 p-4"> <h2 class="text-lg"> <strong> P{$totalPrice} </strong>  </h2> </td>
                                <td class="w-4 p-4"></td>
                            </tr>
                    
                        </tbody>
                    </table>
                    

                </div>

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
    padding-top: 100px; /* Location of the box */
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
    width: 50%;
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