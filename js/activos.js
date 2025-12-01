$(document).ready(function(){

    idactivo = "";
    var div_sede_dependencia = document.querySelector("#div_sede_dependencia");
    var div_sede_dependencia_editar = document.querySelector("#div_sede_dependencia_editar");
    var div_transferencia = document.querySelector("#div_transferencia");
    var div_prestamo = document.querySelector("#div_prestamo");
    var txt_idactivo = document.querySelector("#txt_idactivo");
    var txt_idactivo_mov = document.querySelector("#mov_idactivo");
    var txt_idactivo_mov_dev = document.querySelector("#mov_idactivo_dev");

    var cod_patrimonial_dev = document.querySelector("#cod_patrimonial_dev");

    var botonActualizar = document.querySelector("#actualizar");
    var botonGuardar = document.querySelector("#registrar");


    function registrarActivo() {
    var idcategoria = $("#idcategoria").val();
    var txt_marca = $("#txt_marca").val();
    var txt_modelo = $("#txt_modelo").val();
    var txt_serie = $("#txt_serie").val();
    var txt_patrimonial = $("#txt_patrimonial").val();
    var select_responsable = $("#select_responsable").val();
    var select_sede = $("#select_sede").val();
    var select_dependencia = $("#select_dependencia").val();
    var foto = $("#foto")[0].files[0];
    var select_estado = $("#select_estado").val();
    var observacion = $("#txt_observacion").val();

    if (
        idcategoria == "" ||
        txt_marca == "" ||
        txt_modelo == "" ||
        txt_serie == "" ||
        txt_patrimonial == "" ||
        !select_responsable ||
        !select_sede ||
        !select_dependencia ||
        !foto ||
        !select_estado ||
        observacion == ""
    ) {
        mostrarAlerta("warning", "¡Completar los campos necesarios!");
    } else {
        Swal.fire({
            icon: "question",
            title: "¿Está seguro de registrar?",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Aceptar"
        }).then((result) => {
            if (result.isConfirmed) {
                // ✅ Crear FormData para enviar archivo
                var formData = new FormData();
                formData.append("op", "registrarActivo");
                formData.append("idcategoria", idcategoria);
                formData.append("txt_marca", txt_marca);
                formData.append("txt_modelo", txt_modelo);
                formData.append("txt_serie", txt_serie);
                formData.append("txt_patrimonial", txt_patrimonial);
                formData.append("select_responsable", select_responsable);
                formData.append("select_sede", select_sede);
                formData.append("select_dependencia", select_dependencia);
                formData.append("foto", foto);
                formData.append("select_estado", select_estado);
                formData.append("observacion", observacion);

                $.ajax({
                    url: "controllers/Activo.controller.php",
                    type: "POST",              // DEBE SER POST
                    data: formData,            // Usar FormData
                    contentType: false,        // Obligatorio
                    processData: false,        // Obligatorio
                    success: function (e) {
                        mostrarAlerta("success", "¡Registrado con éxito!");
                        $("#formularioActivo")[0].reset();
                        $("#select_responsable").val(null).trigger('change');
                        $("#select_sede").val(null).trigger('change');
                        $("#select_dependencia").val(null).trigger('change');
                        $("#idcategoria").val(null).trigger('change');
                        $("#foto").next(".custom-file-label").text("Eliga imagen");
                        $("#foto").val("");
                        div_sede_dependencia.classList.add('asignar');
                        $("#modal_registrar").modal("hide");
                        listarActivos();
                    },
                    error: function (xhr, status, error) {
                        console.error("Error AJAX:", error);
                    }
                });
            }
        });
    }
}


    function activoYaExiste(){
        // let nombreproductoYaExiste = $("#nombreproducto").val();
        // var nombreproductoYaExiste = $("#nombreproducto").val();

        let txt_patrimonial = $("#txt_patrimonial").val(); 

        if(txt_patrimonial == ""){
            mostrarAlerta("warning", "¡Completar los campos necesarios!");
        }else{
            var datos = {
                'op' : 'activoYaRegistrado',
                'txt_patrimonial' : txt_patrimonial
            };
            $.ajax({
                type: "GET",
                url:  "controllers/Activo.controller.php",
                data: datos,
                success: function(resp){
                    if(resp == 1){
                        mostrarAlerta("error", '¡Ya existe este activo con código patrimonial: '+txt_patrimonial+'!');
                    }
                    else if(resp == 2){
                        registrarActivo();
                    }else{
                        mostrarAlerta("error", "¡A ocurrido un error!");
                    }
                }
            });
        }
    }

    function cargarCategorias(select){ 
        var datos ={
            'op': 'cargarCategoria'
        };
        $.ajax({
            url : 'controllers/Categoria.controller.php',
            type: 'GET',
            data: datos,
            success:function(e){
                $(select).html(e);
            }
        });
    }

    function cargarCategoriasFiltro(select){ 
        var datos ={
            'op': 'cargarCategoriasFiltro'
        };
        $.ajax({
            url : 'controllers/Categoria.controller.php',
            type: 'GET',
            data: datos,
            success:function(e){
                $(select).html(e);
            }
        });
    }

    function cargarAdministrativos(select){ 
        var datos ={
            'op': 'cargarAdministrativo'
        };
        $.ajax({
            url : 'controllers/Administrativo.controller.php',
            type: 'GET',
            data: datos,
            success:function(e){
                $(select).html(e);
            }
        });
    }

    function cargarAdministrativosFiltro(select){ 
        var datos ={
            'op': 'cargarAdministrativosFiltro'
        };
        $.ajax({
            url : 'controllers/Administrativo.controller.php',
            type: 'GET',
            data: datos,
            success:function(e){
                $(select).html(e);
            }
        });
    }

    function cargarCalidadMovFiltro(select){ 
        var datos ={
            'op': 'cargarCalidadMovFiltro'
        };
        $.ajax({
            url : 'controllers/Activo.controller.php',
            type: 'GET',
            data: datos,
            success:function(e){
                $(select).html(e);
            }
        });
    }

    function cargarOtrosAdministrativos(select){ 
        let idadministrativo = $("#idresponsable").val();
        var datos ={
            'op': 'cargarOtrosAdministrativos',
            'idadministrativo' : idadministrativo
        };
        $.ajax({
            url : 'controllers/Administrativo.controller.php',
            type: 'GET',
            data: datos,
            success:function(e){
                $(select).html(e);
            }
        });
    }

    function cargarDependencias(select){
        return $.ajax({
            url : 'controllers/Dependencia.controller.php',
            type: 'GET',
            data: { op: 'cargarDependencias' },
            success:function(e){
                $(select).html(e);
            }
        });
    }
    
    // Cargar los nombres de las dependencias
    function cargarSede(select){
        return $.ajax({
            url : 'controllers/Sede.controller.php',
            type: 'GET',
            data: { op: 'cargarSede' },
            success:function(e){
                $(select).html(e);
            }
        });
    }

    // Cargar id_dependencia_sede
    function cargarSedePorAdministrativo(idAdministrativo){ 
        $.ajax({
            url : 'controllers/Administrativo.controller.php',
            type: 'GET',
            data: {
                'op': 'listarSedePorAdministrativo',
                'idAdministrativo': idAdministrativo
            },
            success:function(e){
                $('#select_sede').html(e);
                $('#select_sede_editar').html(e);
                $('#sede_destino').html(e);
                // if(idDependenciaSeleccionada){
                //     $('#select_dependencia').val(idDependenciaSeleccionada);
                // }
            }
        });
    }

    // Cargar id_dependencia_sede
    function cargarDependenciaPorAdministrativo(idAdministrativo){ 
        $.ajax({
            url : 'controllers/Administrativo.controller.php',
            type: 'GET',
            data: {
                'op': 'listarDependenciaPorAdministrativo',
                'idAdministrativo': idAdministrativo
            },
            success:function(e){
                $('#select_dependencia').html(e);
                $('#select_dependencia_editar').html(e);
                $('#dependencia_destino').html(e);
                // if(idDependenciaSeleccionada){
                //     $('#select_dependencia').val(idDependenciaSeleccionada);
                // }
            }
        });
    }

    function listarActivos(){
        $.ajax({
            url: 'controllers/Activo.controller.php',
            type: 'GET',
            data: 'op=listarActivo',
            success: function(e){
                var tabla = $("#tablaActivo").DataTable();
                tabla.destroy();
                $("#datosActivo").html(e);
                $("#tablaActivo").DataTable({
                    language: {
                        "sProcessing":     "Procesando...",
                        "sLengthMenu":     "Mostrar _MENU_ registros",
                        "sZeroRecords":    "No se encontraron resultados",
                        "sEmptyTable":     "No hay datos disponibles en la tabla",
                        "sInfo":           "Mostrando _START_ a _END_ de _TOTAL_ registros",
                        "sInfoEmpty":      "Mostrando 0 a 0 de 0 registros",
                        "sInfoFiltered":   "(filtrado de _MAX_ registros totales)",
                        "sSearch":         "Buscar:",
                        "oPaginate": {
                            "sFirst":    "Primero",
                            "sLast":     "Último",
                            "sNext":     "Siguiente",
                            "sPrevious": "Anterior"
                        }
                    },
                    columnDefs: [
                    {
                        visible: true,
                        searchable: true
                    }
                    ],
                    dom: 'Bfrtip',
                    buttons: ['copy', 'pdf', 'excel', 
                        {
                            extend: 'print',
                            text: "Imprimir",
                            title: "",
                            footer: true,
                            exportOptions: {
                                columns: [ 0, 1, 2, 3,4,5 ],
                                stripHtml: false, /* Aquí indicamos que no se eliminen las imágenes */
                            }
                        }
                    ]
                });
            }
        });
    }


    $("#tablaProducto").on("click", ".eliminar", function(){
        let idproducto = $(this).attr('data-idproducto');
        Swal.fire({
            icon: 'question',
            title: 'Esta seguro de eliminar?',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar',
        }).then((result)=>{
            if(result.isConfirmed){
                var datos = {
                    'op' : 'eliminarProducto',
                    'idproducto' : idproducto
                };
                $.ajax({
                    url: 'controllers/Producto.controller.php',
                    type: 'GET',
                    data: datos,
                    success: function(e){
                        mostrarAlerta("success", "¡Eliminado correctamente!");
                        listarProductosFarmaciaPrueba();
                    }
                });
            }
        });
    });

    $("#tablaActivo").on('click', ".modificar", function(){
        let idactivo = $(this).attr('data-idactivo');

        var datos = {
            'op' : 'getActivo',
            'idactivo' : idactivo
        };
        console.log(datos);
        $.ajax({
            url: 'controllers/Activo.controller.php',
            type: 'GET',
            data: datos,
            success: function(result){                        
                if ($.trim(result) != ""){

                    // $("#idcategoria").prop('disabled', true);
                    // $("#stock").prop('disabled', true);
                    // $("#fotografia").prop('disabled', true);

                    // $("#descripcion").prop('disabled', true);
                    
                    div_sede_dependencia_editar.classList.remove('asignar');
                    

                    var resultado = JSON.parse(result);
                    // console.log(resultado);
                    
                     Promise.all([
                        cargarSede("#select_sede_editar"),
                        cargarDependencias("#select_dependencia_editar"),
                    ]).then(() => {

                    $("#idcategoria_editar").val(resultado[0].id_categoria).trigger('change');
                    $("#txt_marca_editar").val(resultado[0].marca);
                    
                    $("#txt_modelo_editar").val(resultado[0].modelo);
                    $("#txt_serie_editar").val(resultado[0].serie);
                    $("#txt_patrimonial_editar").val(resultado[0].cod_patrimonial);
                    $("#select_responsable_editar").val(resultado[0].id_administrativo).trigger('change');
                    $("#select_sede_editar").val(resultado[0].id_sede);
                    $("#select_dependencia_editar").val(resultado[0].id_dependencia);
                    $("#select_estado_editar").val(resultado[0].estado);
                    $("#txt_observacion_editar").val(resultado[0].observacion);

                    // limpiar input file
                    $("#foto_editar").val("");

                    // actualizar label del input file
                    if (resultado[0].foto && resultado[0].foto !== "") {
                        $("#foto_editar").next(".custom-file-label").text(resultado[0].foto);
                        $("#foto_actual").val(resultado[0].foto);
                    } else {
                        $("#foto_editar").next(".custom-file-label").text("Seleccione una imagen");
                    }

                    // tinymce.get("nombreproducto").setContent(resultado[0].nombreproducto);
                    txt_idactivo.setAttribute("data-idactivo", resultado[0].id_activo);

                    // $("#fechavencimiento").val(resultado[0].fechavencimiento);
                    $("#modal_editar").modal("show");
                    });
                }else{
                    mostrarAlerta("warning", "¡No encontramos registros!");
                }
            }
        });
    });


    $("#tablaActivo").on("click", ".mover", function(){
        let idactivo = $(this).data("idactivo");

        $("#mov_idactivo").val(idactivo);
        $("#mov_fecha").val(new Date().toISOString().slice(0, 10)); // Fecha hoy

        // Cargar lista de responsables (si deseas desde AJAX)
        
        
        $("#modalMovimiento").modal("show");

        var datos = {
            'op' : 'getAdministrativoActivo',
            'idactivo' : idactivo
        };

        // console.log(datos);
        $.ajax({
            url: 'controllers/Administrativo.controller.php',
            type: 'GET',
            data: datos,
            success: function(resultado){                        
                if ($.trim(resultado) != ""){
                    
                    // console.log("RESPUESTA:", resultado);
                    
                    let data = JSON.parse(resultado); // ← IMPORTANTE
                    $("#idresponsable").val(data[0].id_administrativo);
                    $("#pres_responsable").val(data[0].npersona);
                    $("#transf_responsable_actual").val(data[0].npersona);

                    txt_idactivo_mov.setAttribute("data-idactivo", data[0].id_activo);

                    cargarOtrosAdministrativos("#resp_temporal");
                    cargarOtrosAdministrativos("#mov_responsable");
                } else {
                    mostrarAlerta("warning", "¡No encontramos registros!");
                }
            }
        });


    });

    $("#tablaActivo").on("click", ".devolucion", function(){

        let idactivo = $(this).data("idactivo");

        $("#mov_idactivo_dev").val(idactivo);
        $("#mov_fecha_dev").val(new Date().toISOString().slice(0, 10)); // Fecha hoy

        $("#modalMovimientoDev").modal("show");

        var datos = {
            'op' : 'traerActivoDevolucion',
            'idactivo' : idactivo
        }

        $.ajax({
            url: 'controllers/Activo.controller.php',
            type: 'GET',
            data: datos,
            success: function(resultado){                        
                if ($.trim(resultado) != ""){
                    
                    console.log("RESPUESTA:", resultado);
                    
                    let data = JSON.parse(resultado); // ← IMPORTANTE
                    $("#idresponsable_dev").val(data[0].id_administrativo);
                    $("#pres_responsable_dev").val(data[0].npersona);

                    txt_idactivo_mov_dev.setAttribute("data-idactivo", data[0].id_activo);
                    cod_patrimonial_dev.innerHTML = data[0].cod_patrimonial;

                } else {
                    mostrarAlerta("warning", "¡No encontramos registros!");
                }
            }
        });
    });

    function volverActivos(){
        window.location.href = "main.php?view=activo";
    }

    
    $("#cancelar").click(function(){
        $("#formularioActivo")[0].reset();
        $("#select_responsable").val(null).trigger('change');
        $("#select_sede").val(null).trigger('change');
        $("#select_dependencia").val(null).trigger('change');
        $("#idcategoria").val(null).trigger('change');
        $("#foto").next(".custom-file-label").text("Eliga imagen");
        $("#foto").val("");
        div_sede_dependencia.classList.add('asignar');
    });

    $("#borrar_datos_modal").click(function(){
        $("#formularioActivo")[0].reset();
        $("#select_responsable").val(null).trigger('change');
        $("#select_sede").val(null).trigger('change');
        $("#select_dependencia").val(null).trigger('change');
        $("#idcategoria").val(null).trigger('change');
        $("#foto").next(".custom-file-label").text("Eliga imagen");
        $("#foto").val("");
        div_sede_dependencia.classList.add('asignar');
    });


    $("#cancelar_mov").click(function(){
        $("#formMovimiento")[0].reset();
        $("#select_responsable").val(null).trigger('change');
        $("#sede_destino").val(null).trigger('change');
        $("#dependencia_destino").val(null).trigger('change');
        div_transferencia.classList.add('asignar');
        div_prestamo.classList.add('asignar');
    });

    $("#cancelar_mov_dev").click(function(){
        $("#formMovimientoDev")[0].reset();
    });

    function modificarActivo() {

        let idactivo = $("#txt_idactivo").attr("data-idactivo");

        let idcategoria = $("#idcategoria_editar").val();
        let marca = $("#txt_marca_editar").val();
        let modelo = $("#txt_modelo_editar").val();
        let serie = $("#txt_serie_editar").val();
        let codPatrimonial = $("#txt_patrimonial_editar").val();
        let idadministrativo = $("#select_responsable_editar").val();
        let idsede = $("#select_sede_editar").val();
        let iddependencia = $("#select_dependencia_editar").val();
        let estado = $("#select_estado_editar").val();
        let observacion = $("#txt_observacion_editar").val();
        let foto = $("#foto_editar")[0].files[0]; // archivo imagen
        let foto_actual = $("#foto_actual").val();

        // Validación mínima
        if (
            idcategoria == "" ||
            marca == "" ||
            modelo == "" ||
            serie == "" ||
            codPatrimonial == "" ||
            !idadministrativo ||
            !idsede ||
            !iddependencia ||
            !estado ||
            observacion == ""
        ) {
            mostrarAlerta("warning", "¡Completa los campos obligatorios!");
            return;
        }

        Swal.fire({
            icon: "question",
            title: "¿Está seguro de modificar el activo?",
            showCancelButton: true,
            confirmButtonText: "Sí, modificar",
            cancelButtonText: "Cancelar"
        }).then((result) => {

            if (result.isConfirmed) {

                let datos = new FormData();
                datos.append("op", "modificarActivo");
                datos.append("idactivo", idactivo);
                datos.append("idcategoria", idcategoria);
                datos.append("marca", marca);
                datos.append("modelo", modelo);
                datos.append("serie", serie);
                datos.append("codPatrimonial", codPatrimonial);
                datos.append("idadministrativo", idadministrativo);
                datos.append("idsede", idsede);
                datos.append("iddependencia", iddependencia);
                datos.append("estado", estado);
                datos.append("observacion", observacion);
                datos.append("foto_actual", foto_actual);

                if (foto !== undefined) {
                    datos.append("foto", foto); // si cambia foto
                }

                $.ajax({
                    url: "controllers/Activo.controller.php",
                    type: "POST",
                    data: datos,
                    contentType: false,
                    processData: false,
                    success: function(e) {
                        let r = JSON.parse(e);

                        if (r.resultado == 1) {
                            mostrarAlerta("success", "Activo modificado correctamente");
                            $("#modal_editar").modal("hide");
                            listarActivos();
                        } else if (r.resultado == 2) {
                            mostrarAlerta("error", "¡El código patrimonial ya está registrado!");
                        } else {
                            mostrarAlerta("error", "¡Error desconocido al modificar!");
                        }
                    }
                });

            }

        });

    }


    function registrarMovimientoDevolucion(){
        let idactivo = $("#mov_idactivo_dev").val();
        let mov_idtipo = $("#mov_idtipo_dev").val();
        // let mov_fecha = $("#mov_fecha").val();
        let dev_responsable = $("#idresponsable_dev").val();
        let dev_motivo = $("#devolucion_motivo").val();
        
        if(idactivo == "" || mov_idtipo == "" || dev_responsable == "" || dev_motivo == ""){
            mostrarAlerta("warning", "¡Completar los campos necesarios!");
        }else{
            Swal.fire({
                icon: 'warning',
                title: '¿Confirma que desea registrar la restitución del activo?',
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar'
            }).then((result) =>{
                if(result.isConfirmed){
                    var datos ={
                        'op' : 'registrarMovDevolucion',
                        'idactivo' : idactivo,
                        'mov_idtipo' : mov_idtipo,
                        'dev_responsable' : dev_responsable,
                        'dev_motivo' : dev_motivo
                    };
                    console.log(datos);
                    $.ajax({
                        url: 'controllers/Activo.controller.php',
                        type: 'GET',
                        data: datos,
                        success: function(e){
                            mostrarAlerta("success", "¡La operación de restitución ha sido registrada correctamente!");

                            $("#formMovimientoDev")[0].reset();
                            $("#modalMovimientoDev").modal("hide");
                            listarActivos();
                        }
                    });
                }
            });
        }
    }


    $("#categoriaselect").change(function(){
        var filtros = $(this).val();
        // console.log(filtros);
        if(filtros==""){
            listarProductosFarmaciaPrueba();
        }else{

            $.ajax({
                url: 'controllers/Producto.controller.php',
                type: 'GET',
                data: {
                    'op': 'filtrarCategorias',
                    'idcategoria' : filtros
                    },
                success: function(result){
                    // console.log(result);
                    $("#tablaProductolistar").html(result);
                }
            });
        }
    });

    $("#idcategoriamodal").change(function(){
        var filtros = $(this).val();
        console.log(filtros);
        // console.log(filtros);
        if(filtros==""){
            listarProductosFarmaciaPrueba();
        }else{
            $.ajax({
                url: 'controllers/Producto.controller.php',
                type: 'GET',
                data: {
                    'op': 'cargarProducto',
                    'idcategoria' : filtros
                    },
                success: function(result){
                    console.log(result);
                    $("#idproductomodal").html(result);
                }
            });
        }
    });

    $("#idcategoriasalida").change(function(){
        var filtros = $(this).val();
        console.log(filtros);
        // console.log(filtros);
        if(filtros==""){
            listarProductosFarmaciaPrueba();
        }else{
            $.ajax({
                url: 'controllers/Producto.controller.php',
                type: 'GET',
                data: {
                    'op': 'cargarProducto',
                    'idcategoria' : filtros
                    },
                success: function(result){
                    console.log(result);
                    $("#idproductosalida").html(result);
                }
            });
        }
    });

    // Select de sede y dependencia
    $('#select_responsable').on('change', function(){
        let idAdministrativo = $(this).val();
        if(idAdministrativo){
            div_sede_dependencia.classList.remove('asignar');
            cargarSedePorAdministrativo(idAdministrativo)
            cargarDependenciaPorAdministrativo(idAdministrativo)
            // cargarDependenciasPorSede(idSede);
        }
    });

    $('#select_responsable_editar').on('change', function(){
        let idAdministrativo = $(this).val();
        if(idAdministrativo){
            cargarSedePorAdministrativo(idAdministrativo)
            cargarDependenciaPorAdministrativo(idAdministrativo)
            // cargarDependenciasPorSede(idSede);
        }
    });

    $('#mov_responsable').on('change', function(){
        let idAdministrativo = $(this).val();
        if(idAdministrativo){
            cargarSedePorAdministrativo(idAdministrativo)
            cargarDependenciaPorAdministrativo(idAdministrativo)
            // cargarDependenciasPorSede(idSede);
        }
    });

     $('#mov_idtipo').on('change', function() {
        let tipo = $(this).val();
        var div_prestamo = document.querySelector("#div_prestamo");
        var div_transferencia = document.querySelector("#div_transferencia");

        if (tipo == "PRESTAMO") {
            div_prestamo.classList.remove('asignar'); // tiempo + motivo
            div_transferencia.classList.add('asignar');

        } else if (tipo == "TRANSFERENCIA") {
            div_transferencia.classList.remove('asignar');
            div_prestamo.classList.add('asignar');
            $("#foto_editar").val("");
        }
    });


    function registrarMovimientoPrestamo(){
        let idactivo = $("#mov_idactivo").attr("data-idactivo");
        let mov_idtipo = $("#mov_idtipo").val();
        // let mov_fecha = $("#mov_fecha").val();
        let prestamo_tiempo = $("#prestamo_tiempo").val();
        let pres_responsable = $("#idresponsable").val();
        let resp_temporal = $("#resp_temporal").val();
        let prestamo_motivo = $("#prestamo_motivo").val();
        
        if(mov_idtipo == "" || pres_responsable == "" || resp_temporal == undefined || prestamo_tiempo == "" || prestamo_motivo == ""){
            mostrarAlerta("warning", "¡Completar los campos necesarios!");
        }else{
            Swal.fire({
                icon: 'question',
                title: '¿Está seguro de registrar?',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar'
            }).then((result) =>{
                if(result.isConfirmed){
                    var datos ={
                        'op' : 'registrarMovPrestamo',
                        'idactivo' : idactivo,
                        'mov_idtipo' : mov_idtipo,
                        'pres_responsable' : pres_responsable,
                        'resp_temporal' : resp_temporal,
                        'prestamo_tiempo' : prestamo_tiempo,
                        'prestamo_motivo' : prestamo_motivo
                    };
                    console.log(datos);
                    $.ajax({
                        url: 'controllers/Activo.controller.php',
                        type: 'GET',
                        data: datos,
                        success: function(e){
                            mostrarAlerta("success", "¡Activo en Préstamo con éxito!");
                            $("#formMovimiento")[0].reset();
                            $("#select_responsable").val("null").trigger('change');
                            $("#sede_destino").val("");
                            $("#dependencia_destino").val("");
                            div_transferencia.classList.add('asignar');
                            div_prestamo.classList.add('asignar');
                            $("#modalMovimiento").modal("hide");
                            listarActivos();
                        }
                    });
                }
            });
        }
    }

    function validarTipoMov(){
        let mov_idtipo = $("#mov_idtipo").val();

        if(mov_idtipo == 'PRESTAMO'){
            registrarMovimientoPrestamo();
        }else if(mov_idtipo == 'TRANSFERENCIA'){
            registrarMovimientoTransferencia();
        }else{
            mostrarAlerta("error","Seleccione movimiento a realizar!")
        }
    }

    function registrarMovimientoTransferencia(){
        let idactivo = $("#mov_idactivo").attr("data-idactivo");
        let mov_idtipo = $("#mov_idtipo").val();

        let transf_responsable_actual = $("#idresponsable").val();
        let mov_responsable = $("#mov_responsable").val(); //destino responsable
        let sede_destino = $("#sede_destino").val();
        let dependencia_destino = $("#dependencia_destino").val();
        let transferencia_motivo = $("#transferencia_motivo").val();
        
        if(mov_idtipo == "" || transf_responsable_actual == "" || mov_responsable == "" || sede_destino == "" || dependencia_destino == "" || transferencia_motivo == ""){
            mostrarAlerta("warning", "¡Completar los campos necesarios!");
        }else{
            Swal.fire({
                icon: 'question',
                title: '¿Está seguro de registrar?',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar'
            }).then((result) =>{
                if(result.isConfirmed){
                    var datos ={
                        'op' : 'registrarMovTransferencia',
                        'idactivo' : idactivo,
                        'mov_idtipo' : mov_idtipo,
                        'transf_responsable_actual' : transf_responsable_actual,
                        'mov_responsable' : mov_responsable,
                        'sede_destino' : sede_destino,
                        'dependencia_destino' : dependencia_destino,
                        'transferencia_motivo' : transferencia_motivo
                    };
                    console.log(datos);
                    $.ajax({
                        url: 'controllers/Activo.controller.php',
                        type: 'GET',
                        data: datos,
                        success: function(e){
                            mostrarAlerta("success", "¡Activo Transferido con éxito!");
                            $("#formMovimiento")[0].reset();
                            $("#mov_responsable").val(null).trigger('change');
                            $("#sede_destino").val("");
                            $("#dependencia_destino").val("");
                            div_transferencia.classList.add('asignar');
                            div_prestamo.classList.add('asignar');
                            $("#modalMovimiento").modal("hide");
                            listarActivos();
                        }
                    });
                }
            });
        }
    }

    function registrarSalidas(){
        let idproductosalida = $("#idproductosalida").val();
        let cantidadsalida = $("#cantidadsalida").val();
        let detalle = $("#detalle").val();
        
        if(idproductosalida == "" || cantidadsalida == "" || detalle == ""){
            mostrarAlerta("warning", "¡Completar los campos necesarios!");
        }else{
            Swal.fire({
                icon: 'question',
                title: '¿Está seguro de registrar?',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar'
            }).then((result) =>{
                if(result.isConfirmed){
                    var datos ={
                        'op' : 'registrarSalidas',
                        'idproducto' : idproductosalida,
                        'cantidadsalida' : cantidadsalida,
                        'detalle' : detalle
                    };
                    console.log(datos);
                    $.ajax({
                        url: 'controllers/Salidas.controller.php',
                        type: 'GET',
                        data: datos,
                        success: function(e){
                            mostrarAlerta("success", "¡Registrado con éxito!");
                            $("#formularioSalidas")[0].reset();
                            listarSalidas();
                        }
                    });
                }
            });
        }
    }

    


    function listarSalidas(){
        $.ajax({
            url: 'controllers/Salidas.controller.php',
            type: 'GET',
            data: 'op=listarSalidas',
            success: function(e){
                var tabla = $("#tablaSalidas").DataTable();
                tabla.destroy();
                $("#tablaSalidaslistar").html(e);
                $("#tablaSalidas").DataTable({
                    language: { url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json' },
                    columnDefs: [
                    {
                        visible: true,
                        searchable: true
                    }
                    ],
                    dom: 'Bfrtip',
                    buttons: ['copy', 'pdf', 'excel', 
                        {
                            extend: 'print',
                            text: "Imprimir",
                            title: "",
                            footer: true,
                            exportOptions: {
                                columns: [ 0, 1, 2, 3,4],
                                stripHtml: false, /* Aquí indicamos que no se eliminen las imágenes */
                            }
                        }
                    ]
                });
            }
        });
    }

    function listarRestock(){
        $.ajax({
            url: 'controllers/Restock.controller.php',
            type: 'GET',
            data: 'op=listarRestock',
            success: function(e){
                var tabla = $("#tablaRestock").DataTable();
                tabla.destroy();
                $("#tablaRestocklistar").html(e);
                $("#tablaRestock").DataTable({
                    language: { url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json' },
                    columnDefs: [
                    {
                        visible: true,
                        searchable: true
                    }
                    ],
                    dom: 'Bfrtip',
                    buttons: ['copy', 'pdf', 'excel', 
                        {
                            extend: 'print',
                            text: "Imprimir",
                            title: "",
                            footer: true,
                            exportOptions: {
                                columns: [ 0, 1, 2, 3,4],
                                stripHtml: false, /* Aquí indicamos que no se eliminen las imágenes */
                            }
                        }
                    ]
                });
            }
        });
    }

    // listarRestock();
    // listarSalidas();
    listarActivos();
    $("#registrar").click(activoYaExiste);
    $('#volver_').click(volverActivos);
    $("#actualizar").click(modificarActivo);
    // $("#btnRegistrarRestock").click(registrarRestock);
    // $("#btnRegistrarSalidas").click(registrarSalidas);
    cargarCategorias("#idcategoriasalida");
    cargarCategorias("#idcategoria");
    cargarCategorias("#idcategoriamodal");
    cargarCategoriasFiltro("#filtro_categoria");
    cargarCategorias("#idcategoria_editar");
    cargarAdministrativos("#select_responsable");
    cargarAdministrativos("#select_responsable_editar");
    cargarAdministrativosFiltro("#filtro_responsable");

    cargarCalidadMovFiltro("#filtro_calidad");
    
    
    $("#registrar_mov").click(validarTipoMov);
    $("#registrar_mov_dev").click(registrarMovimientoDevolucion);
    
});