package br.com.casejoin.casejoin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.casejoin.casejoin.dto.CategoriaDTO;
import br.com.casejoin.casejoin.model.Categoria;
import br.com.casejoin.casejoin.service.CategoriaService;

@RestController
@RequestMapping("/join/categorias")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriaController {

	@Autowired
    private CategoriaService categoriaService;

	  @GetMapping
	  public ResponseEntity<List<Categoria>> getAllCategorias() {
	      return ResponseEntity.ok(categoriaService.getAllCategorias());
	  }
		

//	@GetMapping
//	public Page<PagamentoDTO> listar(@PageableDefault(size = 10) Pageable paginacao) {
//	        return service.obterTodos(paginacao);
//	}
    
    
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> getCategoriaById(@PathVariable Long id) {
        Categoria categoria = categoriaService.getCategoriaById(id);
        if (categoria != null) {
            return ResponseEntity.ok(categoria);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Categoria> createCategoria(@RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.saveCategoria(categoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> updateCategoria(@PathVariable Long id, @RequestBody CategoriaDTO categoriadto) {
    	
    	Categoria categoria = categoriaService.getCategoriaById(id);
    	
    	categoria.setNome(categoriadto.getNome());
        return ResponseEntity.ok(categoriaService.saveCategoria(categoria));
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
        categoriaService.deleteCategoria(id);
        return ResponseEntity.noContent().build();
    }
}
