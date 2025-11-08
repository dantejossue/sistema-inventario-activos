<?php
session_start();
date_default_timezone_set("America/Lima");
require_once '../models/Producto.php';
require_once '../models/Serverside.php';

if (isset($_GET['op'])){

  $producto = new Producto();

    if ($_GET['op'] == 'nombreproductoYaRegistrado'){
        $datosObtenidos = $producto->nombreproductoYaRegistrado(["nombreproducto" => $_GET['nombreproducto']]);
    
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

    if($_GET['op']  == 'ListarProductoFarmaciaPrueba'){              
      $clave = $producto->listarProducto();
  
      if(count($clave) != 0){
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
                <a  href='#' data-idproducto='{$valor->idproducto}' class='btn btn-sm btn-outline-danger eliminar'>
                  <i class='fas fa-trash-alt'></i>
                </a>
              </td>
            </tr>
          ";
          $i++;
        }
      }
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

    if($_GET['op'] == 'getProducto'){
      $data = $producto->getProducto(["idproducto" => $_GET['idproducto']]);
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

    if($_GET['op'] == 'cargarProducto'){
      $datosObtenidos = $producto->filtrarCategoria(['idcategoria' => $_GET['idcategoria']]);
        echo "<option value=''>Seleccione</option>";
        foreach($datosObtenidos as $valor){
            echo"
            <option value='$valor->idproducto'>$valor->nombreproducto</option>
            ";
        }
    //   echo json_encode($data);
    }

}

if(isset($_POST['op'])){
  $producto = new Producto();

  if($_POST['op'] == 'registrarProducto'){
    $nombre = "";
    if ($_FILES['fotografia']['tmp_name'] != ''){
      $nombre = date('YmdhGs') . ".jpg";
      if (move_uploaded_file($_FILES['fotografia']['tmp_name'], "../img/" . $nombre)){
        $producto->registrarProducto([
          'idcategoria' => $_POST['idcategoria'],
          'nombreproducto' => $_POST['nombreproducto'],
          'fotografia' => $nombre,
          'stock' => $_POST['stock']
        ]);
      }
    }
  }
}
?>
