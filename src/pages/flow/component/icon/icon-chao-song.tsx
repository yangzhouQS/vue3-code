import SvgIcon from '../svg-icon';
import {defineComponent} from 'vue';

export const IconChaoSong = defineComponent({
  name: 'IconClose',
  setup() {
    return () => {
      return (
        <SvgIcon viewBox="0 0 1024 1024" size={'xlarge'}>
          <path
            d="M797.5 760.3L458.3 655.9l339.2-391.4-443.6 391.4L93 551.5l835-443.6-130.5 652.4zM458.3 916.9V734.2l104.4 52.2-104.4 130.5z m0 0"></path>
        </SvgIcon>
      );
    };
  }
});
