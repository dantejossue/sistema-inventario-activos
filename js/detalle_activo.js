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

    function cargarMovimientosActivos(id_activo) {
        $.ajax({
            url: "controllers/Activo.controller.php",
            type: "GET",
            data: { 
            op: "consultarTimeline",
            idactivo: id_activo 
            },
            dataType: "JSON",
            success: function (data) {

            let html = "";

            if (data.length === 0) {
                html = `<p class="text-muted text-center">No hay movimientos registrados.</p>`;
            } else {
                data.forEach(mov => {

                    switch(mov.tipo_mov){
                        
                        case "PRESTAMO":
                            html += `
                                <div class="time-label">
                                <span class="bg-danger">${mov.fecha}</span>
                                </div>
            
                                <div>
                                <i class="fas fa-exchange-alt bg-primary"></i>
                                <div class="timeline-item">
                                    <span class="time" style="font-size:15px"><b><i class="fas fa-clock"></i> ${mov.hora}</b></span>
            
                                    <h3 class="timeline-header"><b>En calidad de: <span class="bg-suave-azul">${mov.tipo_mov}</span></b></h3>
            
                                    <div class="timeline-body">
                                    <span class="">De: <b>${mov.responsable_origen ?? "—"}</b></span><br>
                                    A: <b>${mov.responsable_destino ?? "—"}</b><br>
                                    Sede destino: <b>${mov.sede ?? "—"}</b><br>
                                    Área destino: <b>${mov.dependencia ?? "—"}</b>
                                    </div>
                                </div>
                                </div>
                            `;
                        break

                        case "TRANSFERENCIA":
                            html += `
                                <div class="time-label">
                                <span class="bg-danger">${mov.fecha}</span>
                                </div>
            
                                <div>
                                <i class="fas fa-exchange-alt bg-primary"></i>
                                <div class="timeline-item">
                                    <span class="time" style="font-size:15px"><b><i class="fas fa-clock"></i> ${mov.hora}</b></span>
            
                                    <h3 class="timeline-header"><b>En calidad de: <span class="bg-suave-ambar">${mov.tipo_mov}</span></b></h3>
            
                                    <div class="timeline-body">
                                    <span class="">De: <b>${mov.responsable_origen ?? "—"}</b></span><br>
                                    A: <b>${mov.responsable_destino ?? "—"}</b><br>
                                    Sede destino: <b>${mov.sede ?? "—"}</b><br>
                                    Área destino: <b>${mov.dependencia ?? "—"}</b>
                                    </div>
                                </div>
                                </div>
                            `;
                        break
                            
                    }
                        
                });
            }

            $("#timeline_movimientos").html(html);
            }
        });
    }

    cargarMovimientosActivos(idactivo);
});