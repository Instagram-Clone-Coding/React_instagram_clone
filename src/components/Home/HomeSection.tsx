import Article from "./Article";

const DUMMY_ARTICLES = [
    {
        imgs: [
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        ],
        location: "White Hart Lane Stadium",
        hashtags: ["#OnThisDay", "#안녕"],
        text: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
        owner: {
            username: "spursofficial",
            avatarUrl:
                "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        },
        likes: ["like1", "like2", "like3", "like4"],
        comments: [
            { username: "user1", comment: "이게 첫 번째 댓글이다!!" },
            { username: "user2", comment: "이게 두 번째 댓글이다!!" },
            { username: "user3", comment: "이게 세 번째 댓글이다!!" },
            { username: "user3", comment: "이게 세 번째 댓글이다!!" },
            { username: "user3", comment: "이게 세 번째 댓글이다!!" },
            { username: "user3", comment: "이게 세 번째 댓글이다!!" },
            { username: "user3", comment: "이게 세 번째 댓글이다!!" },
        ],
        createdAt: 1632738927077,
    },
    {
        imgs: [
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        ],
        location: "White Hart Lane Stadium",
        hashtags: ["#OnThisDay", "#안녕"],
        text: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
        owner: {
            username: "spursofficial",
            avatarUrl:
                "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        },
        likes: ["like1", "like2", "like3", "like4"],
        comments: [
            { username: "user1", comment: "이게 첫 번째 댓글이다!!" },
            { username: "user2", comment: "이게 두 번째 댓글이다!!" },
            { username: "user3", comment: "이게 세 번째 댓글이다!!" },
        ],
        createdAt: 1632638927077,
    },
    {
        imgs: [
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        ],
        location: "White Hart Lane Stadium",
        hashtags: ["#OnThisDay", "#안녕"],
        text: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
        owner: {
            username: "spursofficial",
            avatarUrl:
                "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        },
        likes: ["like1", "like2", "like3", "like4"],
        comments: [
            { username: "user1", comment: "이게 첫 번째 댓글이다!!" },
            { username: "user2", comment: "이게 두 번째 댓글이다!!" },
            { username: "user3", comment: "이게 세 번째 댓글이다!!" },
        ],
        createdAt: 1632638927077,
    },
];
const HomeSection = () => {
    return (
        <section>
            {DUMMY_ARTICLES.map((article, index) => (
                <Article key={index} article={article} />
            ))}
        </section>
    );
};

export default HomeSection;
