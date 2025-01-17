import { uploadOnCloudinary } from "../cloudinary.config";

// Function to process and upload images sequentially
export const processAndUploadImages = async (content: string) => {
    console.log("processAndUploadImages function running ...")
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const images = doc.querySelectorAll("img"); // Find all img tags

    for (const img of images) {
        const src = img.getAttribute("src");

        // Skip if the src is already a Cloudinary URL or is an external URL
        if (src && (src.includes("cloudinary.com") || src.startsWith('http'))) {
            // If it's already a Cloudinary URL or external URL, skip upload
            continue;
        }
        // If the src is a base64 string, convert and upload
        if (src && src.startsWith("data:image")) {
            try {
                const file = await base64ToFile(src);
                // console.log(src);
                // console.log("the file is : ",file)
                const uploadedURL = await uploadOnCloudinary(file, '/Story-Space/');
              
                img.setAttribute("src", uploadedURL); // Replace with Cloudinary URL
            } catch (error) {
                console.error("Error uploading base64 image:", error);
            }
        }
    }
    // Return the updated content with new image URLs
    return doc.body.innerHTML;
};

// Convert base64 to File object
const base64ToFile = (base64: string): Promise<File> => {
    return new Promise((resolve, reject) => {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || '';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const file = new File([u8arr], "image.jpg", { type: mime });
        resolve(file);
    });
};
