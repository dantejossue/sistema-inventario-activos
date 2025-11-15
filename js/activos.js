$(document).ready(function(){

    idactivo = "";
    var div_sede_dependencia = document.querySelector("#div_sede_dependencia");
    var txtProducto = document.querySelector("#idproductomod");
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
    var observacion = $("#observacion").val();

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
                    type: "POST",              // ✅ DEBE SER POST
                    data: formData,            // ✅ Usar FormData
                    contentType: false,        // ✅ Obligatorio
                    processData: false,        // ✅ Obligatorio
                    success: function (e) {
                        mostrarAlerta("success", "¡Registrado con éxito!");
                        $("#formularioActivo")[0].reset();
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

    // Cargar los nombres de las dependencias
    function cargarDependencias(select){ 
        var datos ={
            'op': 'cargarDependencias'
        };
        $.ajax({
            url : 'controllers/Dependencia.controller.php',
            type: 'GET',
            data: datos,
            success:function(e){
                $(select).html(e);
            }
        });
    }
    
    // Cargar los nombres de las dependencias
    function cargarSede(select){ 
        var datos ={
            'op': 'cargarSede'
        };
        $.ajax({
            url : 'controllers/Sede.controller.php',
            type: 'GET',
            data: datos,
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
        let idproducto = $(this).attr('data-idproducto');

        var datos = {
            'op' : 'getProducto',
            'idproducto' : idproducto
        };
        console.log(datos);
        $.ajax({
            url: 'controllers/Producto.controller.php',
            type: 'GET',
            data: datos,
            success: function(result){                        
                if ($.trim(result) != ""){
                    //Asignamos y quitamos la clase que muestra la caja de texto
                    $("#Aviso").html("Actualizar Producto");
                    txtProducto.classList.remove('asignar');
                    botonActualizar.classList.remove('asignar');
                    botonGuardar.classList.add('asignar');
                    $("#idcategoria").prop('disabled', true);
                    $("#stock").prop('disabled', true);
                    $("#fotografia").prop('disabled', true);

                    // $("#descripcion").prop('disabled', true);
                    

                    var resultado = JSON.parse(result);
                    // console.log(resultado);
                    
                    $("#idcategoria").val(resultado[0].idcategoria);
                    $("#stock").val(resultado[0].stock);
                    $("#nombreproducto").val(resultado[0].nombreproducto);
                    // tinymce.get("nombreproducto").setContent(resultado[0].nombreproducto);
                    txtProducto.setAttribute("data-idproducto", resultado[0].idproducto);
                    // $("#fechavencimiento").val(resultado[0].fechavencimiento);
                    $("#idproductomod").hide();
                }else{
                    mostrarAlerta("warning", "¡No encontramos registros!");
                }
            }
        });
    });

    // $("#tablaActivo").on("click", ".ver", function(){
    //     let idactivo = $(this).attr('data-idactivo');

    //     var datos = {
    //         'op' : 'cargarActivo',
    //         'idactivo' : idactivo
    //     };

    //     console.log(datos);
    //     $.ajax({
    //         url: 'controllers/Activo.controller.php',
    //         type: 'GET',
    //         data: datos,
    //         success: function(result){                        
    //             if ($.trim(result) != ""){
    //                 window.location.href = "main.php?view=activo/view_detalle.php&id=" + idactivo;
                    
    //                 var resultado = JSON.parse(result);
    //                 // console.log(resultado);
                    
    //                 $("#idcategoria").val(resultado[0].idcategoria);
    //                 $('$foto_activo').attr('src',resultado[0].foto);
    //                 $("#nombre_activo").html(resultado[0].nombre_categoria);
    //                 // tinymce.get("nombreproducto").setContent(resultado[0].nombreproducto);
    //                 txtProducto.setAttribute("data-idproducto", resultado[0].idproducto);
    //                 // $("#fechavencimiento").val(resultado[0].fechavencimiento);
    //                 $("#idproductomod").hide();

    //             }else{
    //                 mostrarAlerta("warning", "¡No encontramos registros!");
    //             }
    //         }
    //     });
    // }); 

    function volverActivos(){
        window.location.href = "main.php?view=activo";
    }

    $("#cancelarRestock").click(function(){
        $("#formularioRestock")[0].reset();
    });

    $("#cancelarSalidas").click(function(){
        $("#formularioSalidas")[0].reset();
    });
    
    $("#cancelar").click(function(){
        $("#formularioActivo")[0].reset();
        div_sede_dependencia.classList.add('asignar');
        botonActualizar.classList.add('asignar');
        botonGuardar.classList.remove('asignar');
        // $("#idcategoria").prop('disabled', false);
        // $("#stock").prop('disabled', false);
        // $("#fotografia").prop('disabled', false);
    });

    $("#borrar_datos_modal").click(function(){
        $("#formularioActivo")[0].reset();
        div_sede_dependencia.classList.add('asignar');
    });

    function modificarProducto(){
        let idproducto = $("#idproductomod").attr('data-idproducto');
        var nombreproducto = $("#nombreproducto").val();


        if(nombreproducto == ""){
            mostrarAlerta("warning", "¡Completar los campos necesarios!");
        }else{
            Swal.fire({
                icon:'question',
                title:'¿Está seguro de modificar?',
                showCancelButton: true,
                cancelButtonText:'Cancelar',
                confirmButtonText:'Aceptar'
            }).then((result) =>{
                if(result.isConfirmed){
                    var datos = {
                        'op'                     : 'modificarProducto',
                        'idproducto'             : idproducto,
                        'nombreproducto'         : nombreproducto
                    };
                    console.log(datos);
                    $.ajax({
                        url: 'controllers/Producto.controller.php',
                        type:'GET',
                        data: datos,
                        success:function(e){
                            console.log(e);
                            mostrarAlerta("success", "¡Modificado con éxito!");

                            $("#formularioFarmacia")[0].reset();
                            $("#Aviso").html("Registrar Producto");
                            txtProducto.classList.add('asignar');
                            botonActualizar.classList.add('asignar');
                            botonGuardar.classList.remove('asignar');
                            $("#idcategoria").prop('disabled', false);
                            $("#fotografia").prop('disabled', false);
                            $("#stock").prop('disabled', false);

                            listarProductosFarmaciaPrueba();
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

    function registrarRestock(){
        let idproductomodal = $("#idproductomodal").val();
        let cantidad = $("#cantidad").val();
        let detallereestock = $("#detallereestock").val();
        
        if(idproductomodal == "" || cantidad == "" || detallereestock == ""){
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
                        'op' : 'registrarRestock',
                        'idproducto' : idproductomodal,
                        'cantidad' : cantidad,
                        'detallereestock' : detallereestock
                    };
                    console.log(datos);
                    $.ajax({
                        url: 'controllers/Restock.controller.php',
                        type: 'GET',
                        data: datos,
                        success: function(e){
                            mostrarAlerta("success", "¡Registrado con éxito!");
                            $("#formularioRestock")[0].reset();
                            listarProductosFarmaciaPrueba();
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
    // $("#actualizar").click(modificarProducto);
    // $("#btnRegistrarRestock").click(registrarRestock);
    // $("#btnRegistrarSalidas").click(registrarSalidas);
    cargarCategorias("#idcategoriasalida");
    cargarCategorias("#idcategoria");
    cargarCategorias("#idcategoriamodal");
    cargarCategorias("#categoriaselect");
    cargarAdministrativos("#select_responsable");

    // cargarSede("#select_sede");
    // cargarDependencias("#select_dependencia");
});