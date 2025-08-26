// import apiBaseUrl from '@/apiBaseUrl';
// import axios from 'axios';

// const api = axios.create({
//   baseURL: `${apiBaseUrl}`,
//   withCredentials: true,        // crucial — includes cookies
//   withXSRFToken: true,
// });

// // helper to get CSRF cookie
// export const getCsrf = () => api.get('/sanctum/csrf-cookie');

// export default api;

import apiBaseUrl from '@/apiBaseUrl';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast'; // shadcn toast hook
import { useAuth } from '@/store/auth';
import { stat } from 'fs';

const api = axios.create({
  baseURL: `${apiBaseUrl}`,
  withCredentials: true, // crucial — includes cookies
  withXSRFToken: true,
});

// helper to get CSRF cookie
export const getCsrf = () => api.get('/sanctum/csrf-cookie');

// // Global error handler
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     let message = 'Something went wrong.';

//     if (error.response?.data?.message) {
//       message = error.response.data.message;
//     } else if (error.message) {
//       message = error.message;
//     }

//     if(error.status !== 401){
//       toast({
//         variant: 'destructive',
//         title: 'Error',
//         description: message,
//       });
//     }

//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    let message = 'Something went wrong.';
    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.message) {
      message = error.message;
    }

    const status = error.response?.status;

    if (status === 401 || status === 403 || status === 419) {
      const { setState } = useAuth;
      setState({ user: null, loading: false });
    } else if (status !== 404) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: message,
      });
    }

    return Promise.reject(error);
  }
);


export default api;
