package xdezo.bidding.onlineBidding.Model.Payment;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class PaymentsInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Amount must be a positive number")
    private double amount;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Tax amount must be a positive number")
    private double taxAmount;

    @NotNull
    @Min(value = 0, message = "Delivery charge must be a positive number")
    private double deliveryCharge;

    @NotNull
    @Min(value = 0, message = "Service charge must be a positive number")
    private double serviceCharge;

    @NotNull
    @Min(value = 0, message = "Total amount must be a positive number")
    private double totalAmount;


    @PrePersist
    @PreUpdate
    private void calculateTotalAmount() {
        this.totalAmount = this.amount + this.taxAmount + this.deliveryCharge + this.serviceCharge;
    }
}
