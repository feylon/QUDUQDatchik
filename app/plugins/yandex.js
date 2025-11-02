import { defineNuxtPlugin } from "#app";
import ymaps from "ymaps";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      loadYandex: () => {
        return ymaps.load(
          "https://api-maps.yandex.ru/2.1/?apikey=b8f63ef0-13fd-481b-ab33-44f60840da9d&lang=ru_RU"
        );
      },
    },
  };
});
