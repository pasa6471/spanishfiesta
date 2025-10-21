class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div class="container mx-auto flex justify-between items-center px-4 py-3">
          <h1 class="text-xl font-bold text-blue-600">SpanishFiesta</h1>
          <button class="text-blue-600 font-semibold hover:text-blue-800">Inicio</button>
        </div>
      </nav>
    `;
  }
}
customElements.define("custom-navbar", CustomNavbar);
