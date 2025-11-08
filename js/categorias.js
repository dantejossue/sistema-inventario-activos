$(document).ready(function(){

    var txtCategoria = document.querySelector("#idcatogiramod");
    var botonActualizar = document.querySelector("#actualizar");
    var botonGuardar = document.querySelector("#registrar");

    function listarCategoria(){
        $.ajax({
            url: 'controllers/Categoria.controller.php',
            type: 'GET',
            data: 'op=ListarCategorias',
            success: function(e){
                var tabla = $("#tablaCategoria").DataTable();
                tabla.destroy();
                $("#tablaCategorialistar").html(e);
                $("#tablaCategoria").DataTable({
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

    function registrarCategoria(){
        var nombre_categoria = $("#nombre_categoria").val();
        var descripcion_categoria = $("#descripcion_categoria").val();
        var fotografia = $("#fotografia")[0].files[0];
        
        if(nombre_categoria == "" || fotografia == undefined || descripcion_categoria == ""){
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

                    formData.append('op', 'registrarCategoria');
                    formData.append('nombre_categoria', nombre_categoria);
                    formData.append('descripcion_categoria', descripcion_categoria);
                    formData.append('fotografia', fotografia);

                    $.ajax({
                        url : 'controllers/Categoria.controller.php',
                        type: 'POST',
                        data: formData,   
                        contentType: false,
                        processData: false,
                        cache: false,                     
                        success: function(result){
                            mostrarAlerta("success", "¡Registrado con éxito!");
                            $("#formularioFarmacia")[0].reset();
                            listarCategoria();
                        }
                    });
                }
            });
        }
    }



    listarCategoria();
    $("#registrar").click(registrarCategoria);
});