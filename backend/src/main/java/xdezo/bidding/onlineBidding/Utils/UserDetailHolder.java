package xdezo.bidding.onlineBidding.Utils;




    public class UserDetailHolder {

        public static final ThreadLocal<String> userHolder = new ThreadLocal<>();

        public static void setUsername(String username) {
            userHolder.set(username);
        }

    public static String getUsername() {
            return userHolder.get();
        }

        public static void clear() {
            userHolder.remove();

        }
    }


