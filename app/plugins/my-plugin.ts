// export default defineNuxtPlugin((NuxtApp) => {
//   const config = useRuntimeConfig()
//   const YANDEX_API = config.app.YANDEX_API
// })



export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const api = config.public.apiBase;

  return {
    provide: {
      yandexApi: api,
    },
  };
});

