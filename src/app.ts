import Router from './router';
import './global.css';

const router = new Router();

const handleRouterUpdate = async (newRouter: new () => Router) => {
  console.log("Router module updated!");
  const updatedRouter = new newRouter();
  await updatedRouter.init();
};


if (import.meta.hot) {
  import.meta.hot.accept('./router', async (newModule) => {
    await handleRouterUpdate(newModule.default);
  });
}

document.body.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    event.preventDefault();
    const path = event.target.getAttribute('href')!;
    history.pushState({}, '', path);
    router.navigate(path);
  }
});

router.init();