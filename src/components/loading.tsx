import loading from "../assets/loading.gif"
interface LoadingProps {
  text: string; // Optional text prop for custom message
}

const Loading = ({ text = "Loading..." }:LoadingProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex flex-col justify-center items-center z-50 backdrop-blur-sm">
      <img src={loading} alt="Loading..." className="w-16 h-16 mb-4" />
      <p className="text-black text-xl font-bold">{text}</p>
    </div>
  );
};

export default Loading;
