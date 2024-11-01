import {useGlobalContext} from "../context";

export const useCursor = () => {
  const {engine} = useGlobalContext()
  // return engine.value.cursor.value
  return false
}
