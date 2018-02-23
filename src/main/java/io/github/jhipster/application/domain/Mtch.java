package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import io.github.jhipster.application.domain.enumeration.MatchType;

/**
 * A Mtch.
 */
@Entity
@Table(name = "mtch")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Mtch implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "match_type")
    private MatchType matchType;

    @OneToOne
    @JoinColumn(unique = true)
    private Team teamOne;

    @OneToOne
    @JoinColumn(unique = true)
    private Team teamTwo;

    @OneToMany(mappedBy = "mtch")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MatchEvent> matchEvents = new HashSet<>();

    @ManyToOne
    private Round round;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MatchType getMatchType() {
        return matchType;
    }

    public Mtch matchType(MatchType matchType) {
        this.matchType = matchType;
        return this;
    }

    public void setMatchType(MatchType matchType) {
        this.matchType = matchType;
    }

    public Team getTeamOne() {
        return teamOne;
    }

    public Mtch teamOne(Team team) {
        this.teamOne = team;
        return this;
    }

    public void setTeamOne(Team team) {
        this.teamOne = team;
    }

    public Team getTeamTwo() {
        return teamTwo;
    }

    public Mtch teamTwo(Team team) {
        this.teamTwo = team;
        return this;
    }

    public void setTeamTwo(Team team) {
        this.teamTwo = team;
    }

    public Set<MatchEvent> getMatchEvents() {
        return matchEvents;
    }

    public Mtch matchEvents(Set<MatchEvent> matchEvents) {
        this.matchEvents = matchEvents;
        return this;
    }

    public Mtch addMatchEvent(MatchEvent matchEvent) {
        this.matchEvents.add(matchEvent);
        matchEvent.setMtch(this);
        return this;
    }

    public Mtch removeMatchEvent(MatchEvent matchEvent) {
        this.matchEvents.remove(matchEvent);
        matchEvent.setMtch(null);
        return this;
    }

    public void setMatchEvents(Set<MatchEvent> matchEvents) {
        this.matchEvents = matchEvents;
    }

    public Round getRound() {
        return round;
    }

    public Mtch round(Round round) {
        this.round = round;
        return this;
    }

    public void setRound(Round round) {
        this.round = round;
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
        Mtch mtch = (Mtch) o;
        if (mtch.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mtch.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mtch{" +
            "id=" + getId() +
            ", matchType='" + getMatchType() + "'" +
            "}";
    }
}
