import axios from "axios";

export const uploadOnCloudinary = async (file: File, folderPath: string) => {
    console.log("uploadOnCloudinary is running....");
    const formData = new FormData()
    formData.append('file', file);
    formData.append("folder", folderPath);
    formData.append('upload_preset', 'story-space preset');
    // Loop through FormData and log its contents
    // for (let [key, value] of formData.entries()) {
    //     console.log(`${key}:`, value);
    // }
    try {
        // console.log('Cloud Name:', import.meta.env.VITE_CLOUD_NAME);
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME!}/image/upload`, formData);
        // console.log("get the image url from cloudinary server : ",response.data.secure_url);
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};
