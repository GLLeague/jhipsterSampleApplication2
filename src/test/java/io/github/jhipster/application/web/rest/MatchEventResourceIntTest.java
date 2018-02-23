package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplication2App;

import io.github.jhipster.application.domain.MatchEvent;
import io.github.jhipster.application.repository.MatchEventRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.github.jhipster.application.domain.enumeration.EventType;
/**
 * Test class for the MatchEventResource REST controller.
 *
 * @see MatchEventResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplication2App.class)
public class MatchEventResourceIntTest {

    private static final EventType DEFAULT_EVENT_TYPE = EventType.GOAL;
    private static final EventType UPDATED_EVENT_TYPE = EventType.ASSIST;

    @Autowired
    private MatchEventRepository matchEventRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMatchEventMockMvc;

    private MatchEvent matchEvent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MatchEventResource matchEventResource = new MatchEventResource(matchEventRepository);
        this.restMatchEventMockMvc = MockMvcBuilders.standaloneSetup(matchEventResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MatchEvent createEntity(EntityManager em) {
        MatchEvent matchEvent = new MatchEvent()
            .eventType(DEFAULT_EVENT_TYPE);
        return matchEvent;
    }

    @Before
    public void initTest() {
        matchEvent = createEntity(em);
    }

    @Test
    @Transactional
    public void createMatchEvent() throws Exception {
        int databaseSizeBeforeCreate = matchEventRepository.findAll().size();

        // Create the MatchEvent
        restMatchEventMockMvc.perform(post("/api/match-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matchEvent)))
            .andExpect(status().isCreated());

        // Validate the MatchEvent in the database
        List<MatchEvent> matchEventList = matchEventRepository.findAll();
        assertThat(matchEventList).hasSize(databaseSizeBeforeCreate + 1);
        MatchEvent testMatchEvent = matchEventList.get(matchEventList.size() - 1);
        assertThat(testMatchEvent.getEventType()).isEqualTo(DEFAULT_EVENT_TYPE);
    }

    @Test
    @Transactional
    public void createMatchEventWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = matchEventRepository.findAll().size();

        // Create the MatchEvent with an existing ID
        matchEvent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMatchEventMockMvc.perform(post("/api/match-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matchEvent)))
            .andExpect(status().isBadRequest());

        // Validate the MatchEvent in the database
        List<MatchEvent> matchEventList = matchEventRepository.findAll();
        assertThat(matchEventList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMatchEvents() throws Exception {
        // Initialize the database
        matchEventRepository.saveAndFlush(matchEvent);

        // Get all the matchEventList
        restMatchEventMockMvc.perform(get("/api/match-events?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(matchEvent.getId().intValue())))
            .andExpect(jsonPath("$.[*].eventType").value(hasItem(DEFAULT_EVENT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getMatchEvent() throws Exception {
        // Initialize the database
        matchEventRepository.saveAndFlush(matchEvent);

        // Get the matchEvent
        restMatchEventMockMvc.perform(get("/api/match-events/{id}", matchEvent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(matchEvent.getId().intValue()))
            .andExpect(jsonPath("$.eventType").value(DEFAULT_EVENT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMatchEvent() throws Exception {
        // Get the matchEvent
        restMatchEventMockMvc.perform(get("/api/match-events/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMatchEvent() throws Exception {
        // Initialize the database
        matchEventRepository.saveAndFlush(matchEvent);
        int databaseSizeBeforeUpdate = matchEventRepository.findAll().size();

        // Update the matchEvent
        MatchEvent updatedMatchEvent = matchEventRepository.findOne(matchEvent.getId());
        // Disconnect from session so that the updates on updatedMatchEvent are not directly saved in db
        em.detach(updatedMatchEvent);
        updatedMatchEvent
            .eventType(UPDATED_EVENT_TYPE);

        restMatchEventMockMvc.perform(put("/api/match-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMatchEvent)))
            .andExpect(status().isOk());

        // Validate the MatchEvent in the database
        List<MatchEvent> matchEventList = matchEventRepository.findAll();
        assertThat(matchEventList).hasSize(databaseSizeBeforeUpdate);
        MatchEvent testMatchEvent = matchEventList.get(matchEventList.size() - 1);
        assertThat(testMatchEvent.getEventType()).isEqualTo(UPDATED_EVENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingMatchEvent() throws Exception {
        int databaseSizeBeforeUpdate = matchEventRepository.findAll().size();

        // Create the MatchEvent

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMatchEventMockMvc.perform(put("/api/match-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matchEvent)))
            .andExpect(status().isCreated());

        // Validate the MatchEvent in the database
        List<MatchEvent> matchEventList = matchEventRepository.findAll();
        assertThat(matchEventList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMatchEvent() throws Exception {
        // Initialize the database
        matchEventRepository.saveAndFlush(matchEvent);
        int databaseSizeBeforeDelete = matchEventRepository.findAll().size();

        // Get the matchEvent
        restMatchEventMockMvc.perform(delete("/api/match-events/{id}", matchEvent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MatchEvent> matchEventList = matchEventRepository.findAll();
        assertThat(matchEventList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MatchEvent.class);
        MatchEvent matchEvent1 = new MatchEvent();
        matchEvent1.setId(1L);
        MatchEvent matchEvent2 = new MatchEvent();
        matchEvent2.setId(matchEvent1.getId());
        assertThat(matchEvent1).isEqualTo(matchEvent2);
        matchEvent2.setId(2L);
        assertThat(matchEvent1).isNotEqualTo(matchEvent2);
        matchEvent1.setId(null);
        assertThat(matchEvent1).isNotEqualTo(matchEvent2);
    }
}
