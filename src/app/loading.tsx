export default function Loading() {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-32 w-32"></div>
            </div>
        </div>
    );
}
