const Loader = () => {
    return (
      <div className="flex justify-center items-center">
        <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-current border-t-transparent text-red-900 rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  };
  
  export default Loader;
  