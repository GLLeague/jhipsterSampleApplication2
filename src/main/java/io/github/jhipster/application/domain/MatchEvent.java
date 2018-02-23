package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import io.github.jhipster.application.domain.enumeration.EventType;

/**
 * A MatchEvent.
 */
@Entity
@Table(name = "match_event")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MatchEvent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "event_type")
    private EventType eventType;

    @ManyToOne
    private Mtch mtch;

    @OneToOne
    @JoinColumn(unique = true)
    private Player player;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EventType getEventType() {
        return eventType;
    }

    public MatchEvent eventType(EventType eventType) {
        this.eventType = eventType;
        return this;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public Mtch getMtch() {
        return mtch;
    }

    public MatchEvent mtch(Mtch mtch) {
        this.mtch = mtch;
        return this;
    }

    public void setMtch(Mtch mtch) {
        this.mtch = mtch;
    }

    public Player getPlayer() {
        return player;
    }

    public MatchEvent player(Player player) {
        this.player = player;
        return this;
    }

    public void setPlayer(Player player) {
        this.player = player;
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
        MatchEvent matchEvent = (MatchEvent) o;
        if (matchEvent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), matchEvent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MatchEvent{" +
            "id=" + getId() +
            ", eventType='" + getEventType() + "'" +
            "}";
    }
}
