import { Link } from "react-router-dom"

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-500">
      <h1 className="text-6xl font-extrabold text-white mb-4">Oops!</h1>
      <p className="text-xl text-gray-200 mb-8">Parece que te has perdido...</p>

      <Link
        to="/"
        className="text-yellow-300 hover:underline focus:outline-none focus:ring focus:border-yellow-300"
      >
        Volver a la página de inicio
      </Link>
    </div>
  )
}
