"use client";

type Props = {
    username: string;
    onUploadClick: () => void;
  };
  
  export const DashboardHeader = ({ username, onUploadClick }: Props) => (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">Welcome back, {username}</h2>
        <p className="text-sm text-gray-400">Seamless Video Management, Elevated Results.</p>
      </div>
      <button onClick={onUploadClick} className="flex items-center gap-3 px-4 py-2 bg-purple-400 text-black rounded-xl">
        <img src="/images/plus.svg" alt="upload" className="w-6" />
        Upload Video
      </button>
    </div>
  );
  