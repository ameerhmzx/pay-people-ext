import { getAuthService } from "@/entrypoints/background/auth/auth-service.ts";

export default defineContentScript({
  matches: ["*://app.paypeople.pk/*"],
  main() {
    console.log("Hello content.");

    window.onload = async () => {
      if (window.location.hash === "#/login") {
        // auto fill saved credentials
        const credentials = await getAuthService().getCredentials();
        if (!credentials) return;

        const loginForm = document.getElementsByTagName("form").item(0);
        if (!loginForm) return;

        const inputFields = document.getElementsByTagName("input");
        const emailField = inputFields.namedItem("email");
        const passField = inputFields.namedItem("pass");
        if (!emailField || !passField) return;

        simulateTyping(emailField, credentials.email);
        simulateTyping(passField, credentials.password);
        loginForm.requestSubmit();
      }
    };
  },
});

function simulateTyping(inputElement: HTMLInputElement, text: string) {
  let index = 0;

  // Simulate typing one character at a time
  function typeCharacter() {
    if (index < text.length) {
      inputElement.value += text[index]; // Set value of the input field

      // Create and dispatch a keyboard event
      const event = new Event("input", { bubbles: true });
      inputElement.dispatchEvent(event); // Trigger the 'input' event

      // Move to the next character after a delay to simulate real typing
      index++;
      typeCharacter(); // Adjust the speed by changing the timeout value
    }
  }

  typeCharacter(); // Start typing
}
