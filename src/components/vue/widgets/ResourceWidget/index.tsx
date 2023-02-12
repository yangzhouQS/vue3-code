import {defineComponent, Fragment, ref} from 'vue'
import {usePrefix} from "@/components/vue/hooks/usePrefix";
import './style.less'
import {IconWidget} from "@/components/vue/widgets/IconWidget";
import {TextWidget} from "@/components/vue";
import {isFn} from "@/components/shared";
import {IResource, isResourceHost, isResourceList} from "@/components/core";
import {isVueComponent} from "@/components/shared/utils";

export const ResourceWidget = defineComponent({
  name: 'ResourceWidget',
  props: {
    title: String,
    sources: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultExpand: {
      type: Boolean,
      default: true
    },
    children: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  setup(props, {slots}) {
    const prefix = usePrefix('resource')
    const expand = ref(props.defaultExpand)
    const setExpand = (val: boolean) => {
      expand.value = val
    }
    const renderNode = (source: IResource) => {
      const { node, icon, title, thumb, span } = source

      return (
        <div
          class={prefix + '-item'}
          style={{ gridColumnStart: `span ${span || 1}` }}
          key={node.id}
          data-designer-source-id={node.id}
        >
          {thumb && <img class={prefix + '-item-thumb'} src={thumb} />}
          {icon && isVueComponent(icon) ? (
            <>{icon}</>
          ) : (
            <IconWidget
              class={prefix + '-item-icon'}
              infer={icon}
              style={{ width: 150, height: 40 }}
            />
          )}
          <span class={prefix + '-item-text'}>
            {
              <TextWidget>
                {title || node.children[0]?.getMessage('title')}
              </TextWidget>
            }
          </span>
        </div>
      )
    }

    const sources = props.sources?.reduce((buf: any, souce: IResource) => {
      if (isResourceList(souce)) {
        return buf.concat(souce)
      } else if (isResourceHost(buf)) {
        return buf.concat(souce.Resource)
      }
      return buf
    }, [])

    const remainItems = props.sources.reduce((length, source: any) => {
      return length + (source?.span ?? 1)
    }, 0) % 3
    return () => {
      return <div class={[
        prefix, {expand: expand.value}
      ]}>
        <div
          class={prefix + '-header'}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setExpand(!expand)
          }}
        >
          <div class={prefix + '-header-expand'}>
            <IconWidget infer="Expand" size={10}/>
          </div>
          <div class={prefix + '-header-content'}>
            <TextWidget>{props.title}</TextWidget>
          </div>
        </div>
        <div class={prefix + '-content-wrapper'}>
          <div
            class={prefix + '-item-remain'}
            style={{gridColumnStart: `span ${3 - remainItems}`}}
          >
            {sources.map(isFn(props.children) ? props.children : renderNode)}

            {remainItems ? (
              <div
                class={prefix + '-item-remain'}
                style={{gridColumnStart: `span ${3 - remainItems}`}}
              ></div>
            ) : null}
          </div>
        </div>
      </div>
    }
  }
})
