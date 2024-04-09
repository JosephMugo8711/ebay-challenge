// Custom hook to create or update the user's address
const useCreateAddress = async (details) => {
    // Set the URL based on whether it's a create or update operation
    let url = 'create' // default
    if (details.addressId) url = 'update' // end url to update

    // Make a POST request to the server API with the address details
    const response = await fetch(`/api/address/${url}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            addressId: details.addressId,
            name: details.name,
            address: details.address,
            zipcode: details.zipcode,
            city: details.city,
            country: details.country,
        })
    })

    // Parse the response data
    const data = await response.json();

    // Return the response data
    return data
}

export default useCreateAddress;
