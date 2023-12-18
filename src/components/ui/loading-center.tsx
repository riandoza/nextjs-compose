export function LoadingCenter() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="absolute bottom-1/2 right-1/2  translate-x-1/2 translate-y-1/2 transform ">
                <div className="h-32 w-32 animate-spin  rounded-full border-8 border-solid border-blue-400 border-t-transparent"></div>
            </div>
        </div>
    )
}
