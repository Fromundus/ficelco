import api from "./axios";

export const fetchPosts = async ({ pageParam, queryKey }) => {
  const [_key, { perPage }] = queryKey;
  const res = await api.get('/api/posts', {
    params: {
      page: pageParam,
      per_page: perPage,
    },
  });

  return {
    data: res.data.data.data,
    pagination: res.data.data,
  }
}