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
 * A Season.
 */
@Entity
@Table(name = "season")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Season implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "season")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Round> rounds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Season name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Round> getRounds() {
        return rounds;
    }

    public Season rounds(Set<Round> rounds) {
        this.rounds = rounds;
        return this;
    }

    public Season addRound(Round round) {
        this.rounds.add(round);
        round.setSeason(this);
        return this;
    }

    public Season removeRound(Round round) {
        this.rounds.remove(round);
        round.setSeason(null);
        return this;
    }

    public void setRounds(Set<Round> rounds) {
        this.rounds = rounds;
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
        Season season = (Season) o;
        if (season.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), season.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Season{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
