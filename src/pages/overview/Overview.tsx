export const Overview = () => {
  return (
    <div className="h-screen flex  items-center justify-center">
      <div className="px-4 flex flex-col gap-4 items-center justify-center">
        <p className="text-lg">
          Project created for self-education, images taken from Voltride.com
        </p>
        <div className="text-lg">
          Tools: <h4 className="text-green-400">Vite</h4>
          <h4 className="text-cyan-500">Tailwind</h4>
          <h4 className="text-blue-700">React-hook-form</h4>
          <h4 className="text-blue-500">Typescript</h4>
          <h4 className="text-violet-600">Redux Toolkit</h4>
          <h4 className="text-purple-700">RTK Query</h4>
          <h4 className="text-rose-700">React Toastify</h4>
        </div>
      </div>
    </div>
  );
};
