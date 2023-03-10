<template>
  <div class="assembox-ellipsis">
    <slot name="prefix" class="assembox-ellipsis-prefix"></slot>
    <template v-if="computedReady">
      <template v-if="tooltip">
        <el-tooltip
          effect="dark"
          :content="text"
          placement="top"
        >
          <div>
            <span class="assembox-ellipsis-text" ref="text">{{ text }}</span>
            <span class="assembox-ellipsis-more" ref="more" v-show="oversize"><slot name="more">...</slot></span>
            <slot name="suffix" class="assembox-ellipsis-suffix"></slot>
          </div>
        </el-tooltip>
      </template>
      <template v-else>
        <span class="assembox-ellipsis-text" ref="text">{{ text }}</span>
        <span class="assembox-ellipsis-more" ref="more" v-show="oversize"><slot name="more">...</slot></span>
        <slot name="suffix" class="assembox-ellipsis-suffix"></slot>
      </template>
    </template>
    <div class="assembox-ellipsis-hidden" v-else>
      <span class="assembox-ellipsis-text" ref="text">{{ text }}</span>
      <span class="assembox-ellipsis-more" ref="more" v-show="oversize"><slot name="more">...</slot></span>
      <slot name="suffix" class="assembox-ellipsis-suffix"></slot>
    </div>
  </div>
</template>
<script>
import {nextTick, getCurrentInstance} from 'vue';
import {getStyle, oneOf} from '../../utils/utils';

const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1;
    }
    return pre + 2;
  }, 0);

const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0;
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1;
    } else {
      showLength += 2;
    }
    if (showLength <= maxLength) {
      return pre + cur;
    }
    return pre;
  }, '');
};

export default {
  name: 'ellipsis',
  // components: {Tooltip},
  emits: ['on-show', 'on-hide'],
  props: {
    text: {
      type: String
    },
    // ????????????
    height: {
      type: Number
    },
    // ??????????????????????????? height?????????????????? height?????????????????? height ??????
    lines: {
      type: Number
    },
    // ????????????????????????
    length: {
      type: Number
    },
    // ????????????????????????????????????2???????????????????????????????????? length
    fullWidthRecognition: {
      type: Boolean,
      default: false
    },
    // todo ??????????????????????????????????????????
    autoResize: {
      type: Boolean,
      default: false
    },
    // ????????????
    disabled: {
      type: Boolean,
      default: false
    },
    // ???????????? tooltip
    tooltip: {
      type: Boolean,
      default: false
    },
    // ????????? tooltip ????????????
    transfer: {
      type: Boolean,
      default() {
        const global = getCurrentInstance().appContext.config.globalProperties;
        return !global.$VIEWUI || global.$VIEWUI.transfer === '' ? false : global.$VIEWUI.transfer;
      }
    },
    theme: {
      validator(value) {
        return oneOf(value, ['dark', 'light']);
      },
      default: 'dark'
    },
    maxWidth: {
      type: [String, Number],
      default: 250
    },
    placement: {
      validator(value) {
        return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
      },
      default: 'bottom'
    }
  },
  data() {
    return {
      oversize: false,
      computedReady: false, // ??????????????????????????????????????????????????????
      computedText: '' // ???????????? text ??????
    };
  },
  watch: {
    disabled() {
      this.init();
    },
    text() {
      this.init();
    },
    height() {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (!this.disabled) {
        this.computeText();
        this.limitShow();
      }
    },
    computeText() {
      this.oversize = false;
      this.computedReady = false;

      nextTick(() => {
        const $text = this.$refs.text;
        const $el = this.$el;
        const $more = this.$refs.more;
        let n = 1000;
        let text = this.text;
        let height = this.height;
        // ??? height ??????????????? lines ????????????????????????????????????????????? this.height
        if (!height && this.lines) {
          const lineHeight = parseInt(getStyle($el, 'lineHeight'), 10);
          height = lineHeight * this.lines;
        }

        if ($text) {
          // ?????? length???????????????????????????
          if (this.length) {
            const textLength = this.fullWidthRecognition ? getStrFullLength(text) : text.length;
            if (textLength > this.length) {
              this.oversize = true;
              $more.style.display = 'inline-block';
              text = this.fullWidthRecognition ? cutStrByFullLength(text, this.length) : text.slice(0, this.length);
            }
          } else {
            if ($el.offsetHeight > height) {
              this.oversize = true;
              $more.style.display = 'inline-block';

              while ($el.offsetHeight > height && n > 0) {
                if ($el.offsetHeight > height * 3) {
                  $text.innerText = text = text.substring(0, Math.floor(text.length / 2));
                } else {
                  $text.innerText = text = text.substring(0, text.length - 1);
                }
                n--;
              }
            }
          }
        }

        this.computedText = text;
      });
    },
    limitShow() {
      this.computedReady = true;

      nextTick(() => {
        const $text = this.$refs.text;
        const $el = this.$el;

        if ($text) {
          $text.innerText = this.computedText;
          if ($el.offsetHeight > this.height) {
            this.$emit('on-hide');
          } else {
            this.$emit('on-show');
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.assembox-ellipsis {
  &-hidden {
    visibility: hidden;
  }
}
</style>
