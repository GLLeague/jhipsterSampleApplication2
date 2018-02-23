package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplication2App;

import io.github.jhipster.application.domain.Mtch;
import io.github.jhipster.application.repository.MtchRepository;
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

import io.github.jhipster.application.domain.enumeration.MatchType;
/**
 * Test class for the MtchResource REST controller.
 *
 * @see MtchResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplication2App.class)
public class MtchResourceIntTest {

    private static final MatchType DEFAULT_MATCH_TYPE = MatchType.TOURNAMENT;
    private static final MatchType UPDATED_MATCH_TYPE = MatchType.CLASSIC;

    @Autowired
    private MtchRepository mtchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMtchMockMvc;

    private Mtch mtch;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MtchResource mtchResource = new MtchResource(mtchRepository);
        this.restMtchMockMvc = MockMvcBuilders.standaloneSetup(mtchResource)
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
    public static Mtch createEntity(EntityManager em) {
        Mtch mtch = new Mtch()
            .matchType(DEFAULT_MATCH_TYPE);
        return mtch;
    }

    @Before
    public void initTest() {
        mtch = createEntity(em);
    }

    @Test
    @Transactional
    public void createMtch() throws Exception {
        int databaseSizeBeforeCreate = mtchRepository.findAll().size();

        // Create the Mtch
        restMtchMockMvc.perform(post("/api/mtches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mtch)))
            .andExpect(status().isCreated());

        // Validate the Mtch in the database
        List<Mtch> mtchList = mtchRepository.findAll();
        assertThat(mtchList).hasSize(databaseSizeBeforeCreate + 1);
        Mtch testMtch = mtchList.get(mtchList.size() - 1);
        assertThat(testMtch.getMatchType()).isEqualTo(DEFAULT_MATCH_TYPE);
    }

    @Test
    @Transactional
    public void createMtchWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mtchRepository.findAll().size();

        // Create the Mtch with an existing ID
        mtch.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMtchMockMvc.perform(post("/api/mtches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mtch)))
            .andExpect(status().isBadRequest());

        // Validate the Mtch in the database
        List<Mtch> mtchList = mtchRepository.findAll();
        assertThat(mtchList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMtches() throws Exception {
        // Initialize the database
        mtchRepository.saveAndFlush(mtch);

        // Get all the mtchList
        restMtchMockMvc.perform(get("/api/mtches?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mtch.getId().intValue())))
            .andExpect(jsonPath("$.[*].matchType").value(hasItem(DEFAULT_MATCH_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getMtch() throws Exception {
        // Initialize the database
        mtchRepository.saveAndFlush(mtch);

        // Get the mtch
        restMtchMockMvc.perform(get("/api/mtches/{id}", mtch.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mtch.getId().intValue()))
            .andExpect(jsonPath("$.matchType").value(DEFAULT_MATCH_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMtch() throws Exception {
        // Get the mtch
        restMtchMockMvc.perform(get("/api/mtches/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMtch() throws Exception {
        // Initialize the database
        mtchRepository.saveAndFlush(mtch);
        int databaseSizeBeforeUpdate = mtchRepository.findAll().size();

        // Update the mtch
        Mtch updatedMtch = mtchRepository.findOne(mtch.getId());
        // Disconnect from session so that the updates on updatedMtch are not directly saved in db
        em.detach(updatedMtch);
        updatedMtch
            .matchType(UPDATED_MATCH_TYPE);

        restMtchMockMvc.perform(put("/api/mtches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMtch)))
            .andExpect(status().isOk());

        // Validate the Mtch in the database
        List<Mtch> mtchList = mtchRepository.findAll();
        assertThat(mtchList).hasSize(databaseSizeBeforeUpdate);
        Mtch testMtch = mtchList.get(mtchList.size() - 1);
        assertThat(testMtch.getMatchType()).isEqualTo(UPDATED_MATCH_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingMtch() throws Exception {
        int databaseSizeBeforeUpdate = mtchRepository.findAll().size();

        // Create the Mtch

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMtchMockMvc.perform(put("/api/mtches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mtch)))
            .andExpect(status().isCreated());

        // Validate the Mtch in the database
        List<Mtch> mtchList = mtchRepository.findAll();
        assertThat(mtchList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMtch() throws Exception {
        // Initialize the database
        mtchRepository.saveAndFlush(mtch);
        int databaseSizeBeforeDelete = mtchRepository.findAll().size();

        // Get the mtch
        restMtchMockMvc.perform(delete("/api/mtches/{id}", mtch.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mtch> mtchList = mtchRepository.findAll();
        assertThat(mtchList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mtch.class);
        Mtch mtch1 = new Mtch();
        mtch1.setId(1L);
        Mtch mtch2 = new Mtch();
        mtch2.setId(mtch1.getId());
        assertThat(mtch1).isEqualTo(mtch2);
        mtch2.setId(2L);
        assertThat(mtch1).isNotEqualTo(mtch2);
        mtch1.setId(null);
        assertThat(mtch1).isNotEqualTo(mtch2);
    }
}
