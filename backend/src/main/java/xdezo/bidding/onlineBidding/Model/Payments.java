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
import xdezo.bidding.onlineBidding.Enums.PaymentMethod;
import xdezo.bidding.onlineBidding.Enums.PaymentStatus;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull // Changed from @NotBlank (only for Strings)
    @Column(nullable = false)
    private Double amount;


    @NotNull
    @Enumerated(EnumType.STRING)
    private PaymentStatus payment_status;


    @NotNull
    @Column(nullable = false)
    private LocalDateTime payment_date;

    @OneToOne
    @JsonBackReference("paymentId")
    @JoinColumn(name = "auction_id")
    private Auctions auction_id;

    @OneToOne
    @JsonBackReference("payer")
    @JoinColumn(name = "payer_id")
    private User payer_id;

    @OneToOne
    @JsonBackReference("payee")
    @JoinColumn(name = "payee_id")
    private User payee_id;
}
