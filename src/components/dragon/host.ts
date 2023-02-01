import {IPublicModelNode} from "./drag-object";
import {VNode, ComponentPublicInstance} from 'vue'
import {createModuleEventBus, IEventBus} from "./event-bus";
import Viewport from './viewport';

/**
 * 拖拽识别区域
 */
export class SimulatorHost {
    readonly viewport = new Viewport();

    private _dom?: HTMLElement
    readonly emitter: IEventBus = createModuleEventBus('BuiltinSimulatorHost');

    get dom(): HTMLElement {
        return this._dom as HTMLElement
    }

    constructor() {
    }

    mountViewport(viewport: HTMLElement | null) {
        this.viewport.mount(viewport);
    }

    async mountContent(dom: HTMLElement | null) {
        if (!dom || dom === this._dom) {
            return
        }
        this._dom = dom

        this.mountViewport(dom)


        // 监听事件初始化
        this.setupEvents();
        console.log('dom mountContent')
    }

    setupEvents() {
        this.setupDragAndClick();
        this.setupDetecting();
        this.setupLiveEditing();
        this.setupContextMenu();
    }

    postEvent(eventName: string, ...data: any[]) {
        this.emitter.emit(eventName, ...data);
    }

    setupDragAndClick() {
        const dom = this.dom!;
        dom.addEventListener('mousedown', (downEvent: MouseEvent) => {
            // fix for popups close logic
            document.dispatchEvent(new Event('mousedown'));

            // 禁止原生拖拽
            downEvent.stopPropagation();
            downEvent.preventDefault();

            const checkSelect = (e: MouseEvent) => {
                dom.removeEventListener('mouseup', checkSelect, true);

            }

            dom.addEventListener('mouseup', checkSelect, true);
        }, true)
        dom.addEventListener('click', (e: MouseEvent) => {
        }, true)
    }


    /**
     * 设置悬停处理
     */
    setupDetecting() {
        const dom = this.dom!;
        const hover = (e: MouseEvent) => {
            // console.log('鼠标进入')
        }
        const leave = () => {
            // console.log('鼠标离开')
        }
        dom.addEventListener('mouseover', hover, true)
        dom.addEventListener('mouseleave', leave, false)

        // 鼠标在工作区域移动
        dom.addEventListener('mousemove', (e: Event) => {
        }, false)
    }

    // 直接进入编辑模式
    setupLiveEditing() {
        const dom = this.dom!;
        dom.addEventListener('dblclick', (e: MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            const targetElement = e.target as HTMLElement;
            console.log(targetElement)
        }, true)
    }

    // 右键菜单操作
    setupContextMenu() {
        const dom = this.dom!;
        dom.addEventListener('contextmenu', (e: MouseEvent) => {
            const targetElement = e.target as HTMLElement;
        }, true)
    }

    /**
     * 通过 DOM 节点获取节点
     * @param target
     */
    getNodeInstanceFromElement(target: Element | null): NodeInstance | null {
        if (!target) {
            return null
        }
        return {
            node: {id: '666'},
            nodeId: '11'
        }
    }
}


export interface NodeInstance {
    nodeId: string;
    instance: Element | VNode | ComponentPublicInstance<any> | object;
    node?: IPublicModelNode | null;
}
