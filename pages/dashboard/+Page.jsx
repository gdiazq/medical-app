import { useEffect, useState } from "react";
import { getRecipes } from "../../lib/getRecipes";
import { getPdf } from "../../lib/getPdf";
 
function Page() {
    const [error, setError] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await getRecipes(page);
                if (response.length === 0) {
                    setHasMore(false);
                } else {
                    setRecipes((prev) => {
                        const newRecipes = response.filter(
                            (recipe) => !prev.some(p => p.id === recipe.id)
                        );
                        return [...prev, ...newRecipes];
                    });
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchRecipes();
    }, [page]);

    const handlePdfView = async (rut, folio) => {
        try {
            const url = await getPdf(rut, folio);
            window.open(url, '_blank');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLoadMore = () => {
        if (hasMore) {
            setPage(page + 1);
        }
    };

    const patientName = recipes.length > 0 ? `${recipes[0].patient.first_name} ${recipes[0].patient.last_name}` : "Paciente";

    return (
        <>
            <header className="flex justify-end p-4 bg-gray-100">
                <p className="font-bold">{patientName}</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1440px] mx-auto p-4">
                {error
                    ? <p>{error}</p> 
                    : recipes.map((recipe) => {
                        let backgroundColor;
                        switch (recipe.type) {
                            case "Receta Retenida":
                                backgroundColor = "bg-emerald-100";
                                break;
                            case "Receta Simple":
                                backgroundColor = "bg-cyan-100";
                                break;
                            default:
                                backgroundColor = "bg-red-100";
                        }

                        const dateInserted = recipe.inserted_at;
                        const date = new Date(dateInserted);

                        const formattedDate = date.toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                        });

                        return (
                            <div
                                className={`p-4 rounded-[5px] text-sm shadow-md flex flex-col ${backgroundColor}`}
                                key={recipe.id}
                            >
                                <div>
                                    <span className="flex justify-between border-b-2 border-rm-blue-100">
                                        <p>Folio: <span className="font-semibold">{recipe.folio}</span></p>
                                        <h3 className="font-bold text-rm-blue-100">Receta de Medicamentos</h3>
                                    </span>
                                    <hr className="text-rm-blue-200" />
                                    <p>Fecha de Emisión: {formattedDate}</p>
                                    <p className="font-bold text-rm-blue-100">
                                        Dr: {recipe.doctor.first_name} {recipe.doctor.last_name}
                                    </p>
                                    <p>{recipe.speciality}</p>
                                    <div className="flex justify-between items-center">
                                        <p>Codigo: <span className="font-bold">{recipe.code}</span></p>
                                        <div className="flex justify-between items-center">
                                            <button 
                                                onClick={() => handlePdfView(recipe.patient.rut, recipe.folio)} // Use the function to fetch PDF
                                                className="bg-rm-blue-100 text-white text-xs py-2 px-6 rounded"
                                            >
                                                VER
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className="flex flex-col items-center mt-4 mb-8">
                <button 
                    onClick={handleLoadMore} 
                    disabled={!hasMore} 
                    className="px-4 py-2 bg-rm-blue-100 text-[white] rounded disabled:opacity-50"
                >
                    Mostrar más
                </button>
            </div>
        </>
    );
}

export { Page };