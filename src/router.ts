import Home from './pages/home';
import About from './pages/about';

export default class Router {
  private routes: { [key: string]: any };

  constructor() {
    this.routes = {
      '/': Home,
      '/about': About,
    };
  }

  navigate(path: string) {
    const rootElement = document.getElementById('app');
    if (!rootElement) return;

    const Component = this.routes[path];
    if (Component) {
      rootElement.innerHTML = '';

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
