
// 坐标相关

export interface Point {
    clientX: number;
    clientY: number;
}

export interface CanvasPoint {
    canvasX: number;
    canvasY: number;
}

export type Rects = DOMRect[] & {
    elements: Array<Element | Text>;
};

export type IPublicTypeRect = DOMRect & {
    elements: Array<Element | Text>;
    computed?: boolean;
};
