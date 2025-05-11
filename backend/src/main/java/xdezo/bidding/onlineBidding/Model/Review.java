package xdezo.bidding.onlineBidding.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToOne
    @JsonBackReference("reviewer")
    @JoinColumn(name = "reviewer_id")
   private User reviewerId;

    @OneToOne
    @JsonBackReference("seller")
    @JoinColumn(name = "seller_id")
   private User sellerId;

    @NotNull
    @Min(1)
    @Max(5)
    private int rating;
    @NotBlank
    private String  comment;

    @NotNull
    @CreationTimestamp
    private LocalDateTime created_at;


}
