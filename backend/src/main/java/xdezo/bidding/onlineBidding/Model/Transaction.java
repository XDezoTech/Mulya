package xdezo.bidding.onlineBidding.Model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import xdezo.bidding.onlineBidding.Enums.PaymentStatus;
import xdezo.bidding.onlineBidding.Enums.Transaction_Type;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JsonBackReference("transaction")
    @JoinColumn(name = "userId")
    private User userid;

    @NotNull(message = "amount is required")
    private Double amount;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Transaction_Type transactionType;


    @NotNull
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;


    @NotNull
    @CreationTimestamp
    private LocalDateTime created_at;
}
