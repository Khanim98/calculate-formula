import { useQuery } from "@tanstack/react-query";

const fetchSuggestions = async (query: string) => {
  if (!query) return [];
  const res = await fetch(
    `https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete?search=${query}`
  );
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

export const useGetSuggestions = (query: string) => {
  return useQuery({
    queryKey: ["autocomplete", query],
    queryFn: () => fetchSuggestions(query), 
    enabled: Boolean(query), 
  });
};
