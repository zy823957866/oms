// 菜单返回的数据结构
export interface MenuTree {
    id: string;
    title: string;
    type: number | boolean | string;
    icon: string;
    url?: string;
    enDisplayName?: string;
    children?: Array<MenuTree>
}