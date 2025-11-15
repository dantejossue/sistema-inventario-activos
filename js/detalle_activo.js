$(document).ready(function(){    
    const urlParams = new URLSearchParams(window.location.search);
    const idactivo = urlParams.get('id');

    $.ajax({
        url: 'controllers/Activo.controller.php',
        type: 'GET',
        data: { op: 'cargarActivo', idactivo: idactivo },
        dataType: 'json',
        success: function(data){

            $("#foto_activo").attr("src", "img/" + data[0].foto);
            
            $("#nombre_activo").text(data[0].marca_modelo);
            $("#categoria_activo").text(data[0].nombre_categoria);
            
            $("#codigo_activo").text(data[0].cod_patrimonial);
            $("#numeroserie").text(data[0].serie);
            $("#estado_activo").text(data[0].estado);
            $("#sede_activo").text(data[0].nombre_sede);
            $("#dependencia_activo").text(data[0].nombre_dependencia);
            $("#responsable_activo").text(data[0].npersona);
            $("#fecha_activo").text(data[0].fecha_registro);

            $("#descripcion_activo").text(data[0].observacion);
        }
    });


});