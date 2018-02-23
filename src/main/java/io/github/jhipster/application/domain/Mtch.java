package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import io.github.jhipster.application.domain.enumeration.MtchType;

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
    private MtchType matchType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MtchType getMatchType() {
        return matchType;
    }

    public Mtch matchType(MtchType matchType) {
        this.matchType = matchType;
        return this;
    }

    public void setMatchType(MtchType matchType) {
        this.matchType = matchType;
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
