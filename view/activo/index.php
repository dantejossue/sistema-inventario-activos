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




<!-- MODAL REGISTRAR ACTIVO -->
<!-- Button trigger modal -->

<!-- Modal Registrar -->
<div class="modal fade" id="modal_registrar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                        <div class="col-4 mb-3">
                            <label for="idcategoria">Categoría:</label>
                            <select class="form-control select2" name="idcategoria" id="idcategoria">
                            </select>
                        </div>
                        <div class="col-4 mb-3">
                            <label for="txt_marca">Marca:</label>
                            <input type="text" class="form-control" id="txt_marca" onkeypress="return sololetras(event)">
                        </div>
                        <div class="col-4 mb-3">
                            <label for="txt_modelo">Modelo:</label>
                            <input type="text" class="form-control" id="txt_modelo" onkeypress="return sololetras(event)">
                        </div>
                        <div class="col-3 mb-3">
                            <label for="txt_serie">Nro. Serie:</label>
                            <input type="text" class="form-control" id="txt_serie" onkeypress="return sololetras(event)">
                        </div>
                        <div class="col-4 mb-3">
                            <label for="txt_patrimonial">Codigo Patrimonial:</label>
                            <input type="text" class="form-control" id="txt_patrimonial">
                        </div>
                        <div class="col-5 mb-3">
                            <label for="select_responsable">Responsable Administrativo:</label>
                            <select id="select_responsable" name="select_responsable" class="form-control select2">
                            </select>
                        </div>
                        <div class="col-12 asignar p-0 m-0 d-flex" id="div_sede_dependencia">
                            <div class="col-6 mb-3">
                                <label for="select_sede">Sede: </label>
                                <select id="select_sede" name="select_sede" class="form-control" disabled>
                                </select>
                            </div>
                            <div class="col-6 mb-3">
                                <label for="select_dependencia">Dependencia:</label>
                                <select id="select_dependencia" name="select_dependencia" class="form-control" disabled>
                                </select>
                            </div>
                        </div>
                        <!-- <div class="col-6 mb-3">
                        <label for="fotografia">Fotografia:</label>
                        <input type="file" id="fotografia" class="form-control">
                    </div> -->
                        <div class="col-6 mb-3">
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
                        <div class="col-6 mb-3">
                            <label for="select_estado">Estado</label>
                            <select class="form-control" name="select_estado" id="select_estado">
                                <option value="" disabled selected>--Seleccione estado--</option>
                                <option value="BUENO">Bueno</option>
                                <option value="REGULAR">Regular</option>
                                <option value="MALO">Malo</option>
                            </select>
                        </div>
                        <div class="col-12 mt-3">
                            <label for="txt_observacion">Observacion:</label>
                            <textarea type="text" id="txt_observacion" class="form-control" rows="5"></textarea>
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

<script src="js/activos.js"></script>

<script>
    $('#modal_registrar').on('shown.bs.modal', function() {
        $('#txt_nro').trigger('focus')
    });
    $('#modal_editar').on('shown.bs.modal', function() {
        $('#txt_idpersona').trigger('focus')
    });
    
</script>