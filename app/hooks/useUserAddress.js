// Custom hook to fetch the user's address from the server
const useUserAddress = async () => {
    let address = {}
    // Fetch the user's address from the server API
    let response = await fetch("/api/address/get")

    if (response) {
        // Parse the response data
        let data = await response.json();
        // If data is available, assign it to the address object
        if (data) address = data
    }

    // Return the address object
    return address
}

export default useUserAddress;
