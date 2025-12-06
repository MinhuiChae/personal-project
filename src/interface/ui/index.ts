import ETechStack from "@/enums/eTechStack"
interface ICategory {
    id: number,
    name: string
}

interface IContent {
    id: number,
    title: string,
    techStack: ETechStack[],
    category: ICategory,
    content: string
}

interface IProvideContentInfo {
    selectedContent?: IContent,
    isShowPreviewPanel?: boolean,
    currentTech?: ETechStack[]
}

interface IProvideCategoryInfo {
    currentCategory?: ICategory
    isShowCategoryPanel?: boolean
}

export{
    ICategory,
    IContent,
    IProvideCategoryInfo,
    IProvideContentInfo
}