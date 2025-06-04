import { type NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary with detailed logging
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Use HTTPS URLs
})

export async function POST(request: NextRequest) {
  console.log("=== UPLOAD ROUTE STARTED ===")
  
  try {
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error("Missing Cloudinary environment variables")
      return NextResponse.json({ 
        error: "Server configuration error. Please check Cloudinary credentials." 
      }, { status: 500 })
    }

    console.log("Cloudinary config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? "Present" : "Missing",
      api_secret: process.env.CLOUDINARY_API_SECRET ? "Present" : "Missing"
    })

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.error("No file provided in form data")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    console.log("File details:", {
      name: file.name,
      type: file.type,
      size: file.size
    })

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "image/jpeg", 
      "image/png", 
      "image/jpg", 
      "image/gif", 
      "image/webp"
    ]

    if (!allowedTypes.includes(file.type)) {
      console.error("Invalid file type:", file.type)
      return NextResponse.json({
        error: "Invalid file type. Only PDF and image files are allowed.",
      }, { status: 400 })
    }

    // Validate file size
    const maxSize = file.type === "application/pdf" ? 10 * 1024 * 1024 : 5 * 1024 * 1024
    if (file.size > maxSize) {
      const maxSizeMB = file.type === "application/pdf" ? "10MB" : "5MB"
      console.error("File too large:", file.size, "bytes, max:", maxSize)
      return NextResponse.json({
        error: `File too large. Maximum size is ${maxSizeMB}.`,
      }, { status: 400 })
    }

    // Convert file to buffer
    console.log("Converting file to buffer...")
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    console.log("Buffer created, size:", buffer.length)

    // Determine upload parameters
    const isPdf = file.type === "application/pdf"
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    
    const uploadOptions = {
      folder: isPdf ? "contracts" : "contract-images",
      resource_type: isPdf ? "raw" : "image" as "raw" | "image",
      public_id: `${timestamp}-${randomString}`,
      tags: ["contract-upload", isPdf ? "pdf" : "image"],
      type: "upload" as const,
      use_filename: false,
      unique_filename: true,
    }

    console.log("Upload options:", uploadOptions)

    // Upload to Cloudinary with detailed logging
    console.log("Starting Cloudinary upload...")
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error)
            reject(error)
          } else {
            console.log("Cloudinary upload success:", {
              public_id: result?.public_id,
              secure_url: result?.secure_url,
              resource_type: result?.resource_type,
              format: result?.format,
              bytes: result?.bytes
            })
            resolve(result)
          }
        }
      )
      
      uploadStream.end(buffer)
    }) as any

    // Verify upload result
    if (!uploadResult || !uploadResult.secure_url) {
      console.error("Upload result is missing secure_url:", uploadResult)
      throw new Error("Upload completed but no URL returned")
    }

    const response = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      fileName: uploadResult.original_filename || file.name,
      originalName: file.name,
      size: file.size,
      type: file.type,
      category: isPdf ? "contracts" : "images",
      uploadedAt: new Date().toISOString(),
      cloudinaryData: {
        resource_type: uploadResult.resource_type,
        format: uploadResult.format,
        bytes: uploadResult.bytes,
        version: uploadResult.version,
        width: uploadResult.width,
        height: uploadResult.height,
      }
    }

    console.log("Upload successful, returning response:", response)
    return NextResponse.json(response)

  } catch (error) {
    console.error("=== UPLOAD ERROR ===")
    console.error("Error type:", error?.constructor?.name)
    console.error("Error message:", error instanceof Error ? error.message : error)
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace")
    
    // Detailed error analysis
    let errorMessage = "Failed to upload file. Please try again."
    let statusCode = 500
    
    if (error instanceof Error) {
      const errorMsg = error.message.toLowerCase()
      
      if (errorMsg.includes("invalid") && errorMsg.includes("credentials")) {
        errorMessage = "Invalid Cloudinary credentials. Please check your API keys."
        statusCode = 401
      } else if (errorMsg.includes("network") || errorMsg.includes("timeout")) {
        errorMessage = "Network error. Please check your internet connection and try again."
        statusCode = 408
      } else if (errorMsg.includes("file") && errorMsg.includes("too large")) {
        errorMessage = "File size exceeds the maximum limit."
        statusCode = 413
      } else if (errorMsg.includes("unsupported") || errorMsg.includes("invalid image")) {
        errorMessage = "Unsupported file format or corrupted file."
        statusCode = 400
      } else if (errorMsg.includes("quota") || errorMsg.includes("limit")) {
        errorMessage = "Storage quota exceeded. Please contact support."
        statusCode = 429
      }
    }

    return NextResponse.json({
      error: errorMessage,
      debug: process.env.NODE_ENV === "development" ? {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        cloudinaryConfig: {
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          has_api_key: !!process.env.CLOUDINARY_API_KEY,
          has_api_secret: !!process.env.CLOUDINARY_API_SECRET,
        }
      } : undefined
    }, { status: statusCode })
  }
}