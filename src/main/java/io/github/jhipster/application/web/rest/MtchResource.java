package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Mtch;

import io.github.jhipster.application.repository.MtchRepository;
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
 * REST controller for managing Mtch.
 */
@RestController
@RequestMapping("/api")
public class MtchResource {

    private final Logger log = LoggerFactory.getLogger(MtchResource.class);

    private static final String ENTITY_NAME = "mtch";

    private final MtchRepository mtchRepository;

    public MtchResource(MtchRepository mtchRepository) {
        this.mtchRepository = mtchRepository;
    }

    /**
     * POST  /mtches : Create a new mtch.
     *
     * @param mtch the mtch to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mtch, or with status 400 (Bad Request) if the mtch has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mtches")
    @Timed
    public ResponseEntity<Mtch> createMtch(@RequestBody Mtch mtch) throws URISyntaxException {
        log.debug("REST request to save Mtch : {}", mtch);
        if (mtch.getId() != null) {
            throw new BadRequestAlertException("A new mtch cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Mtch result = mtchRepository.save(mtch);
        return ResponseEntity.created(new URI("/api/mtches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mtches : Updates an existing mtch.
     *
     * @param mtch the mtch to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mtch,
     * or with status 400 (Bad Request) if the mtch is not valid,
     * or with status 500 (Internal Server Error) if the mtch couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mtches")
    @Timed
    public ResponseEntity<Mtch> updateMtch(@RequestBody Mtch mtch) throws URISyntaxException {
        log.debug("REST request to update Mtch : {}", mtch);
        if (mtch.getId() == null) {
            return createMtch(mtch);
        }
        Mtch result = mtchRepository.save(mtch);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mtch.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mtches : get all the mtches.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mtches in body
     */
    @GetMapping("/mtches")
    @Timed
    public List<Mtch> getAllMtches() {
        log.debug("REST request to get all Mtches");
        return mtchRepository.findAll();
        }

    /**
     * GET  /mtches/:id : get the "id" mtch.
     *
     * @param id the id of the mtch to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mtch, or with status 404 (Not Found)
     */
    @GetMapping("/mtches/{id}")
    @Timed
    public ResponseEntity<Mtch> getMtch(@PathVariable Long id) {
        log.debug("REST request to get Mtch : {}", id);
        Mtch mtch = mtchRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mtch));
    }

    /**
     * DELETE  /mtches/:id : delete the "id" mtch.
     *
     * @param id the id of the mtch to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mtches/{id}")
    @Timed
    public ResponseEntity<Void> deleteMtch(@PathVariable Long id) {
        log.debug("REST request to delete Mtch : {}", id);
        mtchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
