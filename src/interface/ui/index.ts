interface ICategory {
    id: number,
    name: string
}

interface IContent {
    id: number,
    title: string,
    location: string,
    category: ICategory,
    register: string,
    content: string
}

interface IProvideContentInfo {
    selectedContent?: IContent,
    isShowPreviewPanel?: boolean
}

interface IProvideCategoryInfo {
    currentCategory?: {
        id: number,
        name: string
    },
    isShowCategoryPanel?: boolean
}

export{
    ICategory,
    IContent,
    IProvideCategoryInfo,
    IProvideContentInfo
}