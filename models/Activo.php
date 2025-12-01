<?php

require_once '../core/model.master.php';

class Activo extends ModelMaster{

    public function cargarCalidadMovFiltro(){
        try{
          return parent::getRows("spu_activo_cargarCalidadMovFiltro");
        }catch(Exception $error){
          die($error->getMessage());
        }
    }

  public function registrarActivo(array $data){
      try{
        parent::execProcedure($data, "spu_activo_registro", false);
      }catch(Exception $error){
        die($error->getMessage());
      }
    }
    
  public function activoYaRegistrado(array $data){
    try{
        return parent::execProcedureLogin($data, "spu_activo_existente_cod_patrimonial", true);
    }
    catch (Exception $error){
        die($error->getMessage());
    }
  }

  public function eliminarProducto(array $data){
    try{
        parent::deleteRows($data, "spu_eliminar_producto");
    }catch(Exception $error){
        die($error->getMessage());
    }
  }
  
  public function registrarMovPrestamo(array $data){
        try{
            parent::execProcedure($data, "spu_movimientoPrestamo_registrar", false);
        }catch(Exception $error){
            die($error->getMessage());
        }
  }

  public function registrarMovTransferencia(array $data){
        try{
            parent::execProcedure($data, "spu_movimientoTransferencia_registrar", false);
        }catch(Exception $error){
            die($error->getMessage());
        }
  }

  public function registrarMovDevolucion(array $data){
        try{
            parent::execProcedure($data, "spu_movimiento_registrarDevolucion", false);
        }catch(Exception $error){
            die($error->getMessage());
        }
  }

  public function modificarActivo(array $data){
    try{
        return parent::execProcedure($data,"spu_activo_editar", true);
    }catch(Exception $error){
        die($error->getMessage());
    }
  } 

  public function cargarActivo(array $data){
      try{
          return parent::execProcedure($data, "spu_activo_cargardata", true);
      }catch(Exception $error){
          die($error->getMessage());
      }
  }

  public function getActivo(array $data){
      try{
          return parent::execProcedure($data, "spu_activo_getdata", true);
      }catch(Exception $error){
          die($error->getMessage());
      }
  }

  public function traerActivoDevolucion(array $data){
      try{
          return parent::execProcedure($data, "spu_activo_traerActivoDevolucion", true);
      }catch(Exception $error){
          die($error->getMessage());
      }
  }

  public function consultarTimeline(array $data){
      try{
          return parent::execProcedure($data, "spu_mov_consultarTimeline", true);
      }catch(Exception $error){
          die($error->getMessage());
      }
  }

  public function filtrarCategoria(array $data){
    try{
        return parent::execProcedure($data, "spu_productos_filtrar_categorias", true);
    }catch(Exception $error){
        die($error->getMessage());
    }
  }

  public function listarActivo(){
    try{
        return parent::getRows("spu_activo_listar");
    }catch(Exception $error){
        die($error->getMessage());
    }
  }

}
?>