// NIVORA — Remote image helper
window.NivoraImageLoader = {
  preload(urls = []) {
    return Promise.all(urls.map(src => new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve({src, ok:true});
      img.onerror = () => resolve({src, ok:false});
      img.src = src;
    })));
  }
};
