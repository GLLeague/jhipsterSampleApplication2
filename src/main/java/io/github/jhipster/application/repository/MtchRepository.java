package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Mtch;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Mtch entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MtchRepository extends JpaRepository<Mtch, Long> {

}
