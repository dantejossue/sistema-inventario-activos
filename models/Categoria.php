<?php

require_once '../core/model.master.php';

class Categoria extends ModelMaster{

    public function cargarCategoria(){
        try{
          return parent::getRows("spu_categorias_cargar");
        }catch(Exception $error){
          die($error->getMessage());
        }
    }
    
    public function registrarCategoria(array $data){
        try{
          parent::execProcedure($data, "spu_categorias_registro", false);
        }catch(Exception $error){
          die($error->getMessage());
        }
      }
      
    public function nombrecategoriasYaRegistrado(array $data){
      try{
          return parent::execProcedureLogin($data, "spu_nombrecategorias_registrado", true);
      }
      catch (Exception $error){
          die($error->getMessage());
      }
    }
    
    public function eliminarcategorias(array $data){
      try{
          parent::deleteRows($data, "spu_eliminar_categorias");
      }catch(Exception $error){
          die($error->getMessage());
      }
    }
    
    public function modificarcategorias(array $data){
      try{
          parent::execProcedure($data, "spu_categoriass_modificar", false);
      }catch(Exception $error){
          die($error->getMessage());
      }
    } 
    
    public function getcategorias(array $data){
        try{
            return parent::execProcedure($data, "spu_categoriass_getdata", true);
        }catch(Exception $error){
            die($error->getMessage());
        }
    }
    
    public function filtrarCategoria(array $data){
      try{
          return parent::execProcedure($data, "spu_categoriass_filtrar_categorias", true);
      }catch(Exception $error){
          die($error->getMessage());
      }
    }
    
    public function listarCategorias(){
      try{
          return parent::getRows("spu_categorias_listar");
      }catch(Exception $error){
          die($error->getMessage());
      }
    }

}




?>
