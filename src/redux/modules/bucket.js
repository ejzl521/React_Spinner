import { firestore } from "../../firebase";

// Action
const LOAD = 'bucket/LOAD';

// initialState 
// 초기 상태값
const initialState = {
    loaded: false,
    list: [
        { text: "치킨 먹기" },
        { text: "컴퓨터 게임하기" },
        { text: "여행 가기" }
    ]
};

// Action Creators
export const loadBucket = (bucket) => {
    return { type: LOAD, bucket };
}

// Firestore에서 collection을 가져옴
const bucket_db = firestore.collection("bucket");

// Firebase와 통신하는 함수. 함수를 반환한다.
// Firebase에서 데이터를 가져오는 부분 (LOAD)
export const loadBucketFB = () => {
    // 함수를 반환하는 미들웨어 부분

    return function (dispatch) {
        bucket_db.get().then((docs) => {
            // Firestore에서 가져온 데이터를 저장할 변수
            let bucket_data = [];
            // "bucket" 콜렉션의 모든 문서에서 데이터와 id를 가져옴!
            docs.forEach((doc) => {
                if (doc.exists) {
                    bucket_data = [...bucket_data, { id: doc.id, ...doc.data() }]
                }
            })
            // console.log(bucket_data);
            // firestore에서 가져온 데이터를 action에 넣어서 dispatch 해준다!
            // 리덕스 모듈에서 action을 dispatch 해주므로 컴포넌트에서는 firestore와
            // 통신하는 함수를 불러주면 된다!
            dispatch(loadBucket(bucket_data))
        });
    }
}

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        // do reducer stuff
        case "bucket/LOAD":
            // Firestore에 데이터가 있을때 리턴
            if (action.bucket.length > 0) {
                return { list: action.bucket, loaded: true };
            }
            // 없으면 initialState를 리턴해줌
            return state;

        default:
            return state;
    }
}