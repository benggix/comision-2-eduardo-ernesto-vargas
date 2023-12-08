export const EditPost = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-4">
        <h1 className="text-3xl font-medium text-center mb-8">
          Editando tu Post
        </h1>

        <form>
          <div>
            <label className="block text-sm font-medium ">Título:</label>
            <input
              type="text"
              name="title"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Descripción:
            </label>
            <textarea
              name="description"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              URL de la Imagen:
            </label>
            <input
              type="url"
              name="imageURL"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
          >
            Guardar los Cambios!
          </button>
        </form>
      </div>
    </div>
  );
};
