import { useMoveBack } from '../hooks/useMoveBack';

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="flex h-screen items-center justify-center bg-gray-100 p-12">
      <div className="max-w-4xl rounded-md border border-gray-200 bg-white p-12 text-center">
        <h1 className="mb-8">
          The page you are looking for could not be found 😢
        </h1>
        <button
          onClick={moveBack}
          className="cursor-pointer rounded bg-blue-600 px-6 py-3 text-lg text-white transition duration-300 ease-in-out hover:bg-blue-700"
        >
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
