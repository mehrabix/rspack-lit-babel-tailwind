export default class Router {
  private routes: { [key: string]: () => Promise<any> };

  constructor() {
    this.routes = {
      '/': () => import('./pages/home'),
      '/about': () => import('./pages/about'),
    };
  }

  async navigate(path: string) {
    const rootElement = document.getElementById('app');
    if (!rootElement) return;

    const routeLoader = this.routes[path];
    if (routeLoader) {
      rootElement.innerHTML = '';

      const { default: Component } = await routeLoader();
      const componentInstance = new Component();
      
      rootElement.appendChild(componentInstance);

      componentInstance.render();
    }
  }

  init() {
    this.navigate(window.location.pathname);
    window.addEventListener('popstate', () => this.navigate(window.location.pathname));
  }
}
