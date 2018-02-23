package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.MatchEvent;

import io.github.jhipster.application.repository.MatchEventRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MatchEvent.
 */
@RestController
@RequestMapping("/api")
public class MatchEventResource {

    private final Logger log = LoggerFactory.getLogger(MatchEventResource.class);

    private static final String ENTITY_NAME = "matchEvent";

    private final MatchEventRepository matchEventRepository;

    public MatchEventResource(MatchEventRepository matchEventRepository) {
        this.matchEventRepository = matchEventRepository;
    }

    /**
     * POST  /match-events : Create a new matchEvent.
     *
     * @param matchEvent the matchEvent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new matchEvent, or with status 400 (Bad Request) if the matchEvent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/match-events")
    @Timed
    public ResponseEntity<MatchEvent> createMatchEvent(@RequestBody MatchEvent matchEvent) throws URISyntaxException {
        log.debug("REST request to save MatchEvent : {}", matchEvent);
        if (matchEvent.getId() != null) {
            throw new BadRequestAlertException("A new matchEvent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MatchEvent result = matchEventRepository.save(matchEvent);
        return ResponseEntity.created(new URI("/api/match-events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /match-events : Updates an existing matchEvent.
     *
     * @param matchEvent the matchEvent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated matchEvent,
     * or with status 400 (Bad Request) if the matchEvent is not valid,
     * or with status 500 (Internal Server Error) if the matchEvent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/match-events")
    @Timed
    public ResponseEntity<MatchEvent> updateMatchEvent(@RequestBody MatchEvent matchEvent) throws URISyntaxException {
        log.debug("REST request to update MatchEvent : {}", matchEvent);
        if (matchEvent.getId() == null) {
            return createMatchEvent(matchEvent);
        }
        MatchEvent result = matchEventRepository.save(matchEvent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, matchEvent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /match-events : get all the matchEvents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of matchEvents in body
     */
    @GetMapping("/match-events")
    @Timed
    public List<MatchEvent> getAllMatchEvents() {
        log.debug("REST request to get all MatchEvents");
        return matchEventRepository.findAll();
        }

    /**
     * GET  /match-events/:id : get the "id" matchEvent.
     *
     * @param id the id of the matchEvent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the matchEvent, or with status 404 (Not Found)
     */
    @GetMapping("/match-events/{id}")
    @Timed
    public ResponseEntity<MatchEvent> getMatchEvent(@PathVariable Long id) {
        log.debug("REST request to get MatchEvent : {}", id);
        MatchEvent matchEvent = matchEventRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(matchEvent));
    }

    /**
     * DELETE  /match-events/:id : delete the "id" matchEvent.
     *
     * @param id the id of the matchEvent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/match-events/{id}")
    @Timed
    public ResponseEntity<Void> deleteMatchEvent(@PathVariable Long id) {
        log.debug("REST request to delete MatchEvent : {}", id);
        matchEventRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
