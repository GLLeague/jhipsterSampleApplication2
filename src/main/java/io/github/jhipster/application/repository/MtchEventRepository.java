package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.MtchEvent;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MtchEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MtchEventRepository extends JpaRepository<MtchEvent, Long> {

}
