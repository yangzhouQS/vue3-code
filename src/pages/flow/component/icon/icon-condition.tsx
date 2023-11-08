import SvgIcon from '../svg-icon';
import {defineComponent} from 'vue';

export const IconCondition = defineComponent({
    name: 'IconClose',
    setup() {
        return () => {
            return (
                <SvgIcon viewBox="0 0 1024 1024" size={'xlarge'}>
                    <path
                        d="M365.696 329.088V41.984h269.056V328.96H365.696z m76.8-210.304V252.16h115.456V118.784h-115.456zM711.296 994.688V707.584h269.056V994.56H711.296z m76.8-210.304V917.76h115.456V784.384h-115.456zM32.896 994.688V707.584h269.056V994.56H32.896z m76.8-210.304V917.76h115.456V784.384H109.696z"
                        p-id="30167" fill="currentColor"></path>
                    <path d="M126.208 745.984V499.584h768v212.352h-51.2V550.784h-665.6v195.2z" p-id="30168" fill="currentColor"></path>
                    <path d="M474.624 327.936h51.2v222.336h-51.2z" p-id="30169" fill="currentColor"></path>
                </SvgIcon>
            );
        };
    }
});
