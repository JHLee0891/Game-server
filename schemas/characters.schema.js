// 데이터 베이스에 들어가는 컬렉션 모양
// 테이블 = NoSQL 콜렉션
// 첫번째

// 몽구스를 쓸수있게 불러옴
import mongoose from "mongoose"

// 자료형 = const
// schema = db의 모양
// mongoose.Schema 형태를 가져와서 => characterSchema 이름을 넣어줌
const characterSchema = new mongoose.Schema({
// 형태 구현
// 문자열 종류 지정
    character_id:{
        type: Number,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
        unique: true,
    },
    health:{
        type: Number,
        required: true,
        default: 500,
    },
    power:{
        type: Number,
        required: true,
        default: 100,
    },
});

//
export default mongoose.model("character", characterSchema)

