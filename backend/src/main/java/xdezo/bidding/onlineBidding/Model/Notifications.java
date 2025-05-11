package xdezo.bidding.onlineBidding.Model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDateTime;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notifications {


    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JsonBackReference("notification")
    @JoinColumn(name = "user_id")
    private User user_id;

    @NotBlank
    @Column(name = "message", length =300)
    private String Message;

    @NotNull
    private Boolean is_read;


    @Column(name = "created_id")
    @CurrentTimestamp
    @NotNull
    private LocalDateTime created_at;



}
