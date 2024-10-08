package br.com.casejoin.casejoin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.casejoin.casejoin.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
