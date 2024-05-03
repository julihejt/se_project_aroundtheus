// Select the overlay element
const pageOverlay = document.querySelector(".page-overlay");

// Function to close a popup modal
export function closePopup(modalElement) {
  // Remove the class to hide the modal
  modalElement.classList.remove("modal_opened");
  // Stop listening for the Escape key press
  document.removeEventListener("keydown", closeModalByEscape);
}

// Function to open a popup modal
export function openPopup(modalElement) {
  // Add a class to show the modal
  modalElement.classList.add("modal_opened");
  // Listen for the Escape key press to close the modal
  document.addEventListener("keydown", closeModalByEscape);
}

// Function to handle the Escape key press to close the modal
export function closeModalByEscape(event) {
  // Check if the pressed key is Escape
  if (event.key === "Escape") {
    // Find the currently opened modal
    const openedModal = document.querySelector(".modal_opened");
    // Close the modal
    closePopup(openedModal);
  }
}

// Function to handle clicks on the overlay to close the modal
export function handleOverlayClick(event) {
  // Check if the click occurred on the modal or its close button
  if (
    event.target.classList.contains("modal") ||
    event.target.classList.contains("modal__close")
  ) {
    // Close the modal
    closePopup(event.currentTarget);
  }
}
