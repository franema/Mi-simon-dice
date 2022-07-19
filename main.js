let contadorRonda = 0
let rondaMaquina = []
let rondaJugador = []

const $boton = document.querySelector("#boton")

$boton.onclick = iniciar

bloquearInputUsuario()


function iniciar() {
    contadorRonda = 0
    rondaMaquina = []
    document.querySelector(".rounded").id = "oculto"
    manejarRondaMaquina()
}


function manejarRondaMaquina() {
    cambiarMensaje("Es el turno del que sabe")
    bloquearInputUsuario()
    const juegoMaquina = generarJuegoMaquina()
    rondaMaquina.push(juegoMaquina)
    const retrasoJugador = (rondaMaquina.length + 1) * 1000

    rondaMaquina.forEach(function ($cuadro, indice) {
        const retraso = (indice + 1) * 1000
        setTimeout(function () {
            resaltar($cuadro)
        }, retraso)
    })

    setTimeout(function () {
        desbloquearInputUsuario()
    }, retrasoJugador)

    rondaJugador = []
    contadorRonda++
    cambiarNumeroRonda()

}



function manejarRondaJugador(e) {

    const $cuadro = e.target
    resaltar($cuadro)
    rondaJugador.push($cuadro)

    const comparar = rondaMaquina[rondaJugador.length - 1]

    if ($cuadro.id !== comparar.id) {
        perder()
        return false
    }



    if (rondaJugador.length === rondaMaquina.length) {
        bloquearInputUsuario()
        setTimeout(manejarRondaMaquina, 1000)
    }

}


function bloquearInputUsuario() {
    document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
        $cuadro.onclick = function () {
        }
    })
}

function desbloquearInputUsuario() {
    document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
        $cuadro.onclick = manejarRondaJugador
    })
    cambiarMensaje("Adelante, estoy seguro de que fallarás")
}

function generarJuegoMaquina() {
    const $cuadros = document.querySelectorAll(".cuadro")
    const indice = Math.floor(Math.random() * $cuadros.length)
    return $cuadros[indice]
}

function resaltar($cuadro) {
    $cuadro.style.opacity = 1
    setTimeout(function () {
        $cuadro.style.opacity = 0.5
    }, 500)
}

function perder() {
    cambiarMensaje("Perdisteee!", true)
    document.querySelector("#oculto").id = ""
    bloquearInputUsuario()
}

function cambiarMensaje(mensaje, error = false) {
    const $mensaje = document.querySelector("#alerta")
    $mensaje.textContent = mensaje
    if (error) {
        $mensaje.className = "alert alert-danger"
    } else {
        $mensaje.className = "alert alert-info"
    }

}

function cambiarNumeroRonda() {
    document.querySelector("#ronda").textContent = `Ronda numero ${contadorRonda}`
}
