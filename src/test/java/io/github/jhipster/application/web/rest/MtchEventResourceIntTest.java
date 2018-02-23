package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplication2App;

import io.github.jhipster.application.domain.MtchEvent;
import io.github.jhipster.application.repository.MtchEventRepository;
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
 * Test class for the MtchEventResource REST controller.
 *
 * @see MtchEventResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplication2App.class)
public class MtchEventResourceIntTest {

    private static final EventType DEFAULT_EVENT_TYPE = EventType.GOAL;
    private static final EventType UPDATED_EVENT_TYPE = EventType.ASSIST;

    @Autowired
    private MtchEventRepository mtchEventRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMtchEventMockMvc;

    private MtchEvent mtchEvent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MtchEventResource mtchEventResource = new MtchEventResource(mtchEventRepository);
        this.restMtchEventMockMvc = MockMvcBuilders.standaloneSetup(mtchEventResource)
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
    public static MtchEvent createEntity(EntityManager em) {
        MtchEvent mtchEvent = new MtchEvent()
            .eventType(DEFAULT_EVENT_TYPE);
        return mtchEvent;
    }

    @Before
    public void initTest() {
        mtchEvent = createEntity(em);
    }

    @Test
    @Transactional
    public void createMtchEvent() throws Exception {
        int databaseSizeBeforeCreate = mtchEventRepository.findAll().size();

        // Create the MtchEvent
        restMtchEventMockMvc.perform(post("/api/mtch-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mtchEvent)))
            .andExpect(status().isCreated());

        // Validate the MtchEvent in the database
        List<MtchEvent> mtchEventList = mtchEventRepository.findAll();
        assertThat(mtchEventList).hasSize(databaseSizeBeforeCreate + 1);
        MtchEvent testMtchEvent = mtchEventList.get(mtchEventList.size() - 1);
        assertThat(testMtchEvent.getEventType()).isEqualTo(DEFAULT_EVENT_TYPE);
    }

    @Test
    @Transactional
    public void createMtchEventWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mtchEventRepository.findAll().size();

        // Create the MtchEvent with an existing ID
        mtchEvent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMtchEventMockMvc.perform(post("/api/mtch-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mtchEvent)))
            .andExpect(status().isBadRequest());

        // Validate the MtchEvent in the database
        List<MtchEvent> mtchEventList = mtchEventRepository.findAll();
        assertThat(mtchEventList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMtchEvents() throws Exception {
        // Initialize the database
        mtchEventRepository.saveAndFlush(mtchEvent);

        // Get all the mtchEventList
        restMtchEventMockMvc.perform(get("/api/mtch-events?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mtchEvent.getId().intValue())))
            .andExpect(jsonPath("$.[*].eventType").value(hasItem(DEFAULT_EVENT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getMtchEvent() throws Exception {
        // Initialize the database
        mtchEventRepository.saveAndFlush(mtchEvent);

        // Get the mtchEvent
        restMtchEventMockMvc.perform(get("/api/mtch-events/{id}", mtchEvent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mtchEvent.getId().intValue()))
            .andExpect(jsonPath("$.eventType").value(DEFAULT_EVENT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMtchEvent() throws Exception {
        // Get the mtchEvent
        restMtchEventMockMvc.perform(get("/api/mtch-events/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMtchEvent() throws Exception {
        // Initialize the database
        mtchEventRepository.saveAndFlush(mtchEvent);
        int databaseSizeBeforeUpdate = mtchEventRepository.findAll().size();

        // Update the mtchEvent
        MtchEvent updatedMtchEvent = mtchEventRepository.findOne(mtchEvent.getId());
        // Disconnect from session so that the updates on updatedMtchEvent are not directly saved in db
        em.detach(updatedMtchEvent);
        updatedMtchEvent
            .eventType(UPDATED_EVENT_TYPE);

        restMtchEventMockMvc.perform(put("/api/mtch-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMtchEvent)))
            .andExpect(status().isOk());

        // Validate the MtchEvent in the database
        List<MtchEvent> mtchEventList = mtchEventRepository.findAll();
        assertThat(mtchEventList).hasSize(databaseSizeBeforeUpdate);
        MtchEvent testMtchEvent = mtchEventList.get(mtchEventList.size() - 1);
        assertThat(testMtchEvent.getEventType()).isEqualTo(UPDATED_EVENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingMtchEvent() throws Exception {
        int databaseSizeBeforeUpdate = mtchEventRepository.findAll().size();

        // Create the MtchEvent

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMtchEventMockMvc.perform(put("/api/mtch-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mtchEvent)))
            .andExpect(status().isCreated());

        // Validate the MtchEvent in the database
        List<MtchEvent> mtchEventList = mtchEventRepository.findAll();
        assertThat(mtchEventList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMtchEvent() throws Exception {
        // Initialize the database
        mtchEventRepository.saveAndFlush(mtchEvent);
        int databaseSizeBeforeDelete = mtchEventRepository.findAll().size();

        // Get the mtchEvent
        restMtchEventMockMvc.perform(delete("/api/mtch-events/{id}", mtchEvent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MtchEvent> mtchEventList = mtchEventRepository.findAll();
        assertThat(mtchEventList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MtchEvent.class);
        MtchEvent mtchEvent1 = new MtchEvent();
        mtchEvent1.setId(1L);
        MtchEvent mtchEvent2 = new MtchEvent();
        mtchEvent2.setId(mtchEvent1.getId());
        assertThat(mtchEvent1).isEqualTo(mtchEvent2);
        mtchEvent2.setId(2L);
        assertThat(mtchEvent1).isNotEqualTo(mtchEvent2);
        mtchEvent1.setId(null);
        assertThat(mtchEvent1).isNotEqualTo(mtchEvent2);
    }
}
