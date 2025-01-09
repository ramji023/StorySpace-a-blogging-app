import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill CSS
import { Save } from "lucide-react";

// You can customize the Quill toolbar for additional options
const toolbarOptions = [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    ['link', 'image', 'video'], // Video URL functionality is built-in
    ['code-block'],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    ['clean'],
];

const WriteStory = () => {
    const quillRef = useRef(null); // Reference to the Quill instance
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // Handle Save button click
    const handleSave = () => {
        console.log("Title:", title);
        console.log("Content:", content);
        // Implement server-side saving logic here
    };

    // Configuration for Quill editor
    const modules = {
        toolbar:toolbarOptions
    };


    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Title Input */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your title..."
                className="w-full text-3xl font-bold focus:outline-none border-b-2 border-gray-300 pb-2"
            />

            {/* Quill Editor */}
            <div className="rounded-lg shadow-lg border border-gray-300 bg-white p-4">
                <div className="overflow-y-auto max-h-[500px]">
                    <ReactQuill
                        ref={quillRef}
                        value={content}
                        onChange={setContent} // Update content on change
                        modules={modules}
                        placeholder="Write your story here..."
                        theme="snow"
                        style={{ minHeight: 200 }}
                    />
                </div>
            </div>

            {/* Save Button */}
            <button
  onClick={handleSave}
  className="mx-auto mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-purple-800 transition-colors shadow-lg"
>
  <Save className="h-5 w-5" />
  <span>Save Draft</span>
</button>

        </div>
    );
};

export default WriteStory;
