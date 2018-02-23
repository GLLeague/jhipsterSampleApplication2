package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.MatchEvent;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MatchEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MatchEventRepository extends JpaRepository<MatchEvent, Long> {

}
