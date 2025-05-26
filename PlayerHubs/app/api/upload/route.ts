import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type - more comprehensive validation
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type. Only PDF and image files are allowed.",
        },
        { status: 400 },
      )
    }

    // Validate file size (10MB limit for contracts, 5MB for images)
    const maxSize = file.type === "application/pdf" ? 10 * 1024 * 1024 : 5 * 1024 * 1024
    if (file.size > maxSize) {
      const maxSizeMB = file.type === "application/pdf" ? "10MB" : "5MB"
      return NextResponse.json(
        {
          error: `File too large. Maximum size is ${maxSizeMB}.`,
        },
        { status: 400 },
      )
    }

    // Generate unique filename with timestamp and random string
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split(".").pop()
    const fileName = `${timestamp}-${randomString}.${fileExtension}`

    // Determine file category based on type
    const category = file.type === "application/pdf" ? "contracts" : "images"
    const fileUrl = `/uploads/${category}/${fileName}`

    // In a real implementation, upload to Vercel Blob or another storage service
    // For now, we'll simulate the upload with detailed response
    console.log("File uploaded:", {
      originalName: file.name,
      fileName,
      size: file.size,
      type: file.type,
      category,
      url: fileUrl,
    })

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      url: fileUrl,
      fileName,
      originalName: file.name,
      size: file.size,
      type: file.type,
      category,
      uploadedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      {
        error: "Failed to upload file. Please try again.",
      },
      { status: 500 },
    )
  }
}
