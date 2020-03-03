package com.azuris.profute.v1.model;

import com.azuris.profute.v1.enumeration.PartEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "activity")
public class Activity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Insira um bloco")
    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private PartEnum part;

    @NotNull(message = "Insira um tipo")
    @Column(nullable = false, length = 50)
    private String type;

    @NotNull(message = "Insira um foco")
    @Column(nullable = false, length = 50)
    private String focus;

    @NotNull(message = "Insira um objetivo")
    @Size(max = 500, message = "O tamanho máximo permitido para o objetivo é de 500 caracteres")
    @Column(nullable = false, length = 500)
    private String goal;

    @NotNull(message = "Insira um tempo")
    @Column(nullable = false)
    private Integer time;

    @NotNull(message = "Insira uma série")
    @Column(nullable = false)
    private Integer serie;

    @NotNull(message = "Insira uma pausa")
    @Column(nullable = false)
    private Integer stop;

    @NotNull(message = "Insira um regras")
    @Size(max = 5000, message = "O tamanho máximo permitido para o nome é de 5000 caracteres")
    @Column(nullable = false, length = 5000)
    private String rules;

    @NotNull(message = "Insira uma descrição")
    @Size(max = 5000, message = "O tamanho máximo permitido para o nome é de 5000 caracteres")
    @Column(nullable = false, length = 5000)
    private String description;

    @ManyToOne
    @JoinColumn(name = "id_session")
    @NotNull(message = "Insira uma sessão")
    private Session session;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
