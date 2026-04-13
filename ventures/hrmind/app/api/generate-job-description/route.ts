import { NextRequest, NextResponse } from "next/server";
import { getJobDescriptionPrompt } from "@/lib/claude";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, department, location, remote, salary, responsibilities } = body;

    if (!title || !department || !location || !remote || !salary || !responsibilities) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const prompt = getJobDescriptionPrompt({
      title,
      department,
      location,
      remote,
      salary,
      responsibilities,
    });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    return NextResponse.json({ result: content.text });
  } catch (error) {
    console.error("Error generating job description:", error);
    return NextResponse.json(
      { error: "Failed to generate job description" },
      { status: 500 }
    );
  }
}
