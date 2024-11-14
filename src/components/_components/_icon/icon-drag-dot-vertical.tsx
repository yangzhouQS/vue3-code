import { defineComponent } from "vue";
import SvgIcon from "../../vue/icons/svg-icon";
export const IconDragDotVertical = defineComponent({
  name: "IconDragDotVertical",
  setup() {
    return () => {
      return (
        <SvgIcon>
          <path
            d="M320 192a64 64 0 1 1 128 0 64 64 0 0 1-128 0z m256 0a64 64 0 1 1 128 0 64 64 0 0 1-128 0zM320 512a64 64 0 1 1 128 0 64 64 0 0 1-128 0z m256 0a64 64 0 1 1 128 0 64 64 0 0 1-128 0zM320 832a64 64 0 1 1 128 0 64 64 0 0 1-128 0z m256 0a64 64 0 1 1 128 0 64 64 0 0 1-128 0z"
            fill="#86909C"
            p-id="5386"
          ></path>
        </SvgIcon>
      );
    };
  }
});
