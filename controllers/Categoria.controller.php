<?php
session_start();
date_default_timezone_set("America/Lima");
require_once '../models/Categoria.php';
require_once '../models/Serverside.php';

if (isset($_GET['op'])){
  $categoria = new Categoria();
    if($_GET['op'] == 'cargarCategoria'){ 
      $datosObtenidos = $categoria->cargarCategoria();
        echo "<option value='' selected disabled>--Seleccione--</option>";
        foreach($datosObtenidos as $valor){
            echo"
            <option value='$valor->idcategoria'>$valor->categoria</option>
            ";
        }
    //   echo json_encode($data);
    }
  }

if($_GET['op']  == 'ListarCategorias'){              
  $clave = $categoria->listarCategorias();
  
  if(count($clave) != 0){
    $i = 1;
    foreach($clave as $valor){
      echo "
        <tr>
          <td class='text-center'>$i</td>
          <td class='text-center'>$valor->fecha_creacion</td>
          <td class='text-center'>$valor->categoria</td>
          <td class='text-center'>$valor->descripcion</td>
          <td class='text-center'><img style='Width:30px' src='img/$valor->imagen'/></td>
          <td class='text-center'>
            <a  href='#' data-idcategoria='{$valor->idcategoria}' class='btn btn-sm btn-outline-secondary modificar'>
              <i class='fas fa-edit'></i>
            </a>
            <a  href='#' data-idcategoria='{$valor->idcategoria}' class='btn btn-sm btn-outline-secondary eliminar'>
              <i class='fas fa-trash-alt'></i>
            </a>
          </td>
        </tr>
      ";
      $i++;
    }
  }
}
  

if(isset($_POST['op'])){
  $categoria = new Categoria();

  if($_POST['op'] == 'registrarCategoria'){
    $nombre = "";
    if ($_FILES['fotografia']['tmp_name'] != ''){
      $nombre = date('YmdhGs') . ".jpg";
      if (move_uploaded_file($_FILES['fotografia']['tmp_name'], "../img/" . $nombre)){
        $categoria->registrarCategoria([
          'categoria' => $_POST['nombre_categoria'],
          'descripcion' => $_POST['descripcion_categoria'],
          'fotografia' => $nombre,
        ]);
      }
    }
  }
}


?>
