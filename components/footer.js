class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="mt-10 bg-white/70 backdrop-blur-md text-center py-4 text-sm text-gray-600">
        © ${new Date().getFullYear()} SpanishFiesta · Aprende español con diversión 🇪🇸
      </footer>
    `;
  }
}
customElements.define("custom-footer", CustomFooter);
