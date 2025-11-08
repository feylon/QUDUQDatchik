import type { Ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';



enum useApiMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}
export const useApi = (
  path: string | Ref<string>,
  method: string | useApiMethod = useApiMethod.GET,
  body: any = null,

) => {
  const config = useRuntimeConfig();
  const { apiUrl : API_URL } = config.public;
  console.log("+++", `${API_URL}${unref(path)}`)
  const token = useCookie('AccessToken');
  const refreshCookie = useCookie('RefreshToken').value as string;

  const headers: any = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token.value}`
  };

  return useFetch(() => `${API_URL}${unref(path)}`, {
    method: method as useApiMethod,
    headers,
    body,
    key: uuidv4(),
    cache: 'reload',
    lazy: false,
    server: false,
    async onResponse({ response }) {
      if (response.status === 401 || response.status === 403) {
        navigateTo('/login');
      }
    }
  });
};