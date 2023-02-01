export default class Viewport {
    private viewportElement?: HTMLElement;
    private rect?: DOMRect;

    // 识别感应区域DOM
    private _bounds?: DOMRect;

    constructor() {
    }

    get bounds(): DOMRect {
        if (this._bounds) {
            return this._bounds;
        }
        this._bounds = this.viewportElement!.getBoundingClientRect();

        // 及时销毁
        requestAnimationFrame(() => {
            this._bounds = undefined;
        });
        return this._bounds;
    }

    mount(dom: HTMLElement | null) {
        if (!dom || this.viewportElement === dom) {
            return
        }
        this.viewportElement = dom
        this.touch()
    }

    touch() {
        if (this.viewportElement) {
            this.rect = this.bounds;
        }
    }

}
