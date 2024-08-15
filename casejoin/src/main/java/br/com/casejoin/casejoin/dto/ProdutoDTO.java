package br.com.casejoin.casejoin.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ProdutoDTO {

    private Long id;

    private String nome;

    private Double preco;

    private Long categoriaId;
	
}
