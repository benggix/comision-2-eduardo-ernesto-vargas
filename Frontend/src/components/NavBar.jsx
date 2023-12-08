import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-blue-600">
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            ViajesS.A
          </Link>
          <div className="flex space-x-4">
            <>
              <span className="text-gray-300 mr-4">¡Hola, username!</span>
              <button className="hover:text-gray-300 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded cursor-pointer">
                Cerrar Sesión
              </button>
            </>
            <>
              <Link
                to={{ pathname: "/users/login" }}
                className="hover:text-gray-300 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/users/register"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Registro
              </Link>
            </>
          </div>
        </nav>
      </header>

      <main className="contenedor mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <section className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 my-10">
            Bienvenido a la comunidad de viaje
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed sm:leading-relaxed lg:leading-relaxed px-4 sm:px-12 lg:px-80 font-medium">
            En un entorno individual y aislado, surge la necesidad de
            proporcionar a los apasionados de los viajes un espacio en línea
            donde puedan compartir y descubrir experiencias únicas de viaje. Si
            quieres ver los posts y comentarios creados por otros usuarios, haz
            click en el botón "Ver Posts".
          </p>
          <div className="mt-8">
            <Link
              to="/users/register"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer mr-2"
            >
              ¡EMPECEMOS!
            </Link>

            <Link
              to="/posts"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer mr-2"
            >
              VER POSTS!
            </Link>
            <Link
              to="/posts/createPost"
              className="bg-green-500 hover:bg-green-700 text-black py-2 px-4 rounded cursor-pointer"
            >
              ¡EMPECEMOS A CREAR UN POST!
            </Link>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 mx-2">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">1) Registrarse</h3>
              <p className="text-gray-700">
                Si quieres poder compartir, comentar y descubrir las
                experiencias únicas de un viaje, tienes que crear una cuenta con
                un nombre de usuario, contraseña, email y opcional un Avatar
                sacado de una URL.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">2) Iniciar sesión </h3>
              <p className="text-gray-700">
                Una vez te hayas creado una cuenta y hayas iniciado sesión,
                podrás compartir, interactuar con otros usuarios a través de los
                comentarios, hasta puedes crear tu propio post.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">3) Disfruta!</h3>
              <p className="text-gray-700">
                ¡Felicidades, ya puedes comenzar a iniciar esta nueva
                experiencia de proporcionar a los apasionados de los viajes tu
                experiencia!
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
