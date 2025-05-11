package xdezo.bidding.onlineBidding.Model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import xdezo.bidding.onlineBidding.Enums.UserRoles;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@Table(name = "usersbidders", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Email(message = "Invalid email format")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank
    @Column(nullable = false)
    private String password;

    @NotBlank
    @Column(nullable = false)
    private String firstName;

    @NotBlank
    @Column(nullable = false)
    private String lastName;

//    @NotBlank
    @Column(nullable = true)
    @Pattern(regexp = "^\\d{10}$", message = "Phone number must be 10 digits")
    private String phoneNumber;

//    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private UserRoles role;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @NotNull
    @Column(length = 100)
    private String imageUrl;



    @OneToOne(cascade = CascadeType.ALL, mappedBy = "payer_id")
    @JsonManagedReference("payer")
    private Payments payer;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "payee_id")
    @JsonManagedReference("payee")
    private Payments payee;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user_id")
    @JsonManagedReference("notification")
    @ToString.Exclude
    private List<Notifications> notification;

    @OneToMany(mappedBy = "bidder_id", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("bids")
    @ToString.Exclude
    private List<Bids> bids;

//    @NotNull
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "users_address")
    @JsonManagedReference("address")
    private Address address;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "sender")
    @JsonManagedReference("sender")
    private Message sender;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "receiver")
    @JsonManagedReference("receiver")
    private Message receiver;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userid")
    @JsonManagedReference("transaction")
    @ToString.Exclude       // to exclude list of transactions from the to string functionss
    private List<Transaction> transaction;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "sellerId")
    @JsonManagedReference("seller")
    private Review seller;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "reviewerId")
    @JsonManagedReference("reviewer")
    private Review reviewer;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "seller_id")
    @JsonManagedReference("sellerId")
    @ToString.Exclude
    private List<Auctions> seller_Id;

    public String getFullName() {
        return this.firstName + " " + this.lastName;
    }
}
