import SvgIcon from '../svg-icon';
import {defineComponent} from 'vue';

export const IconChaoSong = defineComponent({
  name: 'IconClose',
  setup() {
    return () => {
      return (
        <SvgIcon viewBox="0 0 1024 1024" size={'xlarge'}>
            <path
              d="M64 448L896 128l-128 704-446.037333-242.986667L832 192 242.986667 544.981333 64 448z m256 512v-303.018667L512 768l-192 192z"
              p-id="25346"
              fill="currentColor"
            ></path>
        </SvgIcon>
      );
    };
  }
});
