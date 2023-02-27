if (navigator.onLine) {
    console.log("Estás conectado a Internet.");
} else {
    console.log("No estás conectado a Internet.");
    alert("No tiene conexion a internet...")
}

let hayUsuarioLogueado = false;

const nav = document.querySelector('ion-nav');
const urlApi = "https://dwallet.develotion.com/";
const urlImageApi = "https://dwallet.develotion.com/imgs/";

let map = null;


let rubros = ["Alimentación", "Combustible", "Educación", "Paseos", "Alquiler", "Otros", "Aguinaldo", "Sueldo", "Honorarios", "Salario Vacacional", "Rentas", "Otros"];

inicializar();

function inicializar() {
    addEventListener();
    activarUsuarioLogeado();
    listarDepartamentos();
    listarCiudades();

}
// Eventos
function addEventListener() {

    // Router
    document.querySelector("#router").addEventListener('ionRouteDidChange', navegacion);

    //Creamos los eventos para cada boton de Menu
    document.querySelector("#btnMenuHome").addEventListener("click", cargarSecciones);
    document.querySelector("#btnMenuRegistro").addEventListener("click", cargarSecciones);
    document.querySelector("#btnMenuLogin").addEventListener("click", cargarSecciones);
    document.querySelector("#btnMenuLogout").addEventListener("click", cargarSecciones);
    document.querySelector("#btnMenuAgregarUnGasto").addEventListener("click", cargarSecciones);
    document.querySelector("#btnMenuAgregarIngreso").addEventListener("click", cargarSecciones);
    document.querySelector("#btnVerMovimientos").addEventListener("click", cargarSecciones);
    document.querySelector("#btnVerMovimientos").addEventListener("click", cargarSecciones);
    document.querySelector("#btnMenuVerCajeros").addEventListener("click", cargarSecciones);
    document.querySelector("#btnMenuVerCotizadorCripto").addEventListener("click", cargarSecciones);
    // LOG OUT
    document.querySelector("#btnMenuLogout").addEventListener('click', menuLogoutHandler);

    // TODO eliminar esta 
    document.querySelector(".btnTabBarPatallaAgregarIngreso").addEventListener('click', cargarSeccionesConClass);

    //Evento para el botones
    document.querySelector("#btnRegistroSubmit").addEventListener("click", registrarUsuario);
    document.querySelector("#btnLoginSubmit").addEventListener("click", loginUsuario);
    // en cripto
    document.querySelector("#btnCotizarCriptomoneda").addEventListener("click", btnCotizarCriptomonedaHandler);


    //En movimientos
    document.querySelector("#btnAgregarGasto").addEventListener("click", btnAgregarGastoHandler);
    document.querySelector("#btnAgregarIngreso").addEventListener("click", btnAgregarIngresoHandler);
    document.querySelector("#enMoviminetosVerGastos").addEventListener("click", filtrarMovimietosPorCategoria);
    document.querySelector("#enMoviminetosVerIngresos").addEventListener("click", filtrarMovimietosPorCategoria);
    document.querySelector("#enMoviminetoVaciarFiltros").addEventListener("click", mostrarMoviminetos);

    // Mapa
    document.querySelector("#searchCajeroHandler").addEventListener('click', btnBuscarCajerosPorDireccionHandler)

    // dark Mode
    document.getElementById("btnDarkMode").addEventListener("click", changeDarkTeam)


}
// Navegacion
function navegar(pantalla) {
    nav.push(pantalla);
}

function navegacion(event) {
    const pantalla = event.detail.to;
    ocultarPantallas();
    if (pantalla === '/login') {
        mostrarLogin();
    } else if ((pantalla === '/logout')) {
        mostrarHome();
    } else if (pantalla === '/') {
        mostrarHome();
    } else if (pantalla === '/registro') {
        mostrarRegistro();
    } else if (pantalla === '/agregarGasto') {
        mostrarRealizarGasto();
    } else if (pantalla == '/verMovimientos') {
        verMovimientos()
    } else if (pantalla == '/agregarIngreso') {
        mostrarRealizarIngreso();
    } else if (pantalla == '/verCajeros') {
        mostrarCajeros();
    } else if (pantalla == '/verCotizadorCripto') {
        mostrarCotizadorCripto();
    }
}
// Mostrar y ocultar Pantallas,Secciones
function cerrarMenu() {
    document.querySelector("#menu").close();
}

function menuLogoutHandler() {
    ocultarPantallas();
    logout();
}

function ocultarPantallas() {
    document.querySelector("#pantalla-registro").style.display = 'none';
    document.querySelector("#pantalla-login").style.display = 'none';
    document.querySelector("#pantalla-logout").style.display = 'none';
    document.querySelector("#pantalla-home").style.display = 'none';
    document.querySelector("#pantalla-agregarGasto").style.display = 'none';
    document.querySelector("#pantalla-verMovimientos").style.display = 'none';
    document.querySelector("#pantalla-agregarIngreso").style.display = 'none';
    document.querySelector("#pantalla-verCajeros").style.display = 'none';
    document.querySelector("#pantalla-cotizadorCriptomoneda").style.display = "none";

}

function ocultarOpcionesMenu() {
    document.querySelector("#btnMenuHome").style.display = 'none';
    document.querySelector("#btnMenuLogin").style.display = 'none';
    document.querySelector("#btnMenuRegistro").style.display = 'none';
    document.querySelector("#btnMenuLogout").style.display = 'none';
    document.querySelector("#btnMenuAgregarUnGasto").style.display = 'none';
    document.querySelector("#btnMenuAgregarIngreso").style.display = 'none';
    document.querySelector("#btnVerMovimientos").style.display = 'none';
    document.querySelector("#btnMenuVerCajeros").style.display = 'none';
    document.querySelector("ion-tab-bar").style.display = "none";
    document.querySelector("#btnMenuVerCotizadorCripto").style.display = "none";



}

function mostrarHome() {
    document.querySelector("#pantalla-home").style.display = 'block';
}

function mostrarLogin() {
    document.querySelector("#pantalla-login").style.display = 'block';
}

function mostrarRegistro() {
    document.querySelector("#pantalla-registro").style.display = 'block';
}

function mostrarRealizarGasto() {
    document.querySelector("#pantalla-agregarGasto").style.display = 'block';
}

function mostrarRealizarIngreso() {
    document.querySelector("#pantalla-agregarIngreso").style.display = 'block';

}

function mostrarCajeros() {
    listarCajeros();
    document.querySelector("#pantalla-verCajeros").style.display = 'block';
}

function verMovimientos() {
    document.querySelector("#pantalla-verMovimientos").style.display = 'block';
}
function mostrarCotizadorCripto() {
    document.querySelector("#pantalla-cotizadorCriptomoneda").style.display = "block";
    obtenerCotizacion()

}
function ocultarSecciones() {
    //Ocultamos las secciones 
    document.querySelector("#inicio").style.display = "none";
    document.querySelector("#registro").style.display = "none";
    document.querySelector("#login").style.display = "none";
}

function cargarSeccionesConClass() {
    switch (this.class) {
        case "btnTabBarPatallaAgregarIngreso":
            document.querySelector("#inicio").style.display = "block";
            break;


    }
}

function cargarSecciones() {
    // ocultarSecciones();

    //Verficamos que accion esta realizando para proceder a ajustar interfase
    switch (this.id) {

        case "btnInicioMenu":
            document.querySelector("#inicio").style.display = "block";
            break;

        case "btnRegistroMenu":
            document.querySelector("#registro").style.display = "block";
            break;

        case "btnIngresoMenu":
            document.querySelector("#login").style.display = "block";
            break;

        case "btnCerrarSesionMenu":
            document.querySelector("#inicio").style.display = "block";
            break;
        case "btnMenuAgregarUnGasto":
            document.querySelector("#pantalla-agregarGasto").style.display = "block";
            break;
        case "btnMenuAgregarIngreso":
            document.querySelector("#pantalla-agregarIngreso").style.display = "block";
            break;
        case "btnVerMovimientos":
            document.querySelector("#pantalla-verMovimientos").style.display = "block";
            break;
        case "btnMenuVerCajeros":
            document.querySelector("#pantalla-verCajeros").style.display = "block";
            break;
        case "btnMenuLogout":
            document.querySelector("#pantalla-verMovimientos").style.display = "block";
            break;
        case "btnMenuVerCotizadorCripto":
            document.querySelector("#pantalla-cotizadorCriptomoneda").style.display = "block";
            break;


    }

}

function vaciarInput() {
    // input agregarGasto
    document.querySelector("#descripcionIngreso").value = "";
    document.querySelector("#totalDelIngreso").value = "";
    // // input agregarIngreso
    document.querySelector("#descripcionGasto").value = "";
    document.querySelector("#totalDelGasto").value = "";
    // input registro

}

// HAY USUARIO LOGEADO?
function estaLogeado() {
    if (localStorage.getItem("usuarioAPP") != null)
        return true;
    else {
        return false;
    }

}

function activarUsuarioLogeado() {
    if (estaLogeado()) {

        let usr = JSON.parse(localStorage.getItem('usuarioAPP'));
        let nombreUsu = JSON.parse(localStorage.getItem('nombreUsuario'));

        document.querySelector("#divInicioUsuarioDesconocido").style.display = "none";
        document.querySelector("#divInicioUsuarioLogeado").style.display = "block";
        document.querySelector("#pMensajeLogeado").innerHTML = "Bienvenido " + nombreUsu;

        ocultarOpcionesMenu();
        mostrarOpcionesMenuUsuarioLogueado();

        listarMovimientos();
        listarRubros();

    } else {

        ocultarOpcionesMenu();
        mostrarOpcionesMenuSinIngresar();



    }
}

function mostrarOpcionesMenuUsuarioLogueado() {
    document.querySelector("#btnMenuLogout").style.display = 'block';
    document.querySelector("#btnMenuHome").style.display = 'block';
    document.querySelector("#btnMenuAgregarUnGasto").style.display = 'block';
    document.querySelector("#btnVerMovimientos").style.display = 'block';
    document.querySelector("#btnMenuAgregarIngreso").style.display = 'block';
    document.querySelector("#btnMenuVerCajeros").style.display = 'block';
    document.querySelector("#btnMenuVerCotizadorCripto").style.display = "block";



    // DARK mode
    document.querySelector("#btnDarkMode").style.display = 'block';

    // tab
    document.querySelector("ion-tab-bar").style.display = "flex";

}

function mostrarOpcionesMenuSinIngresar() {
    document.querySelector("#btnMenuLogin").style.display = 'block';
    document.querySelector("#btnMenuRegistro").style.display = 'block';
    document.querySelector("#btnMenuHome").style.display = 'block';
    // dark mode
    document.querySelector("#btnDarkMode").style.display = 'none';
    // document.querySelector("#btnCerrarSesionMenu").style.display = "none";
    document.querySelector("#divInicioUsuarioLogeado").style.display = "none";
    document.querySelector("#divInicioUsuarioDesconocido").style.display = "block";

    document.querySelector("ion-tab-bar").style.display = "none";

}

// LOGIN
function loginUsuario() {

    let usu = document.querySelector("#txtUsuarioLogin").value;
    let pwd = document.querySelector("#txtPasswordLogin").value;

    let user = {
        "usuario": usu,
        "password": pwd,
    }


    loginContraAPI(user);
}

function loginContraAPI(user) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(user);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(urlApi + "login.php", requestOptions)
        .then(response => response.json())
        .then(resp => {
            if (resp.codigo == 200) {
                hayUsuarioLogueado = true;
                localStorage.setItem("nombreUsuario", JSON.stringify(user.usuario));
                localStorage.setItem("usuarioAPP", JSON.stringify(resp));
                activarUsuarioLogeado();
                navegar("pantalla-home");
            } else {
                document.querySelector("#pLoginMensajes").style.color = "red";
                document.querySelector("#pLoginMensajes").innerHTML = resp.mensaje;
                setTimeout(() => {
                    document.querySelector("#pLoginMensajes").innerHTML = "";

                }, 5000);
            }



        })
        .catch(error => console.log('error', error));
}

// LOGOUT
function logout() {
    localStorage.removeItem("usuarioAPP");
    localStorage.removeItem("movimientos");
    localStorage.removeItem("departamentos");
    localStorage.removeItem("ciudades");
    localStorage.removeItem("nombreUsuario");
    navegar('pantalla-home');
    // nav.popToRoot();
    activarUsuarioLogeado();
}

// REGISTRO
function registrarUsuario() {
    try {
        let usuario = crearUsuario();
        //validamos que los datos sean correcto
        validarUsuario(usuario);
        //Guardamos los datos de usuario en la API
        guardarUsuarioAPI(usuario);
    } catch (error) {
        document.querySelector("#pMensajeRegistro").style.color = "red";
        document.querySelector("#pMensajeRegistro").innerHTML = error.message;
        setTimeout(() => {
            document.querySelector("#pMensajeRegistro").innerHTML = "";
        }, 4000);
    }
}

function guardarUsuarioAPI(usuario) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(usuario),
    };

    fetch(urlApi + "usuarios.php", requestOptions)
        .then((resp) => resp.json())
        .then(response => {
            console.log(response)
            if (response.codigo == 200) {
                localStorage.setItem("nombreUsuario", JSON.stringify(usuario.usuario));
                localStorage.setItem('usuarioAPP', JSON.stringify(response));
                activarUsuarioLogeado();
                navegar("pantalla-home");
                document.querySelector("#pMensajeRegistro").style.color = "green";
                document.querySelector("#pMensajeRegistro").innerHTML = "Registro correcto";
            } else {
                document.querySelector("#pMensajeRegistro").style.color = "red";
                document.querySelector("#pMensajeRegistro").innerHTML = response.mensaje;
                setTimeout(() => {
                    document.querySelector("#pMensajeRegistro").innerHTML = "";
                }, 5000);
            }
        })
        .catch(error => console.log(error));

}

function crearUsuario() {

    let usuario = document.querySelector("#txtUsuarioRegistro").value;
    let password = document.querySelector("#txtPasswordRegistro").value;
    let idDepartamento = document.querySelector("#selectDepartamentoRegistro").value;
    let idCiudad = document.querySelector("#selectCiudadRegistro").value;

    return new Usuario(usuario, password, idDepartamento, idCiudad);
}

function validarUsuario(usuario) {

    let confirmPass = document.querySelector("#txtPasswordRegistroConfirm").value;

    if (usuario.usuario === "") {
        throw new Error("El usuario no puede estar vacío");
    }
    if (usuario.password === "" || usuario.password.trim().length < 8 || usuario.password.trim().length > 20) {
        throw new Error("La contraseña es obligatorio y debe tener entre ocho y veinte caracteres");
    }
    if (usuario.password.trim() != confirmPass.trim()) {
        throw new Error("Las contraseñas no coinciden");
    }
    if (usuario.idDepartamento === "") {
        throw new Error("El departamento es obligatorio");
    }
    if (usuario.idCiudad === "") {
        throw new Error("La cuidad es obligatoria");
    }
}

// DEPARTAMENTOS
function listarDepartamentos() {
    try {
        obtenerDepartamentosAPI();

    } catch (error) {
        console.log(error.message);
    }
}

function obtenerDepartamentosAPI() {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(urlApi + "departamentos.php", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.codigo == 200) {
                localStorage.setItem("departamentos", JSON.stringify(result.departamentos));
                mostrarDepartamentosEnSelect();
            } else {
                alert("Error a la hora de obtener departamentos")
            }

        })
        .catch(error => console.log('error', error));

}

function mostrarDepartamentosEnSelect() {
    let departamentos = JSON.parse(localStorage.getItem('departamentos'));

    departamentos.map(dep => {

        document.querySelector("#selectDepartamentoRegistro").innerHTML += `

            <ion-select-option value="${dep.id}">${dep.nombre}</ion-select-option>

        `;

    })


}

//CIUDADES
function listarCiudades() {
    try {
        obtenerCiudadesAPI();
    } catch (error) {
        console.log(error.message);
    }
}

function obtenerCiudadesAPI() {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(urlApi + "ciudades.php", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.codigo == 200) {               
                localStorage.setItem('ciudades', JSON.stringify(result.ciudades))
                mostrarCiudadesEnSelect();
            } else {
                alert("Error a la hora de obtener las ciudades");
            }
        })
        .catch(error => console.log('error', error));
}

function mostrarCiudadesEnSelect() {

    let ciudades = JSON.parse(localStorage.getItem('ciudades'));

    ciudades.map(ciudad => {

        document.querySelector("#selectCiudadRegistro").innerHTML += `
            <ion-select-option value="${ciudad.id}">${ciudad.nombre}</ion-select-option>
        `;
    })
}

//RUBROS
function listarRubros() {
    try {
        obtenerRubrosAPI();
    } catch (error) {
        console.log(error.message);
    }
}

function obtenerRubrosAPI() {
    let usu = JSON.parse(localStorage.getItem('usuarioAPP'))

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", usu.apiKey);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(urlApi + "rubros.php", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.codigo == 200) {

                localStorage.setItem('rubros', JSON.stringify(result.rubros));
                mostrarRubrosEnSelect();
            } else {
                alert("Error a la hora de obtener los rubros");
            }
        })
        .catch(error => console.log('error', error));
}

function mostrarRubrosEnSelect() {

    let rubros = JSON.parse(localStorage.getItem('rubros'));

    rubros.map(rubro => {

        if (rubro.tipo == "gasto") {

            document.querySelector("#selectRubroDeGasto").innerHTML += `
                <ion-select-option value="${rubro.id}">${rubro.nombre}</ion-select-option>
            `;

        } else if (rubro.tipo == "ingreso") {

            document.querySelector("#selectRubroDelIngreso").innerHTML += `
                <ion-select-option value="${rubro.id}">${rubro.nombre}</ion-select-option>
            `;
        }

    })
}

//AGREGAR GASTO
function btnAgregarGastoHandler() {


    let usu = JSON.parse(localStorage.getItem('usuarioAPP'))

    const descripcion = document.querySelector("#descripcionGasto").value;
    let rubro = document.querySelector("#selectRubroDeGasto").value;
    const medioDePago = document.querySelector("#selectMedioPagoGasto").value;
    const total = document.querySelector("#totalDelGasto").value;
    const fecha = document.querySelector("#fechaDelGasto").value;
    document.querySelector("#pMenajeAgreagarGasto").innerHTML = "";

    if (descripcion != "" && rubro != "" && medioDePago != "" && total > 0 && fecha != 0) {

        spinner("agregarGasto");

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("apikey", usu.apiKey);

        var raw = JSON.stringify({
            "idUsuario": usu.id,
            "concepto": descripcion,
            "categoria": rubro,
            "total": total,
            "medio": medioDePago,
            "fecha": fecha
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(urlApi + "movimientos.php", requestOptions)
            .then(response => response.json())
            .then(result => {
                dealeteSpinner("agregarGasto");
                document.querySelector("#pMenajeAgreagarGasto").style.color = "green"
                document.querySelector("#pMenajeAgreagarGasto").innerHTML = "Se agrego el gasto correctamente";
                setTimeout(() => {
                    document.querySelector("#pMenajeAgreagarGasto").innerHTML = "";
                }, 5000);
                vaciarInput();
                listarMovimientos();

            })
            .catch(error => {
                console.log('error', error);
                document.querySelector("#pMenajeAgreagarGasto").innerHTML = "No se pudo agregar el gasto"
            });

    } else {
        document.querySelector("#pMenajeAgreagarGasto").style.color = "red"
        document.querySelector("#pMenajeAgreagarGasto").innerHTML = "Todos los datos son necesarios";
        setTimeout(() => {
            document.querySelector("#pMenajeAgreagarGasto").innerHTML = "";
        }, 5000);
    }


}

//AGREAGAT INGRESO
function btnAgregarIngresoHandler() {


    let usu = JSON.parse(localStorage.getItem('usuarioAPP'))

    const descripcion = document.querySelector("#descripcionIngreso").value;
    let rubro = document.querySelector("#selectRubroDelIngreso").value;
    const medioDePago = document.querySelector("#selectMedioDelIngreso").value;
    const total = document.querySelector("#totalDelIngreso").value;
    const fecha = document.querySelector("#fechaDelIngreso").value;
    document.querySelector("#pMensajeAgregarIngreso").innerHTML = "";


    if (descripcion != "" && rubro != "" && medioDePago != "" && total > 0 && fecha != 0) {
        spinner("agregarIngreso");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("apikey", usu.apiKey);

        var raw = JSON.stringify({
            "idUsuario": usu.id,
            "concepto": descripcion,
            "categoria": rubro,
            "total": total,
            "medio": medioDePago,
            "fecha": fecha
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(urlApi + "movimientos.php", requestOptions)
            .then(response => response.json())
            .then(result => {
                dealeteSpinner("agregarIngreso")
                document.querySelector("#pMensajeAgregarIngreso").style.color = "green"
                document.querySelector("#pMensajeAgregarIngreso").innerHTML = `El ingreso ${descripcion} Se agrego correctamente`;
                setTimeout(() => {
                    document.querySelector("#pMensajeAgregarIngreso").innerHTML = "";
                }, 5000);
                vaciarInput();
                listarMovimientos();

            })
            .catch(error => {
                console.log('error', error);
                document.querySelector("#pMensajeAgregarIngreso").innerHTML = "No se pudo agreagar el Ingreso corectamente"
            });


    } else {
        document.querySelector("#pMensajeAgregarIngreso").style.color = "red"
        document.querySelector("#pMensajeAgregarIngreso").innerHTML = "Todos los datos son necesarios";
        setTimeout(() => {
            document.querySelector("#pMensajeAgregarIngreso").innerHTML = "";
        }, 5000);
    }




}

// MOVIMINETOS
function listarMovimientos() {
    try {
        obtenerMovimientos();
    } catch (error) {
        console.log(error.message)
    }
}

function obtenerMovimientos() {

    let usu = JSON.parse(localStorage.getItem('usuarioAPP'))

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", usu.apiKey);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(urlApi + `movimientos.php?idUsuario=${usu.id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.codigo == 200) {
                localStorage.setItem('movimientos', JSON.stringify(result.movimientos));
                mostrarMoviminetos();
                calcularMontosTotales();
            } else {
                alert("No se pudieron obtener tus movimientos")
            }
          
        })
        .catch(error => console.log('error', error));

}

function mostrarMoviminetos() {

    let movimientos = JSON.parse(localStorage.getItem('movimientos'));
    const listado = document.querySelector("#listadoDeMoviminetos");

    document.querySelector("#numMoviminetosMenu").innerHTML = movimientos.length;


    listado.innerHTML = "";

    movimientos == "" ? listado.innerHTML = "No hay movimientos" :

        movimientos.map(movimiento => {

            listado.innerHTML += `

                <ion-item>
                    <ion-avatar slot="start">
                        <img alt="Silhouette of a person's head" src="https://dwallet.develotion.com/imgs/${movimiento.categoria <= 6 ? "gasto" : "ingreso"}.png" />
                    </ion-avatar>
                    <ion-label>
                        ${rubros[movimiento.categoria - 1]} -${movimiento.concepto}  <br>
                        ${movimiento.fecha}  - ${movimiento.categoria <= 6 ? "Gasto" : "Ingreso"} - $${movimiento.total}
                    </ion-label>

                    <ion-icon name="close-outline" slot="end" id="${movimiento.id}" onclick="presentAlert('${movimiento.id}', '${movimiento.concepto}')"></ion-icon>
                </ion-item>
            `;
        })

}

async function presentAlert(id, descripcion) {
    // mostrar alerta para que confirme si quiere eliminar el movimiento
    const alert = document.createElement('ion-alert');
    alert.header = `Se eliminara el movimineto ${descripcion} `;
    alert.buttons = [
        {
            text: 'Cancel',
            role: 'cancel',
            handler: () => { console.log("cacelado") }
        },
        {
            text: 'OK',
            role: 'confirm',
            handler: () => {
                eliminarMoviminetoHandler(id, descripcion);
            }
        }
    ];

    document.body.appendChild(alert);
    await alert.present();

    // const { role } = await alert.onDidDismiss();
    // roleOutput.innerText = `Dismissed with role: ${role}`;
    // console.log(` ${role}`)
}

function eliminarMoviminetoHandler(idMovimineto, descripcion) {


    // let idMovimineto = this.getAttribute("data-id");
    let usu = JSON.parse(localStorage.getItem('usuarioAPP'));

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", usu.apiKey);

    var raw = JSON.stringify({
        "idMovimiento": idMovimineto
    });

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://dwallet.develotion.com/movimientos.php", requestOptions)
        .then(response => response.json())
        .then(result => {

            if (result.codigo != 200) {
                console.log("Error con codigo: " + result.codigo)
            }
            calcularMontosTotales()
            obtenerMovimientos();
            let mensaje = document.querySelector("#pEliminacionDeUnMoviento");
            mensaje.style.color = "red";
            mensaje.innerHTML = `El movimiento ${descripcion} se elimino Correctamente.`
            setTimeout(() => {
                mensaje.innerHTML = ""
            }, 3000);


        })
        .catch(error => console.log('error', error));
}

function filtrarMovimietosPorCategoria() {

    let movimientos = JSON.parse(localStorage.getItem('movimientos'));
    const listado = document.querySelector("#listadoDeMoviminetos");

    listado.innerHTML = "";

    movimientos == "" ? listado.innerHTML = " No tiene movimientos" :

        movimientos.map(movimiento => {
            if (this.id == "enMoviminetosVerGastos" && movimiento.categoria <= 6) {

                listado.innerHTML += `
                    <ion-item>
                        <ion-avatar slot="start">
                            <img alt="Silhouette of a person's head" src="https://dwallet.develotion.com/imgs/${movimiento.categoria <= 6 ? "gasto" : "ingreso"}.png" />
                        </ion-avatar>
                        <ion-label>
                            ${movimiento.concepto} $${movimiento.total} - ${movimiento.fecha} - ${rubros[movimiento.categoria - 1]} - ${movimiento.categoria <= 6 ? "Gasto" : "Ingreso"}: 
                        </ion-label>

                        <ion-icon name="close-outline" slot="end" id="${movimiento.id}" onclick="presentAlert('${movimiento.id}', '${movimiento.concepto}')"></ion-icon>
                    </ion-item>
                `;
            } else if (this.id == "enMoviminetosVerIngresos" && movimiento.categoria > 6) {

                listado.innerHTML += `
                    <ion-item>
                        <ion-avatar slot="start">
                            <img alt="Silhouette of a person's head" src="https://dwallet.develotion.com/imgs/${movimiento.categoria <= 6 ? "gasto" : "ingreso"}.png" />
                        </ion-avatar>
                        <ion-label>
                            ${movimiento.concepto} $${movimiento.total} - ${movimiento.fecha} - ${rubros[movimiento.categoria - 1]} - ${movimiento.categoria <= 6 ? "Gasto" : "Ingreso"}: 
                        </ion-label>

                        <ion-icon name="close-outline" slot="end" id="${movimiento.id}" onclick="presentAlert('${movimiento.id}', '${movimiento.concepto}')"></ion-icon>
                    </ion-item>
                `;

            }

        })

    calcularMontosTotales();

}

function calcularMontosTotales() {

    let moviminetos = JSON.parse(localStorage.getItem('movimientos'));
    let gastos = 0;
    let ingresos = 0;
    let total = 0;

    if (moviminetos.length != 0) {

        moviminetos.forEach(mov => {

            if (mov.categoria <= 6) {
                gastos += mov.total;
                total -= mov.total;
            } else {
                ingresos += mov.total;
                total += mov.total;
            }

        });

    } else {
        gastos = 0;
        ingresos = 0;
    }


    document.querySelector("#movimientosMotosTotales").innerHTML = `Gastos: $${gastos}.<br><br> Ingresos: $${ingresos}.`;
    document.querySelector("#saldoEnMovimientos").innerHTML = `$${total}`;


}


// Ub del usuario 
let posUsu = null;

// CAJEROS
function listarCajeros() {
    try {

        if (map == null) {
            obtenerCajerosApi();
        }

    } catch (error) {
        console.log(error.message);
    }
}

function obtenerCajerosApi() {

    spinner("verCajeros");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://dwallet.develotion.com/cajeros.php", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.codigo == 200) {
                localStorage.setItem('cajeros', JSON.stringify(result.cajeros))
                cargarPosicionUsuario();
            } else {
                alert("No se pudieron obtener los cajeros cercanos");
                dealeteSpinner("verCajeros");

            }
        })
        .catch(error => console.log('error', error));
}

// MAPA
function errorObtenerUbicacionBrowser() {
    console.log("mapa error")
    //definimos una ubicacion por defecto
    alert("Error al obtener la posición del usuario");
    posUsu = {
        latitude: -34.903816878014354,
        longitude: -56.19059048108193
    };

    inicializarMapa();
}

function obtenerUbicacionBrowser(pos) {
    posUsu = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy
    };

    inicializarMapa();
}

function cargarPosicionUsuario() {
    window.navigator.geolocation.getCurrentPosition(obtenerUbicacionBrowser, errorObtenerUbicacionBrowser);
}

function inicializarMapa() {
    dealeteSpinner("verCajeros");

    //crear el mapa y lo ubico segun la ubicacion del usuario
    map = L.map('map').setView([posUsu.latitude, posUsu.longitude], 14);
    console.log(map)

    // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWNhaWFmYSIsImEiOiJjanh4cThybXgwMjl6M2RvemNjNjI1MDJ5In0.BKUxkp2V210uiAM4Pd2YWw', {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        id: 'mapbox/streets-v11',
        accessToken: 'your.mapbox.access.token'
    }).addTo(map);

    // marco la ubicacion del usuario en el mapa
    L.marker([posUsu.latitude, posUsu.longitude]).addTo(map).bindPopup("<b>Mi ubicacion</b>").openPopup();

    // agrego la ubicacion de los cajeros
    mostrarCajerosEnMapas();


}

function mostrarCajerosEnMapas() {


    // obtener los cajros
    let cajeros = JSON.parse(localStorage.getItem('cajeros'));

    let distancias = [];
    // agregar las distintas distancias de los cajeros a un array y marco en el mapa en donde estan
    cajeros.forEach(cajero => {
        // marco la posicion de los cajeros en el mapa con su informacion
        L.marker([cajero.latitud, cajero.longitud]).addTo(map).on("click", mostrarDistancia).bindPopup(`
            ${cajero.disponible == 1 ? "Abierto" : "Cerrado"}<br>
            ${cajero.tienePesos == 1 ? "Tiene Pesos" : "No tiene Pesos"}<br>
            ${cajero.tieneDolares == 1 ? "Tiene Dolares" : "No tiene Dolares"}
        `);
        // calcula distancia entre el usuario y el cajero
        let distancia = Number(map.distance([posUsu.latitude, posUsu.longitude], [cajero.latitud, cajero.longitud]) / 1000).toFixed(2);
        distancias.push(distancia)

    });
    // ordeno la lista de distancaias de menor a mayor
    let numerosOrdenados = distancias.sort((a, b) => a - b);
    // y me quedo con las primero 5
    let cincoDistanciasMasCerca = numerosOrdenados.slice(0, 5);
    // creo un circulo con el centro en la ub del usuario y el radio del 5to local mas lejos
    var circle = L.circle([posUsu.latitude, posUsu.longitude], {
        color: "#2345DC",
        fillColor: "#23B8DC",
        fillOpacity: 0.2,
        radius: cincoDistanciasMasCerca[4] * 1000,
    }).addTo(map);

    // if (cincoDistanciasMasCerca.includes(distancia)) {
    //     L.marker([cajero.latitud, cajero.longitud]).addTo(map).on("click", mostrarDistancia);
    // }

}

function mostrarDistancia(data) {
    // ubicacion del cajero seleccionado
    let lonC = data.latlng.lng
    let latC = data.latlng.lat
    // distancia de la posicion del usario hasta el cajero
    let distancia = Number(map.distance([posUsu.latitude, posUsu.longitude], [latC, lonC]) / 1000).toFixed(2);
    let mensaje = "";
    // mensaje arriba del mapa con la distancia que le queda el cajero
    mensaje = `Distancia: ${distancia}km`

    setTimeout(() => {
        document.getElementById("mensajeEnBusquedaDelMapa").innerHTML = "";
    }, 7000);

    document.getElementById("mensajeEnBusquedaDelMapa").innerHTML = mensaje;

}

function btnBuscarCajerosPorDireccionHandler() {
    let direccion = document.querySelector("#inputBuscadorMapa").value;
    console.log(direccion)

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${direccion}, Uruguay`)
        .then(response => response.json())
        .then(function (data) {
            if (data && data.length > 0) {
                let primerDireccion = data[0];
                map.setView([primerDireccion.lat, primerDireccion.lon], 14);
            } else {
                alert("No se encontraron cajeros con esa direccion");
            }
        });
}

// Evento de click en html dinamico
function agregarEventosDeClickEnButtonsDinamicos(clase, funcion) {
    // obtengo todos los bottones con esa class
    let arrayDeBotones = document.querySelectorAll(`${clase}`);
    //le agrego evento de click a todos los bottones
    for (let i = 0; i < arrayDeBotones.length; i++) {
        botonActual = arrayDeBotones[i];
        botonActual.addEventListener("click", funcion);
    }
}

// Spinner
function spinner(pantalla) {
    const spinner = document.createElement("ion-progress-bar");
    spinner.type = "indeterminate";

    const spinnerContainer = document.querySelector(`pantalla-${pantalla} ion-header`);
    spinnerContainer.appendChild(spinner);
}

function dealeteSpinner(pantalla) {
    const spinner = document.querySelector(`pantalla-${pantalla} ion-header ion-progress-bar`)
    spinner.remove();
}

// Muestro el theme guardado en localStorage 
let theme = JSON.parse(localStorage.getItem("theme"));
document.body.classList.toggle(theme)
if (theme === "dark") {
    document.getElementById("btnDarkMode").innerHTML = `
        <ion-icon slot="start" name="contrast-outline"></ion-icon>            
        <ion-label>Ligth Theme</ion-label>
    `;
}
// cambia el theme dark || ligth
function changeDarkTeam() {

    let contenido = document.getElementById("btnDarkMode");
    let theme = JSON.parse(localStorage.getItem("theme"));

    if (theme === "dark") {
        document.body.classList.toggle('dark')
        localStorage.setItem('theme', JSON.stringify('light'))
        contenido.innerHTML = `
            <ion-icon slot="start" name="moon"></ion-icon>
            <ion-label>Dark Theme</ion-label>
        `;

    } else {

        localStorage.setItem('theme', JSON.stringify('dark'))
        document.body.classList.toggle('dark')

        contenido.innerHTML = `
            <ion-icon slot="start" name="contrast-outline"></ion-icon>            
            <ion-label>  Ligth Theme</ion-label>
        `;

    }


    // obtiene la preferencia del usuario

    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // if (prefersDark.matches == true) {
    //     localStorage.setItem('theme', JSON.stringify('dark'))
    //     document.body.classList.toggle('dark')

    // }


}



// CRIPTO
// ApiCryptoCompare 
// https://min-api.cryptocompare.com/documentation
function obtenerCotizacion() {

    const urlTop20Cripto = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';

    fetch(urlTop20Cripto)
        .then(result => result.json())
        .then(result => {
            mostrarCriptoEnSelect(result.Data);
        })
        .catch(error => console.log(error))

}


function mostrarCriptoEnSelect(criptomonedas) {

    const criptomonedasSelect = document.querySelector('#criptomonedas');


    criptomonedas.map(cripto => {
        const { FullName, Name } = cripto.CoinInfo;

        criptomonedasSelect.innerHTML += `
            <ion-select-option value="${Name}">${FullName}</ion-select-option>
        `;


    })
}


function btnCotizarCriptomonedaHandler() {
    const monedaSelect = document.querySelector('#moneda').value;
    const criptomonedaSelect = document.querySelector('#criptomonedas').value;
    let mensaje = "";

    if (monedaSelect != "" && criptomonedaSelect != "") {
        spinner("cotizadorCriptomoneda");
        cotizarCriptoApi(monedaSelect, criptomonedaSelect);
    } else {
        mensaje = "Todos los campos son obligatorios"
    }

    document.querySelector('#pMensajeCotizadorCripto').innerHTML = mensaje;

    setTimeout(() => {
        document.querySelector('#pMensajeCotizadorCripto').innerHTML = "";
    }, 30000);


}


function cotizarCriptoApi(moneda, cripto) {
    const urlCotizarCriptoSegunLaMoneda = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;

    fetch(urlCotizarCriptoSegunLaMoneda)
        .then(result => result.json())
        .then(result => {
            mostrarCotizacion(result.DISPLAY[cripto][moneda])
            dealeteSpinner("cotizadorCriptomoneda");
        })
        .catch(error => console.log(error))

}

function mostrarCotizacion(data) {

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = data;

    datos = "";

    datos += ` 
        <br>
        <strong>El precio es: ${PRICE} </strong><br><br>
        Precio mas alto del dia <strong>${HIGHDAY}</strong> <br>
        Precio mas bajo del dia <strong>${LOWDAY}</strong> <br>
        Variacion ultimas 24hs <strong>${CHANGEPCT24HOUR}% </strong><br>
        Ulima actualizaccion ${LASTUPDATE}
        <br><br><br>
    `;

    document.querySelector('#pMensajeCotizadorCripto').innerHTML = datos;


}








