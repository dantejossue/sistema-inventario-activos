<?php
require_once '../datatable.php';
require_once '../acceso-seguro.php';
if ($_SESSION['nivelacceso'] == 'Médico') {
  echo "<strong>No tiene el nivel de acceso requerido</strong>";
  exit();
}
?>

<style>
  /* ------------------------------
     ESTILO MODERNO DEL CONTENEDOR
     ------------------------------ */
  .foto-card {
    padding: 0;
    /* border: 1px solid #dcdcdc;
    border-radius: 10px; */
    overflow: hidden;
    /* background: white;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15); */
    position: relative;
    transition: transform 0.3s ease;
  }

  /* ------------------------------
     ICONO PARA AMPLIAR IMAGEN
     ------------------------------ */
  .zoom-icon {
    position: absolute;
    right: 10px;
    bottom: 10px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 6px 8px;
    border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    opacity: 0;
    transition: 0.3s;
  }

  .foto-card:hover .zoom-icon {
    opacity: 1;
  }

  /* ------------------------------------
     IMAGEN DEL ACTIVO (ALTURA FIJA)
     ------------------------------------ */
  #foto_activo {
    width: 100%;
    height: 500px;
    object-fit: contain;
    background: #f5f5f5;
    transition: transform 0.3s ease;
    cursor: pointer;
  }

  /* Zoom suave al pasar el mouse */
  .foto-card:hover #foto_activo {
    transform: scale(1.05);
  }


  /* ------------------------------
     MODAL FULLSCREEN PERSONALIZADO
     ------------------------------ */
  .modal-img-full {
    display: none;
    position: fixed;
    z-index: 99999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  .modal-img-full img {
    max-width: 95%;
    max-height: 95%;
    border-radius: 10px;
    box-shadow: 0px 5px 20px rgba(255, 255, 255, 0.3);
  }

  .modal-img-full .close-modal {
    position: absolute;
    top: 20px;
    right: 30px;
    color: white;
    font-size: 40px;
    cursor: pointer;
    font-weight: bold;
  }
</style>

<!-- MODAL FULLSCREEN -->
<div id="modalFullscreen" class="modal-img-full">
  <span class="close-modal">&times;</span>
  <img id="modalImg">
</div>

<!-- Content Header (Page header) -->
<section class="content-header">
  <div class="row">
    <div class="col-sm-6">
      <h3 style="font-size: 22px"><b>Detalle del Activo</b></h3>
    </div>
    <div class="col-sm-6">
      <ol class="breadcrumb float-sm-right">
        <!-- <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item active">Activo</li> -->
        <a href="main.php?view=activo/index.php" class="btn btn-secondary btn-sm">
          <i class="fas fa-arrow-left"></i> Regresar
        </a>
      </ol>
    </div>
  </div>
</section>

<div class="row">
  <div class="col-md-12">

    <div class="card card-primary">
      <div class="card-body">

        <div class="row">

          <!-- FOTO DEL ACTIVO -->
          <div class="col-md-4">
            <div class="foto-card">
              <img id="foto_activo" class="card-img-top" src="img/default.png" alt="Foto del activo">
              <!-- Ícono ampliación -->
              <div class="zoom-icon">
                <i class="fas fa-search-plus"></i>
              </div>
            </div>
          </div>

          <!-- DETALLES DEL ACTIVO -->
          <div class="col-md-8">

            <h3 id="nombre_activo" class="text-primary"></h3>
            <p id="categoria_activo" class="text-muted mb-3"></p>

            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th style="width: 200px;">Código Patrimonial:</th>
                  <td id="codigo_activo"></td>
                </tr>
                <tr>
                  <th style="width: 200px;">Nro Serie:</th>
                  <td id="numeroserie"></td>
                </tr>
                <tr>
                  <th>Estado:</th>
                  <td id="estado_activo"></td>
                </tr>
                <tr>
                  <th>Ubicación / Sede:</th>
                  <td id="sede_activo"></td>
                </tr>
                <tr>
                  <th>Área / Dependencia:</th>
                  <td id="dependencia_activo"></td>
                </tr>
                <tr>
                  <th>Responsable:</th>
                  <td id="responsable_activo"></td>
                </tr>
                <tr>
                  <th>Fecha de Registro:</th>
                  <td id="fecha_activo"></td>
                </tr>
              </tbody>
            </table>

            <h5 class="mt-4">Descripción:</h5>
            <p id="descripcion_activo"></p>

          </div>
        </div>
      </div>
      <!-- /.card-body -->
    </div>
    <!-- /.card -->
  </div>
</div>


<script src="js/detalle_activo.js"></script>

<!-- SCRIPT FULLSCREEN -->
<script>
  const img = document.getElementById("foto_activo");
  const modal = document.getElementById("modalFullscreen");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.querySelector(".close-modal");

  img.onclick = function() {
    modal.style.display = "flex";
    modalImg.src = this.src;
  }

  closeModal.onclick = function() {
    modal.style.display = "none";
  }

  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = "none";
  }
</script>