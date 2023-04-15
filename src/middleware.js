import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req) {
  // if req.nexturl starts with /api/entries/ then return the next middleware
  console.log("middleware", req.nextUrl.pathname);

  if (req.nextUrl.pathname.startsWith("/api/entries/")) {
    const id = req.nextUrl.pathname.split("/")[3];
    const checkMongoId = new RegExp("^[0-9a-fA-F]{24}$");
    if (checkMongoId.test(id)) {
      return NextResponse.next();
    } else {
      const url = req.nextUrl.clone();
      url.pathname = "/api/bad-request";
      url.search = `?message=${id} is not a valid mongo id`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    //
    // "/api/:path*",
    "/api/entries/:path*",
  ],
};
