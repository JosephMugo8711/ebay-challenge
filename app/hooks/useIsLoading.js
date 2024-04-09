// Custom hook to manage loading state in the application
const useIsLoading = (bool) => {
    // Update local storage with the loading state
    localStorage.setItem('isLoading', bool);
    // Dispatch a custom event to notify other parts of the application about the loading state change
    window.dispatchEvent(new Event("storage"));
}

export default useIsLoading;
