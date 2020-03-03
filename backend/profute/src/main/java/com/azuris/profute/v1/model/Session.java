package com.azuris.profute.v1.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "session")
public class Session implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Insira um data")
    @Column(nullable = false, length = 4)
    private LocalDate date;

    @NotNull(message = "Insira um objetivo")
    @Size(max = 1000, message = "O tamanho máximo permitido para o objetivo é de 1000 caracteres")
    @Column(nullable = false, length = 1000)
    private String goals;

    @ManyToOne
    @JoinColumn(name = "id_team")
    @NotNull(message = "Insira uma equipe")
    private Team team;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
