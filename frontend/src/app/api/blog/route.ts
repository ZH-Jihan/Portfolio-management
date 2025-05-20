import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  // Here you would normally save the blog post to a database
  return NextResponse.json({ message: "Blog post created", data });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  // Here you would normally update the blog post in a database
  return NextResponse.json({ message: "Blog post updated", data });
}
