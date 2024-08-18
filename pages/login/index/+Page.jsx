export { Page }

function Page() {

    return (
        <div className="flex flex-col flex-wrap justify-center content-center h-screen">
            <h1 className="text-xl md:text-3xl font-semibold text-stone-600">Portal Paciente</h1>
            <h2 className="text-3xl md:text-5xl font-bold text-rm-blue-100 mb-4">Ingresa a tu Portal</h2>
            <div className="flex flex-col justify-center content-center">
                <form className="flex flex-col justify-center items-center" method="POST" action="/api/login">
                    <input 
                        className="p-2 text-center border-2 border-solid border-rm-blue-100 active:border-rm-blue-100 rounded-tl-full rounded-tr-full rounded-br-full rounded-bl-full w-full" 
                        type="password"
                        name="password"
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                    <button
                        type="submit"
                        className="font-semibold text-[white] tracking-wider bg-rm-blue-100 hover:bg-rm-blue-200 p-2 rounded-tl-full rounded-tr-full rounded-br-full rounded-bl-full mt-4 w-full">
                            INGRESAR
                    </button>
                </form>
            </div>
        </div>
    )
}