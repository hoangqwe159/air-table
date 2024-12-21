import { addManyBases } from "@/store/reducers/baseSlice";
import {  setSelectedBase } from "@/store/reducers/menuSlice";
import { fetchBases, fetchTableMetadata } from "@/utils/mock";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function useBaseData() {
  const dispatch = useDispatch();

  const { data: bases } = useQuery({
    queryKey: ['bases'],
    queryFn: async () => {
      const response = await fetchBases();
      return response;
    },
  });

  useEffect(() => {
    if (bases) {
      dispatch(addManyBases(bases));
      dispatch(setSelectedBase(bases[0]?.id));
    }
  }, [bases, dispatch]);
}

export const getTableMetadataOptions = (ids: string[]) => {
  return {
    queryKey: ["tableMetadata", ids],
    queryFn: async () => {
      const response = await fetchTableMetadata(ids);
      return response;
    },
  };
}