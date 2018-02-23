package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Round.
 */
@Entity
@Table(name = "round")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Round implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_order")
    private Integer order;

    @OneToMany(mappedBy = "round")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Mtch> matches = new HashSet<>();

    @ManyToOne
    private Season season;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrder() {
        return order;
    }

    public Round order(Integer order) {
        this.order = order;
        return this;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public Set<Mtch> getMatches() {
        return matches;
    }

    public Round matches(Set<Mtch> mtches) {
        this.matches = mtches;
        return this;
    }

    public Round addMatch(Mtch mtch) {
        this.matches.add(mtch);
        mtch.setRound(this);
        return this;
    }

    public Round removeMatch(Mtch mtch) {
        this.matches.remove(mtch);
        mtch.setRound(null);
        return this;
    }

    public void setMatches(Set<Mtch> mtches) {
        this.matches = mtches;
    }

    public Season getSeason() {
        return season;
    }

    public Round season(Season season) {
        this.season = season;
        return this;
    }

    public void setSeason(Season season) {
        this.season = season;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Round round = (Round) o;
        if (round.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), round.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Round{" +
            "id=" + getId() +
            ", order=" + getOrder() +
            "}";
    }
}
