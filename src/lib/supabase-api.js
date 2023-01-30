import supabase from '$lib/supabase'
import { countriesStore, authUser } from '$lib/store';
import { writable, derived } from 'svelte/store';
import { getToday, getTomorrow } from '$lib/utils';



export const invoiceId = writable(null);

export const invoiceDetail = writable([]);

export const invoiceList = writable([]);

export const totalPrice = writable(0);

export const storeSelectedProduct = writable({});

export const storeAddProduct = writable({});

export const searchTerm = writable('');

export const products = writable([]);

export const lowProductsQty = writable([])

export const filteredProducts = derived(
	[searchTerm, products], 
	([$searchTerm, $products]) => $products.filter(x => {
        let item = JSON.stringify(x).toLowerCase()
        return item.includes($searchTerm.toLowerCase())
    })
);



export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    authUser.set(user)
}

export async function getCountries() {
    let { data: data, error } = await supabase
        .from('countries')
        .select('name')

    countriesStore.set(data)
}



export async function getProducts() {
    let { data: product, error } = await supabase
        .from('product')
        .select('*')

        console.log(product)
        products.set(product)
}

export async function getProductById(id) {
    let { data: product, error } = await supabase
        .from('product')
        .select('*')
        .eq('id', id)
        return data 
}

export async function updateProduct(newValue) {
    const { data, error } = await supabase
        .from('product')
        .update(newValue)
        .eq('id', newValue.id)
        return data
}

export async function insertProduct(value) {
    // array
    const { data, error } = await supabase
        .from('product')
        .insert(value)
        .select()
        return data
}

export async function updateProductInventory(productName, x) {
    let { data, error } = await supabase
        .rpc("updateinventoryitems", {  
        product_name: productName, 
        product_n: x
    })
    return data
}

export async function getNotificationInventory() {
    
}

export async function getInventory() {

}

export async function getInventoryById(id) {

}

export async function updateInventory(id, newValue) {

}

export async function insertInventory(value) {

}

export async function getInvoice(fromDate, toDate) {
    let { data: invoice, error } = await supabase
        .from('invoice')
        .select(`*`)  
        .lte('created_at', toDate)
        .gte('created_at', fromDate);
        return data
}

export async function getInvoiceToday() {
    let { data: invoice, error } = await supabase
        .from('invoice')
        .select(`*`)
        .gte('created_at', getToday())
        .lte('created_at', getTomorrow());
        invoiceList.set(invoice)
        return invoice
}

export async function getInvoiceById(value) {
    let { data, error } = await supabase
        .from('invoice')
        .select(`
        *,
        invoice_details (
            *
        )
        `)
        .eq('id', value.id)
        invoiceDetail.set(data[0].invoice_details)
}

export async function insertSales(invoice, invoiceDetails) {
    const { data, error } = await supabase
        .from('invoice')
        .insert(invoice)
        .select()

    let invoiceID = data[0].id

    for(var i in invoiceDetails) { 
        invoiceDetails[i].invoice_id = invoiceID 
    }

    console.log('inserting to invoice details')
    const { main, err } = await supabase
        .from('invoice_details')
        .insert([...invoiceDetails])
    console.log(main)

    for(var i in invoiceDetails) { 
        await updateProductInventory(invoiceDetails[i].product_name, -invoiceDetails[i].qty)
    }

}



export async function deleteInvoiceDetails(value) {
    const { data, error } = await supabase
        .from('invoice_details')
        .delete()
        .eq('id', value)
        return data
}


export async function deleteProductItem(value) {
    const { data, error } = await supabase
        .from('product')
        .delete()
        .eq('id', value.id)
        return data
}


export async function getTotalSales(fromDate, toDate) {
    let { data, error } = await supabase
    .rpc("gettotalinvoicesales", {
      fromdate: fromDate, 
      todate: toDate
    })
    console.log(data)
    return data
}

export async function lowInventory() {
    const { data, error } = await supabase
        .from('product')
        .select('*')
        .lte('qty', 10)


    lowProductsQty.set(data)
}
