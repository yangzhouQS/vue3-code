import { defineComponent } from "vue";
import SvgIcon from "../../../utils/svg-icon";
export const IconDragDot = defineComponent({
  name: "IconDragDot",
  setup() {
    return () => {
      return (
        <SvgIcon>
          <path
            d="M128 384a64 64 0 1 1 128 0 64 64 0 0 1-128 0z m320 0a64 64 0 1 1 128 0 64 64 0 0 1-128 0z m320 0a64 64 0 1 1 128 0 64 64 0 0 1-128 0zM128 640a64 64 0 1 1 128 0 64 64 0 0 1-128 0z m320 0a64 64 0 1 1 128 0 64 64 0 0 1-128 0z m320 0a64 64 0 1 1 128 0 64 64 0 0 1-128 0z"
            fill="#86909C"
            p-id="5168"
          ></path>
        </SvgIcon>
      );
    };
  }
});
