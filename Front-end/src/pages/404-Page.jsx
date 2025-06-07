function NotFound404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff8e1] px-4 py-8 text-center">
      <div className="max-w-[1280px] w-full" id="root">
        <div className="card bg-white rounded-2xl shadow-lg border border-[#f5e6c5] p-10 mx-auto">
          <h1 className="text-6xl font-bold text-[#e1b12c] mb-6 animate-pulse drop-shadow">
            404
          </h1>
          <p className="text-xl font-medium text-[#3d3d3d] tracking-wider">
            The page you're looking for could not be found.
          </p>
          <p className="mt-4 text-[#888]">
            It may have been moved, renamed, or deleted.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound404;
