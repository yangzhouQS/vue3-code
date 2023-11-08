import SvgIcon from '../svg-icon';
import {defineComponent} from 'vue';

export const IconAudit = defineComponent({
  name: 'IconAudit',
  setup() {
    return () => {
      return (
        <SvgIcon viewBox="0 0 1024 1024" size={'xlarge'}>

          <path
            d="M746.667 85.333a128 128 0 01128 128v140.8L576.555 652.31a20.373 20.373 0 00-2.134 26.283l2.134 2.517 43.2 43.2a20.373 20.373 0 0026.282 2.134l2.518-2.134 226.112-226.176v312.534a128 128 0 01-128 128H277.333a128 128 0 01-128-128V213.333a128 128 0 01128-128h469.334zM545.856 696.747a20.373 20.373 0 00-24.981 8.362l-38.784 75.862a10.176 10.176 0 0010.965 13.866l2.261-.64 93.27-16.917a20.373 20.373 0 008.96-30.784l-2.134-2.539-42.709-42.709a20.373 20.373 0 00-6.827-4.523zm-93.013-225.494H332.608a40.747 40.747 0 00-4.16 81.28l4.16.214h120.235a40.747 40.747 0 004.16-81.28l-4.16-.214zM615.765 349.1H332.587a40.747 40.747 0 00-4.16 81.237l4.16.213h283.157a40.747 40.747 0 004.16-81.258l-4.16-.214zm0-122.198H332.587a40.747 40.747 0 00-4.16 81.259l4.16.213h283.157a40.747 40.747 0 004.16-81.258l-4.16-.214z"
            fill="#FB602D"></path>
        </SvgIcon>
      );
    };
  }
});
