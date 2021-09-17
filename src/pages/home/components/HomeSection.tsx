import Article from "./Article";

const DUMMY_ARTICLES = [
    {
        imgs: [
            "https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-19/s150x150/181160596_188750453068099_2847892752440208610_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_ohc=4KCLEvWfq5QAX-6a1gS&tn=Bvavh5O5qGkgKzvr&edm=AEF8tYYBAAAA&ccb=7-4&oh=04934330d450386c447828da715fe684&oe=6149E413&_nc_sid=a9513d",
            "https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-19/s150x150/189705576_821176652117430_7177289181949697061_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_ohc=f7pzxYzwKb0AX8MWmzu&edm=AEF8tYYBAAAA&ccb=7-4&oh=3394846ed7fe41a06f2594be1ff54313&oe=61498CC6&_nc_sid=a9513d",
        ],
        location: "White Hart Lane Stadium",
        hashtags: ["#OnThisDay", "#안녕"],
        text: "이 영역은 토트넘 핫스퍼 공식 계정 글입니다.",
        owner: {
            username: "spursofficial",
            avatarUrl:
                "https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-19/s150x150/181160596_188750453068099_2847892752440208610_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_ohc=4KCLEvWfq5QAX-6a1gS&tn=Bvavh5O5qGkgKzvr&edm=APU89FABAAAA&ccb=7-4&oh=f1a4b5bc9c3915809aebd0eb968235dc&oe=6149E413&_nc_sid=86f79a",
        },
        likes: ["like1", "like2", "like3", "like4"],
        comments: [
            { username: "user1" },
            { username: "user2" },
            { username: "user3" },
        ],
    },
    {
        imgs: [
            "https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-19/s150x150/181160596_188750453068099_2847892752440208610_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_ohc=4KCLEvWfq5QAX-6a1gS&tn=Bvavh5O5qGkgKzvr&edm=AEF8tYYBAAAA&ccb=7-4&oh=04934330d450386c447828da715fe684&oe=6149E413&_nc_sid=a9513d",
            "https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-19/s150x150/189705576_821176652117430_7177289181949697061_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_ohc=f7pzxYzwKb0AX8MWmzu&edm=AEF8tYYBAAAA&ccb=7-4&oh=3394846ed7fe41a06f2594be1ff54313&oe=61498CC6&_nc_sid=a9513d",
        ],
        location: "White Hart Lane Stadium",
        hashtags: ["#OnThisDay", "#안녕"],
        text: "이 영역은 토트넘 핫스퍼 공식 계정 글입니다.",
        owner: {
            username: "spursofficial",
            avatarUrl:
                "https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-19/s150x150/181160596_188750453068099_2847892752440208610_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_ohc=4KCLEvWfq5QAX-6a1gS&tn=Bvavh5O5qGkgKzvr&edm=APU89FABAAAA&ccb=7-4&oh=f1a4b5bc9c3915809aebd0eb968235dc&oe=6149E413&_nc_sid=86f79a",
        },
        likes: ["like1", "like2", "like3", "like4"],
        comments: [
            { username: "user1" },
            { username: "user2" },
            { username: "user3" },
        ],
    },
    {
        imgs: [
            "https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-19/s150x150/181160596_188750453068099_2847892752440208610_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_ohc=4KCLEvWfq5QAX-6a1gS&tn=Bvavh5O5qGkgKzvr&edm=AEF8tYYBAAAA&ccb=7-4&oh=04934330d450386c447828da715fe684&oe=6149E413&_nc_sid=a9513d",
            "https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-19/s150x150/189705576_821176652117430_7177289181949697061_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_ohc=f7pzxYzwKb0AX8MWmzu&edm=AEF8tYYBAAAA&ccb=7-4&oh=3394846ed7fe41a06f2594be1ff54313&oe=61498CC6&_nc_sid=a9513d",
        ],
        location: "White Hart Lane Stadium",
        hashtags: ["#OnThisDay", "#안녕"],
        text: "이 영역은 토트넘 핫스퍼 공식 계정 글입니다.",
        owner: {
            username: "spursofficial",
            avatarUrl:
                "https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-19/s150x150/181160596_188750453068099_2847892752440208610_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_ohc=4KCLEvWfq5QAX-6a1gS&tn=Bvavh5O5qGkgKzvr&edm=APU89FABAAAA&ccb=7-4&oh=f1a4b5bc9c3915809aebd0eb968235dc&oe=6149E413&_nc_sid=86f79a",
        },
        likes: ["like1", "like2", "like3", "like4"],
        comments: [
            { username: "user1" },
            { username: "user2" },
            { username: "user3" },
        ],
    },
];
const HomeSection = () => {
    return (
        <section>
            {DUMMY_ARTICLES.map((article) => (
                <Article article={article} />
            ))}
        </section>
    );
};

export default HomeSection;
