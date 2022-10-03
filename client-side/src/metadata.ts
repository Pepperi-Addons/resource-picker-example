export type PepSelectOption<T> = {
    key: T,
    value: string
}

export const ResourceListAddonUUID = "0e2ae61b-a26a-4c26-81fe-13bdd2e4aaa3"

export interface ResourcePicker {
    resource: string,
    view?: string,
    selectedObjectKeys?: string[],
    selectionMode: 'single' | 'multi',
    allowNone?: boolean
}