import {Engine} from "@/components/core";
import {useGlobalContext} from "@/components/vue";

export const useDesigner = (): Engine => {
  const {engine} = useGlobalContext()
  return engine.value as Engine
}
