interface IContent {
    id: number,
    name: string
}

interface IProvideCategoryInfo {
    currentCategory?: {
        id: number,
        name: string
    },
    isShowCategoryPanel?: boolean
}

export{
    IContent,
    IProvideCategoryInfo
}