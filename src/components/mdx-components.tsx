import Image from "next/image"

const components = {
    Image,
}

interface MdxProps {
    children: string
}

export function Mdx({ children }: MdxProps) {
    return (
        <div className="prose prose-gray dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: children }} />
        </div>
    )
}
