package xdezo.bidding.onlineBidding.Services;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import xdezo.bidding.onlineBidding.Model.Categories.AuctionCategory;
import xdezo.bidding.onlineBidding.Repo.CategoryRepo;

@Service
public class CategoryService {

    private final CategoryRepo categoryRepo;

    public CategoryService(CategoryRepo categoryRepo)
    {
        this.categoryRepo = categoryRepo;

    }

    @Transactional
    public AuctionCategory addCategory(AuctionCategory category){

        category.setCategoryTitle(category.getCategoryTitle().toUpperCase());
       return  categoryRepo.save(category);
    }
}
