import { useContext } from "react";
import { ClientContext } from "../contexts/ClientContext";

export function useClientContext() {
  return useContext(ClientContext);
}