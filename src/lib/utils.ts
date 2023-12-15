import { NextResponse } from "next/server";

export function createErrorResponse(
    message: string,
    statusCode: number
): NextResponse {
    const errorResponse = {
        status: statusCode >= 500 ? "error" : "fail",
        message,
    };

    return new NextResponse(JSON.stringify(errorResponse), {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
    });
}

export const isValidUrl = (urlString: string) => {
    let url;
    try {
        url = new URL(urlString);
    } catch (e) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
};
