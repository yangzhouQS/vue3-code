import {useGlobalContext} from "@/components/vue";

export const useCursor = () => {
  const {engine} = useGlobalContext()
  // return engine.value.cursor.value
  return false
}
