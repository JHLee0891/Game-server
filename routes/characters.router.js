import express from 'express';
import characterSchema from '../schemas/characters.schema.js'

const router = express.Router();

router.get('/statusGet/:character_id', async(req, res) => {
    return res.status(200).json({
        message:'니케릭 읽기'
    })
});
// 값 1회 반환
router.post('/statusPost', async(req, res) => {
    //몽고DB에서
    //아이디 값 갯수를 샌다.
    // find()모든 값을 찾음 exec()프로미스로 반환
    // characterSchema가 mongodb 안에 있는 데이터
    // 중간값이 지워지면 오류 발생!~
    const characterArr = await characterSchema.findOne().sort('-character_id').exec();
    const character_id = characterArr ? characterArr.character_id + 1 : 1;
    const {name} = req.body;
    const data = new characterSchema({
        character_id: character_id,
        name: name
    });
    await data.save();
    return res.status(201).json(data);
});

router.delete('/allCharacter/:character_id', async(req, res) => {
    //몽고db에서
    //아이디 값을 찾고
    //삭제를 한다
    const {character_id} = req.params;
    console.log(req.params);
    const allCharacter = await characterSchema.findOne({ character_id: character_id}).exec();
    if (!allCharacter) {
        return res.status(404).json({errormessage: '에러남'})
    }

    await allCharacter.deleteOne({character_id: character_id});
    return res.status(200).json({
        message:'니케릭 삭제'
    })
});

export default router;

// 없는걸 부를 때 404, 조건에 안맞는 값을 부를때 (유효성 검사 탈락 시) 400
