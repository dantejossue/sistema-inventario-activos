<?php
session_start();
date_default_timezone_set("America/Lima");
require_once '../models/Activo.php';
require_once '../models/Serverside.php';

if (isset($_GET['op'])){

  $activo = new Activo();

    if ($_GET['op'] == 'activoYaRegistrado'){
        $datosObtenidos = $activo->activoYaRegistrado(["_codpatrimonial" => $_GET['txt_patrimonial']]);
        if(count($datosObtenidos) == 0){
          echo 2;
          return true;
        }
        else{
          echo 1;
          return false;
        }
    }

    //if ($_GET['op'] == 'ListarProductoMedico'){
      //$serverSide->get('vista_listar_productos_farmacia', 'idproducto', array('idproducto', 'nombreproducto', 'principiosactivos', 'formafarmaceutica', 'descripcion', 'fechavencimiento'));
    //}

      
    //if ($_GET['op'] == 'ListarProductoFarmacia'){
      //$serverSide->get('vista_listar_productos_farmacia', 'idproducto', array('idproducto','categoria', 'nombreproducto', 'principiosactivos', 'fechavencimiento'));
    //}

    if ($_GET['op'] == 'listarActivo') {   
      $rows = $activo->listarActivo();
      if (!empty($rows)) {
        $i = 1;
        foreach ($rows as $r) {

          $rowStyle = "";
          if ($r->ultimo_movimiento == "PRESTAMO") {
              $rowStyle = "style='background:#e8f4ff'"; // celeste suave
          } 
          elseif ($r->ultimo_movimiento == "TRANSFERENCIA") {
              $rowStyle = "style='background:#fff7e6'"; // amarillo suave
          }

          switch ($r->estado) {
            case 'BUENO':
              $badge = "<span class='badge bg-success'>BUENO</span>";
              break;
            case 'REGULAR':
              $badge = "<span class='badge bg-warning text-dark'>REGULAR</span>";
              break;
            case 'MALO':
              $badge = "<span class='badge bg-danger'>MALO</span>";
              break;
            default:
              $badge = "<span class='badge bg-secondary'>DESCONOCIDO</span>";
              break;
          }

          echo "
            <tr $rowStyle>
              <td class='text-center'>{$i}</td>
              <td class='text-center'><img style='width:30px' src='img/$r->foto'/></td>
              <td class='text-center'>{$r->cod_patrimonial}</td>
              <td class='text-center'>{$r->nombre_categoria}</td>
              <td class='text-center'>{$r->marca_modelo}</td>
              <td class='text-center'>{$r->nombre_sede}</td>
              <td class='text-center'>{$r->nombre_dependencia}</td>
              <td class='text-center'>{$r->npersona}</td>
              <td class='text-center'>{$badge}</td>

              <td class='text-center'>
                <div class='btn-group'>
                  <button type='button' class='btn btn-sm btn-outline-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    <i class='fa fa-cog'></i> Acciones
                  </button>
                  <div class='dropdown-menu dropdown-menu-right'>
                    <a class='dropdown-item ver' href='#' data-idactivo='{$r->id_activo}'>
                      <i class='fa fa-eye text-info'></i>&nbsp; Ver detalles
                    </a>
                    <a class='dropdown-item modificar' href='#' data-idactivo='{$r->id_activo}'>
                      <i class='fa fa-edit text-warning'></i>&nbsp; Editar
                    </a>
                    <a class='dropdown-item mover' href='#' data-idactivo='{$r->id_activo}'>
                      <i class='fa fa-exchange-alt text-secondary'></i>&nbsp; Mover
                    </a>
                    <a class='dropdown-item qr' href='#' data-idactivo='{$r->id_activo}'>
                      <i class='fa fa-qrcode text-success'></i>&nbsp; Ver QR
                    </a>
                    <div class='dropdown-divider'></div>
                    <a class='dropdown-item text-danger eliminar' href='#' data-idactivo='{$r->id_activo}'>
                      <i class='fa fa-trash'></i>&nbsp; Eliminar
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          ";
          $i++;
        }
      }
      exit;
    }


    if($_GET['op']== 'eliminarProducto'){
      $producto->eliminarProducto(["idproducto" => $_GET["idproducto"]]);
    }

    if($_GET['op'] == 'modificarProducto'){
      $producto->modificarProducto([
        "idproducto" => $_GET['idproducto'],
        "nombreproducto" => $_GET['nombreproducto']
      ]);
    }

    // if($_GET['op'] == 'getProducto'){
    //   $data = $producto->getProducto(["idproducto" => $_GET['idproducto']]);
    //   echo json_encode($data);
    // }
    
    if($_GET['op'] == 'cargarActivo'){
      $data = $activo->cargarActivo(["_idactivo" => $_GET['idactivo']]);
      echo json_encode($data);
    }

    if($_GET['op'] == 'filtrarCategorias'){
      $clave = $producto->filtrarCategoria(['idcategoria' => $_GET['idcategoria']]);
      $i = 1;
      foreach($clave as $valor){
        $color="";
        $color2="";

        if($valor->stock<=5){
          $color="red";$color2="white";
        }else{ 
          $color="green";$color2="white";
        }
        echo "
          <tr>
            <td class='text-center'>$i</td>
            <td class='text-center'>$valor->categoria</td>
            <td class='text-center'>$valor->nombreproducto</td>
            <td class='text-center'><span style='background-color:$color;color:$color2'>$valor->stock</span></td>
            <td class='text-center'><img style='Width:30px' src='img/$valor->fotografia'/></td>
            <td class='text-center'>
              <a  href='#' data-idproducto='{$valor->idproducto}' class='btn btn-sm btn-outline-secondary modificar'>
                <i class='fas fa-edit'></i>
              </a>
              <a  href='#' data-idproducto='{$valor->idproducto}' class='btn btn-sm btn-outline-secondary eliminar'>
                <i class='fas fa-trash-alt'></i>
              </a>
            </td>
          </tr>
        ";
        $i++;
      }
    }

    // if($_GET['op'] == 'cargarProducto'){
    //   $datosObtenidos = $producto->filtrarCategoria(['idcategoria' => $_GET['idcategoria']]);
    //     echo "<option value=''>Seleccione</option>";
    //     foreach($datosObtenidos as $valor){
    //         echo"
    //         <option value='$valor->idproducto'>$valor->nombreproducto</option>
    //         ";
    //     }
    // //   echo json_encode($data);
    // }

    if($_GET['op'] == 'getActivo'){
      $data = $activo->getActivo(['_idactivo' => $_GET['idactivo']]);
      echo json_encode($data);
    }

    if ($_GET['op'] == 'consultarTimeline') {

        $data = $activo->consultarTimeline([
            "_idactivo" => $_GET["idactivo"]
        ]);

        echo json_encode($data);
        exit;
    }

    if ($_GET['op'] == 'registrarMovPrestamo'){

        $activo->registrarMovPrestamo([
            "_idactivo"         => $_GET["idactivo"],
            "_tipo"             => $_GET["mov_idtipo"],

            // Responsable actual (quien tiene el activo)
            "_responsable_actual" => $_GET["pres_responsable"],

            // Custodio temporal
            "_custodio_temporal" => $_GET["resp_temporal"],

            // Tiempo de préstamo
            "_tiempo"            => $_GET["prestamo_tiempo"],

            // Motivo
            "_motivo"            => $_GET["prestamo_motivo"]
        ]);
    }

    if ($_GET['op'] == 'registrarMovTransferencia'){

        $activo->registrarMovTransferencia([
            "_idactivo"         => $_GET["idactivo"],
            "_tipo"             => $_GET["mov_idtipo"],

            // Responsable actual (quien tiene el activo)
            "_transf_responsable_actual" => $_GET["transf_responsable_actual"],

            // responsable destino
            "_mov_responsable" => $_GET["mov_responsable"],

            // sede destino
            "_sede_destino"            => $_GET["sede_destino"],

            // Motivo
            "_transferencia_motivo"            => $_GET["transferencia_motivo"],

            // dependencia_destino
            "_dependencia_destino"            => $_GET["dependencia_destino"]

        ]);
    }

}

if(isset($_POST['op'])){
  $activo = new Activo();

    if ($_POST['op'] == 'registrarActivo') {

      $nombre = "";
      if (!empty($_FILES['foto']['tmp_name'])) {
        $nombre = date('YmdhGs') . ".jpg";
        if (move_uploaded_file($_FILES['foto']['tmp_name'], "../img/" . $nombre)) {
          $activo->registrarActivo([
            "_idcategoria"       => $_POST["idcategoria"],
            "_txt_marca"         => $_POST["txt_marca"],
            "_txt_modelo"        => $_POST["txt_modelo"],
            "_txt_serie"         => $_POST["txt_serie"],
            "_txt_patrimonial"   => $_POST["txt_patrimonial"],
            "_select_responsable"=> $_POST["select_responsable"],
            "_select_sede"       => $_POST["select_sede"],
            "_select_dependencia"=> $_POST["select_dependencia"],
            "_foto"              => $nombre,
            "_select_estado"     => $_POST["select_estado"],
            "_observacion"       => $_POST["observacion"]
          ]);
        }
      }
    }

    if ($_POST['op'] == 'modificarActivo') {

        $idactivo        = $_POST["idactivo"];
        $idcategoria     = $_POST["idcategoria"];
        $marca           = $_POST["marca"];
        $modelo          = $_POST["modelo"];
        $serie           = $_POST["serie"];
        $codPatrimonial  = $_POST["codPatrimonial"];
        $idadministrativo = $_POST["idadministrativo"];
        $idsede          = $_POST["idsede"];
        $iddependencia   = $_POST["iddependencia"];
        $estado          = $_POST["estado"];
        $observacion     = $_POST["observacion"];
        $fotoActual      = $_POST["foto_actual"];

        $nombreFoto = $fotoActual; // por defecto mantiene la misma foto

        if (!empty($_FILES["foto"]["tmp_name"])) {
            $nombreFoto = date('YmdHis') . ".jpg";
            if (!move_uploaded_file($_FILES["foto"]["tmp_name"], "../img/" . $nombreFoto)) {
                echo json_encode(["resultado" => 0, "mensaje" => "Error al guardar imagen"]);
                exit;
            }
            if ($fotoActual != "" && file_exists("../img/" . $fotoActual)) {
                unlink("../img/" . $fotoActual); // elimina foto anterior
            }
        }

        $resultado = $activo->modificarActivo([
            "_idactivo"          => $idactivo,
            "_idcategoria"       => $idcategoria,
            "_txt_marca"         => $marca,
            "_txt_modelo"        => $modelo,
            "_txt_serie"         => $serie,
            "_txt_patrimonial"   => $codPatrimonial,
            "_select_responsable"=> $idadministrativo,
            "_select_sede"       => $idsede,
            "_select_dependencia"=> $iddependencia,
            "_foto"              => $nombreFoto,
            "_select_estado"     => $estado,
            "_observacion"       => $observacion
        ]);

        echo json_encode($resultado[0]);
    }

}
?>
