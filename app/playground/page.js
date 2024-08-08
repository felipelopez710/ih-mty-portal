'use client'

export default function PlaygrounPage(){

    function obtenerFechasDeClase(fechaInicio, diasSemanaConDuracionYMaestro, horasTotalesCurso) {
        // Convierte la fecha de inicio a un objeto Date
        let fechaActual = new Date(fechaInicio);
        let diasDeClase = [];
        let horasAcumuladas = 0;
    
        // Función para convertir el nombre del día a un número (0 = Domingo, 1 = Lunes, etc.)
        function convertirDiaANumero(dia) {
            const dias = {
                "domingo": 0,
                "lunes": 1,
                "martes": 2,
                "miércoles": 3,
                "jueves": 4,
                "viernes": 5,
                "sábado": 6
            };
            return dias[dia.toLowerCase()];
        }
    
        // Convierte la lista de días de la semana a números y sus duraciones y maestros
        let diasNumericosConDuracionYMaestro = diasSemanaConDuracionYMaestro.map(dia => ({
            dia: convertirDiaANumero(dia.nombre),
            duracion: dia.duracion,
            maestro: dia.maestro,
            horaInicio: dia.horaInicio
        }));
    
        while (horasAcumuladas < horasTotalesCurso) {
            // Busca el día de la semana actual en la lista de días con duración y maestro
            let diaActual = diasNumericosConDuracionYMaestro.find(dia => dia.dia === fechaActual.getDay());
    
            if (diaActual) {
                let fechaClase = new Date(fechaActual);
                let [horaInicio, minutoInicio] = diaActual.horaInicio.split(':').map(Number);
                let horaFin = new Date(fechaClase);
                horaFin.setHours(horaInicio);
                horaFin.setMinutes(minutoInicio + diaActual.duracion * 60);
    
                diasDeClase.push({
                    fecha: fechaClase,
                    maestro: diaActual.maestro,
                    horaInicio: diaActual.horaInicio,
                    horaFin: `${horaFin.getHours()}:${horaFin.getMinutes() < 10 ? '0' + horaFin.getMinutes() : horaFin.getMinutes()}`,
                    duracion: diaActual.duracion
                });
    
                horasAcumuladas += diaActual.duracion;
            }
            // Incrementa la fecha actual en un día
            fechaActual.setDate(fechaActual.getDate() + 1);
        }
    
        return diasDeClase;
    }
    
    // Ejemplo de uso:
    let fechaInicio = '2024-09-01';
    let diasSemanaConDuracionYMaestro = [
        { nombre: 'lunes', duracion: 2, maestro: 'Profesor A', horaInicio: '09:00' },
        { nombre: 'miércoles', duracion: 1, maestro: 'Profesor B', horaInicio: '10:00' },
        { nombre: 'viernes', duracion: 2, maestro: 'Profesor C', horaInicio: '08:00' }
    ];
    let horasTotalesCurso = 20;
    
    let fechasDeClase = obtenerFechasDeClase(fechaInicio, diasSemanaConDuracionYMaestro, horasTotalesCurso);
    console.log(fechasDeClase);
    

    return(
        <main className="w-full bg-blue-100 h-screen text-center pt-10">
            Welcome to the playground
        </main>
    )
}