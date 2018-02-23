package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.MtchEvent;

import io.github.jhipster.application.repository.MtchEventRepository;
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
 * REST controller for managing MtchEvent.
 */
@RestController
@RequestMapping("/api")
public class MtchEventResource {

    private final Logger log = LoggerFactory.getLogger(MtchEventResource.class);

    private static final String ENTITY_NAME = "mtchEvent";

    private final MtchEventRepository mtchEventRepository;

    public MtchEventResource(MtchEventRepository mtchEventRepository) {
        this.mtchEventRepository = mtchEventRepository;
    }

    /**
     * POST  /mtch-events : Create a new mtchEvent.
     *
     * @param mtchEvent the mtchEvent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mtchEvent, or with status 400 (Bad Request) if the mtchEvent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mtch-events")
    @Timed
    public ResponseEntity<MtchEvent> createMtchEvent(@RequestBody MtchEvent mtchEvent) throws URISyntaxException {
        log.debug("REST request to save MtchEvent : {}", mtchEvent);
        if (mtchEvent.getId() != null) {
            throw new BadRequestAlertException("A new mtchEvent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MtchEvent result = mtchEventRepository.save(mtchEvent);
        return ResponseEntity.created(new URI("/api/mtch-events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mtch-events : Updates an existing mtchEvent.
     *
     * @param mtchEvent the mtchEvent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mtchEvent,
     * or with status 400 (Bad Request) if the mtchEvent is not valid,
     * or with status 500 (Internal Server Error) if the mtchEvent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mtch-events")
    @Timed
    public ResponseEntity<MtchEvent> updateMtchEvent(@RequestBody MtchEvent mtchEvent) throws URISyntaxException {
        log.debug("REST request to update MtchEvent : {}", mtchEvent);
        if (mtchEvent.getId() == null) {
            return createMtchEvent(mtchEvent);
        }
        MtchEvent result = mtchEventRepository.save(mtchEvent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mtchEvent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mtch-events : get all the mtchEvents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mtchEvents in body
     */
    @GetMapping("/mtch-events")
    @Timed
    public List<MtchEvent> getAllMtchEvents() {
        log.debug("REST request to get all MtchEvents");
        return mtchEventRepository.findAll();
        }

    /**
     * GET  /mtch-events/:id : get the "id" mtchEvent.
     *
     * @param id the id of the mtchEvent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mtchEvent, or with status 404 (Not Found)
     */
    @GetMapping("/mtch-events/{id}")
    @Timed
    public ResponseEntity<MtchEvent> getMtchEvent(@PathVariable Long id) {
        log.debug("REST request to get MtchEvent : {}", id);
        MtchEvent mtchEvent = mtchEventRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mtchEvent));
    }

    /**
     * DELETE  /mtch-events/:id : delete the "id" mtchEvent.
     *
     * @param id the id of the mtchEvent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mtch-events/{id}")
    @Timed
    public ResponseEntity<Void> deleteMtchEvent(@PathVariable Long id) {
        log.debug("REST request to delete MtchEvent : {}", id);
        mtchEventRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
