$(document).ready(function(){

    idproducto = "";
    var txtProducto = document.querySelector("#idproductomod");
    var botonActualizar = document.querySelector("#actualizar");
    var botonGuardar = document.querySelector("#registrar");


    function registrarProducto(){
        var idcategoria = $("#idcategoria").val();
        var txt_marca = $("#txt_marca").val();
        var txt_modelo = $("#txt_modelo").val();
        var txt_serie = $("#txt_serie").val();
        var txt_patrimonial = $("#txt_patrimonial").val();
        var txt_propietario = $("#txt_propietario").val();
        var txt_sede = $("#txt_sede").val();
        var txt_dependencia = $("#txt_dependencia").val();

        // var nombreproducto = $("#nombreproducto").val();
        var fotografia = $("#fotografia")[0].files[0];
        var txt_estado = $("#txt_estado").val();
        var observacion = $("#observacion").val();
        
        if(idcategoria == "" || txt_marca == "" || txt_modelo == "" || txt_serie == "" || txt_patrimonial == "" || txt_propietario == "" || txt_sede == "" || txt_dependencia == "" || fotografia == undefined || txt_estado == "" || observacion == ""){
            mostrarAlerta("warning", "¡Completar los campos necesarios!");
        }else{
            Swal.fire({
                icon:'question',
                title:'¿Está seguro de registrar?',
                showCancelButton: true,
                cancelButtonText:'Cancelar',
                confirmButtonText:'Aceptar'
            }).then((result) => {
                
                if(result.isConfirmed){
                    var formData = new FormData();

                    formData.append('op', 'registrarProducto');
                    formData.append('idcategoria', idcategoria);
                    formData.append('nombreproducto', nombreproducto);
                    formData.append('fotografia', fotografia);
                    formData.append('stock', stock);

                    $.ajax({
                        url : 'controllers/Producto.controller.php',
                        type: 'POST',
                        data: formData,   
                        contentType: false,
                        processData: false,
                        cache: false,                     
                        success: function(result){
                            mostrarAlerta("success", "¡Registrado con éxito!");
                            $("#formularioFarmacia")[0].reset();
                            listarProductosFarmaciaPrueba();
                        }
                    });
                }
            });
        }
    }

    function nombreproductoYaExiste(){
        // let nombreproductoYaExiste = $("#nombreproducto").val();
        // var nombreproductoYaExiste = $("#nombreproducto").val();

        let activo_existente = $("#txt_serie").val(); 

        if(nombreproductoYaExiste == ""){
            mostrarAlerta("warning", "¡Completar los campos necesarios!");
        }else{
            var datos = {
                'op' : 'nombreproductoYaRegistrado',
                'nombreproducto' : nombreproductoYaExiste
            };
            $.ajax({
                type: "GET",
                url:  "controllers/Producto.controller.php",
                data: datos,
                success: function(e){
                    if(e == 1){
                        mostrarAlerta("error", "¡Ya existe este producto!");
                    }
                    else if(e == 2){
                        registrarProducto();
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

    function listarProductosFarmaciaPrueba(){
        $.ajax({
            url: 'controllers/Producto.controller.php',
            type: 'GET',
            data: 'op=ListarProductoFarmaciaPrueba',
            success: function(e){
                var tabla = $("#tablaProducto").DataTable();
                tabla.destroy();
                $("#tablaProductolistar").html(e);
                $("#tablaProducto").DataTable({
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

    $("#tablaProducto").on('click', ".modificar", function(){
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
    
    $("#cancelarRestock").click(function(){
        $("#formularioRestock")[0].reset();
    });

    $("#cancelarSalidas").click(function(){
        $("#formularioSalidas")[0].reset();
    });
    
    $("#cancelar").click(function(){
        $("#formularioFarmacia")[0].reset();
        $("#Aviso").html("Registrar Producto");
        txtProducto.classList.add('asignar');
        botonActualizar.classList.add('asignar');
        botonGuardar.classList.remove('asignar');
        $("#idcategoria").prop('disabled', false);
        $("#stock").prop('disabled', false);
        $("#fotografia").prop('disabled', false);
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

    listarRestock();
    listarSalidas();
    listarProductosFarmaciaPrueba();
    $("#registrar").click(nombreproductoYaExiste);
    $("#actualizar").click(modificarProducto);
    $("#btnRegistrarRestock").click(registrarRestock);
    $("#btnRegistrarSalidas").click(registrarSalidas);
    cargarCategorias("#idcategoriasalida");
    cargarCategorias("#idcategoria");
    cargarCategorias("#idcategoriamodal");
    cargarCategorias("#categoriaselect");
});