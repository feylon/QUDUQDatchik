import { defineNuxtPlugin } from "#app";
import ymaps from "ymaps";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      loadYandex: () => {
        const config = useRuntimeConfig();
        const { YANDEXAPI } = config.public;
        
        return ymaps.load(
          `https://api-maps.yandex.ru/2.1/?apikey=${YANDEXAPI}&lang=ru_RU`
        );
      },
    },
  };
});
