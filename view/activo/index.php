<?php
require_once '../datatable.php';
require_once '../acceso-seguro.php';
if ($_SESSION['nivelacceso'] == 'Médico') {
    echo "<strong>No tiene el nivel de acceso requerido</strong>";
    exit();
}
?>

<style>
    .asignar {
        display: none !important;
    }
</style>

<div class="row">

    <div class="col-md-12">
        <div class=" card card-outline card-info">
            <div class="card-header">
                <p class="card-title" style="font-size: 22px">Lista de Activos</p>
                <a type="button" class="btn btn-sm bg-success float-right" data-toggle='modal' data-target="#modal_registrar" href="#"><i class="fas fa-plus"></i>&nbsp; Registrar</a>
            </div>
            <div class="d-flex justify-content-end m-4">
                <div class="col-md-3 p-0">
                    <select name="categoriaselect" id="categoriaselect" class="form-control">
                    </select>
                </div>
            </div>
            <div class="card-body table-responsive">

                <table class="table text-center" id="tablaActivo">
                    <thead>
                        <tr>
                            <th class="text-center">N°</th>
                            <th class="text-center">Foto</th>
                            <th class="text-center">Código Patrimonial</th>
                            <th class="text-center">Categoría</th>
                            <th class="text-center">Marca / Modelo</th>
                            <th class="text-center">Sede</th>
                            <th class="text-center">Dependencia</th>
                            <th class="text-center">Responsable</th>
                            <th class="text-center">Estado</th>
                            <th class="text-center">Acción</th>

                        </tr>
                    </thead>
                    <tbody class="table" id="datosActivo">
                        <!-- Se carga de manera dinamica -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="modalrestock" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Registrar un restock</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <fieldset class="border p-2">
                                <legend class="w-auto" style="font-size:12px">Complete los datos correctamente</legend>
                                <form action="" id="formularioRestock" class="p-4">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12 mb-3">
                                                <label for="idcategoriamodal">Categoría</label>
                                                <select class="form-control" name="idcategoria" id="idcategoriamodal">
                                                </select>
                                            </div>
                                            <div class="col-md-12 mb-3">
                                                <label for="idproductomodal">Producto</label>
                                                <select class="form-control" name="idproductomodal" id="idproductomodal">
                                                </select>
                                            </div>
                                            <div class="col-md-12 mb-3">
                                                <label for="cantidad">Cantidad</label>
                                                <input type="number" min="1" class="form-control" id="cantidad">
                                            </div>
                                            <div class="col-md-12">
                                                <label for="detallereestock">Detalle</label>
                                                <textarea class="form-control" id="detallereestock"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div class="card-footer text-right bg-white">
                                    <button type="button" class="btn bg-gradient-secondary" id="cancelarRestock">Cancelar</button>
                                    <button type="button" class="btn bg-gradient-info" id="btnRegistrarRestock">Registrar</button>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<!-- Modal Registrar -->
<div class="modal fade" id="modal_registrar" data-backdrop="static" data-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-primary" id="staticBackdropLabel" style="font-weight: bold;">Registro de Activo</h5>
                <div class="m-0 p-0">
                    <a type="button" class="text-danger" id="borrar_datos_modal">
                        <i class="fa fa-eraser"></i>
                    </a>
                    <button type="button" class="close ml-0" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="modal-body p-4">
                <form class="m-0 p-0" id="formularioActivo">
                    <div class="row">
                        <div class="col-sm-4 mb-3">
                            <label for="idcategoria">Categoría:</label>
                            <select class="form-control select2" name="idcategoria" id="idcategoria" style="width: 100%;">
                            </select>
                        </div>
                        <div class="col-sm-4 mb-3">
                            <label for="txt_marca">Marca:</label>
                            <input type="text" class="form-control" id="txt_marca" onkeypress="return sololetras(event)">
                        </div>
                        <div class="col-sm-4 mb-3">
                            <label for="txt_modelo">Modelo:</label>
                            <input type="text" class="form-control" id="txt_modelo" onkeypress="return sololetras(event)">
                        </div>
                        <div class="col-sm-3 mb-3">
                            <label for="txt_serie">Nro. Serie:</label>
                            <input type="text" class="form-control" id="txt_serie" onkeypress="return sololetras(event)">
                        </div>
                        <div class="col-sm-4 mb-3">
                            <label for="txt_patrimonial">Codigo Patrimonial:</label>
                            <input type="text" class="form-control" id="txt_patrimonial">
                        </div>
                        <div class="col-sm-5 mb-3">
                            <label for="select_responsable">Responsable Administrativo:</label>
                            <select id="select_responsable" name="select_responsable" class="form-control select2" style="width: 100%;">
                            </select>
                        </div>
                        <div class="col-sm-12 asignar m-0" id="div_sede_dependencia">
                            <div class="row">
                                <div class="col-sm-6 mb-3">
                                    <label for="select_sede">Sede: </label>
                                    <select id="select_sede" name="select_sede" class="form-control" disabled>
                                    </select>
                                </div>
                                <div class="col-sm-6 mb-3">
                                    <label for="select_dependencia">Dependencia:</label>
                                    <select id="select_dependencia" name="select_dependencia" class="form-control" disabled>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 mb-3">
                            <label for="foto">Fotografia:</label>
                            <div class="input-group">
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="foto" accept="image/*">
                                    <label class="custom-file-label" for="foto">Eliga Imagen</label>
                                </div>
                                <div class="input-group-append">
                                    <span class="input-group-text">Cargar</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 mb-3">
                            <label for="select_estado">Estado</label>
                            <select class="form-control" name="select_estado" id="select_estado">
                                <option value="" disabled selected>--Seleccione estado--</option>
                                <option value="BUENO">Bueno</option>
                                <option value="REGULAR">Regular</option>
                                <option value="MALO">Malo</option>
                            </select>
                        </div>
                        <div class="col-sm-12 mt-3">
                            <label for="txt_observacion">Observacion:</label>
                            <textarea type="text" id="txt_observacion" class="form-control" rows="3"></textarea>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer pl-4 pr-4">
                <button type="button" class="btn bg-gradient-secondary" data-dismiss="modal" id="cancelar">Cancelar</button>
                <button type="button" class="btn bg-gradient-info" id="registrar">Registrar</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal Editar -->
<div class="modal fade" id="modal_editar" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-primary" id="staticBackdropLabel" style="font-weight: bold;">Actualizar Activo</h5>
                <div class="m-0 p-0">
                    <a type="button" class="text-danger" id="borrar_datos_modal">
                        <i class="fa fa-eraser"></i>
                    </a>
                    <button type="button" class="close ml-0" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="modal-body p-4">
                <form class="m-0 p-0" id="formularioActivo">
                    <div class="row">
                        <div class="col-sm-4 mb-3">
                            <label for="idcategoria_editar">Categoría:</label>
                            <select class="form-control select2" name="idcategoria_editar" id="idcategoria_editar" style="width: 100%;">
                            </select>
                        </div>
                        <div class="col-sm-4 mb-3">
                            <label for="txt_marca_editar">Marca:</label>
                            <input type="text" class="form-control" id="txt_marca_editar" onkeypress="return sololetras(event)">
                        </div>
                        <div class="col-sm-4 mb-3">
                            <label for="txt_modelo_editar">Modelo:</label>
                            <input type="text" class="form-control" id="txt_modelo_editar" onkeypress="return sololetras(event)">
                        </div>
                        <div class="col-sm-3 mb-3">
                            <label for="txt_serie_editar">Nro. Serie:</label>
                            <input type="text" class="form-control" id="txt_serie_editar" onkeypress="return sololetras(event)">
                        </div>
                        <div class="col-sm-4 mb-3">
                            <label for="txt_patrimonial_editar">Codigo Patrimonial:</label>
                            <input type="text" class="form-control" id="txt_patrimonial_editar">
                        </div>
                        <div class="col-sm-5 mb-3">
                            <label for="select_responsable_editar">Responsable Administrativo:</label>
                            <select id="select_responsable_editar" name="select_responsable_editar" class="form-control select2" style="width: 100%;">
                            </select>
                        </div>
                        <div class="col-sm-12 asignar m-0" id="div_sede_dependencia_editar">
                            <div class="row">
                                <div class="col-sm-6 mb-3">
                                    <label for="select_sede_editar">Sede: </label>
                                    <select id="select_sede_editar" name="select_sede_editar" class="form-control" disabled>
                                    </select>
                                </div>
                                <div class="col-sm-6 mb-3">
                                    <label for="select_dependencia_editar">Dependencia:</label>
                                    <select id="select_dependencia_editar" name="select_dependencia_editar" class="form-control" disabled>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="col-6 mb-3">
                        <label for="fotografia">Fotografia:</label>
                        <input type="file" id="fotografia" class="form-control">
                    </div> -->
                        <div class="col-sm-6 mb-3">
                            <label for="foto">Fotografia:</label>
                            <div class="input-group">
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="foto_editar" accept="image/*">
                                    <label class="custom-file-label" for="foto_editar">Eliga Imagen</label>
                                </div>
                                <div class="input-group-append">
                                    <span class="input-group-text">Cargar</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 mb-3">
                            <label for="select_estado_editar">Estado</label>
                            <select class="form-control" name="select_estado_editar" id="select_estado_editar">
                                <option value="" disabled selected>--Seleccione estado--</option>
                                <option value="BUENO">Bueno</option>
                                <option value="REGULAR">Regular</option>
                                <option value="MALO">Malo</option>
                            </select>
                        </div>
                        <div class="col-sm-12 mt-3">
                            <label for="txt_observacion_editar">Observacion:</label>
                            <textarea type="text" id="txt_observacion_editar" class="form-control" rows="3"></textarea>
                        </div>
                        <input type="text" id="txt_idactivo" hidden>
                        <input id="foto_actual" name="foto_actual" hidden>
                    </div>
                </form>

            </div>
            <div class="modal-footer pl-4 pr-4">
                <button type="button" class="btn bg-gradient-secondary" data-dismiss="modal" id="cancelar_editar">Cancelar</button>
                <button type="button" class="btn bg-gradient-info" id="actualizar">Actualizar</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal Movimiento de Activo -->
<div class="modal fade" id="modalMovimiento" data-backdrop="static" data-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <form id="formMovimiento" enctype="multipart/form-data">
            <div class="modal-content">

                <div class="modal-header bg-secondary text-white">
                    <h5 class="modal-title">Registrar Movimiento del Activo</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>

                <div class="modal-body">

                    <input type="hidden" id="mov_idactivo" name="idactivo">

                    <div class="form-group">
                        <label>Tipo de movimiento:</label>
                        <select name="tipo" id="mov_idtipo" class="form-control" required>
                            <option value="" disabled selected>Seleccione...</option>
                            <option value="PRESTAMO">En calidad de Préstamo</option>
                            <option value="TRANSFERENCIA">En calidad de Transferencia</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Fecha movimiento:</label>
                        <input type="date" class="form-control" name="fecha" id="mov_fecha" required readonly>
                    </div>
                    <input id="idresponsable" hidden>

                    <!-- Prestamo -->
                    <div id="div_prestamo" class="asignar">
                        <div class="form-group">
                            <label>Responsable:</label>
                            <input type="text" class="form-control" id="pres_responsable" readonly>
                        </div>
                        <div class="form-group">
                            <label>Custodio Temporal (Administrativo):</label>
                            <select id="resp_temporal" class="form-control select2" style="width: 100%;"></select>
                        </div>
                        <div class="form-group">
                            <label>Tiempo de préstamo (días):</label>
                            <input type="number" class="form-control" id="prestamo_tiempo" min="1" required>
                        </div>
                        <div class="form-group">
                            <label>Motivo / Sustento:</label>
                            <textarea class="form-control" id="prestamo_motivo" rows="3" required></textarea>
                        </div>
                    </div>

                    <!-- Transferencia -->
                    <div id="div_transferencia" class="asignar">
                        <div class="form-group">
                            <label>Responsable Actual:</label>
                            <input type="text" class="form-control" id="transf_responsable" readonly>
                        </div>
                        <div class="form-group">
                            <label>Responsable destino:</label>
                            <select id="mov_responsable" class="form-control select2" style="width: 100%;"></select>
                        </div>

                        <div class="form-group">
                            <label>Sede destino:</label>
                            <select id="sede_destino" class="form-control" readonly></select>
                        </div>

                        <div class="form-group">
                            <label>Dependencia destino:</label>
                            <select id="dependencia_destino" class="form-control" readonly></select>
                        </div>

                        <div class="form-group">
                            <label>Motivo / Sustento:</label>
                            <textarea class="form-control" id="transferencia_motivo"  rows="3" required></textarea>
                        </div>
                    </div>

                    <!-- <div class="form-group">
                        <label>Motivo / Sustento:</label>
                        <textarea class="form-control" name="motivo" id="mov_motivo" rows="3" required></textarea>
                    </div>

                    <div class="form-group">
                        <label>Responsable destino (si aplica):</label>
                        <select class="form-control" name="responsable" id="mov_responsable">
                        </select>
                        <small class="form-text text-muted">
                            Solo si es Transferencia o si deseas asignar a otro responsable.
                        </small>
                    </div> -->

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="cancelar_mov">Cancelar</button>
                    <button type="submit" class="btn btn-primary" id="registrar_mov">Registrar Movimiento</button>
                </div>

            </div>
        </form>
    </div>
</div>



<script src="js/activos.js"></script>
<script>
    $(document).ready(function(){
        $('.select2').select2();
    });

    $(document).on("change", "#foto", function() {
        let fileName = $(this).val().split("\\").pop();
        $(this).next(".custom-file-label").html(fileName);
    });

    $(document).on("change", "#foto_editar", function() {
        let fileName = $(this).val().split("\\").pop();
        $(this).next(".custom-file-label").html(fileName);
    });

    $("#tablaActivo").on("click", ".ver", function() {
        let idactivo = $(this).data("idactivo");

        // Redirigir a la página detalle
        window.location.href = "main.php?view=activo/view_detalle.php&id=" + idactivo;
    });

   
</script>