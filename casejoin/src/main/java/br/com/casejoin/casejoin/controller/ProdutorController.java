package br.com.casejoin.casejoin.controller;

import java.util.List;

import org.hibernate.ResourceClosedException;
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

import br.com.casejoin.casejoin.dto.ProdutoDTO;
import br.com.casejoin.casejoin.model.Categoria;
import br.com.casejoin.casejoin.model.Produto;
import br.com.casejoin.casejoin.service.CategoriaService;
import br.com.casejoin.casejoin.service.ProdutoService;

@RestController
@RequestMapping("/join/produtos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProdutorController {

	@Autowired
	private ProdutoService produtoService;
	
	@Autowired
	private CategoriaService categoriaService;

	@GetMapping
	public ResponseEntity<List<Produto>> getAllProdutos() {
		return ResponseEntity.ok(produtoService.getAllProdutos());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Produto> getProdutoById(@PathVariable Long id) {
		Produto produto = produtoService.getProdutoById(id);
		if (produto != null) {
			return ResponseEntity.ok(produto);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping
	public ResponseEntity<Produto> createProduto(@RequestBody ProdutoDTO produtoDto) {
		
		Categoria categoria = categoriaService.getCategoriaById(produtoDto.getCategoriaId());
		
		Produto produto = new Produto()
				.toBuilder()
				.nome(produtoDto.getNome())
				.preco(produtoDto.getPreco())
				.categoria(categoria)
				.build();
		
		return ResponseEntity.ok(produtoService.saveProduto(produto));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Produto> updateProduto(@PathVariable Long id, @RequestBody Produto produto) {
		produto.setId(id);
		return ResponseEntity.ok(produtoService.saveProduto(produto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteProduto(@PathVariable Long id) {
		produtoService.deleteProduto(id);
		return ResponseEntity.noContent().build();
	}

}
