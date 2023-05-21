import renderer from './renderer';

if (typeof window !== 'undefined') {
  (window as any).AssemRenderer = renderer;
}

window.addEventListener('beforeunload', () => {
  (window as any).AssemHost = null;
  renderer.dispose?.();
  (window as any).AssemRenderer = null;
})
