"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoles = seedRoles;
exports.seedDiseaseInformations = seedDiseaseInformations;
exports.seedDeficiencySolutions = seedDeficiencySolutions;
exports.seedUsers = seedUsers;
exports.seedRegions = seedRegions;
exports.seedProvinces = seedProvinces;
exports.seedRiceVariety = seedRiceVariety;
exports.seedMorphology = seedMorphology;
exports.seedStrength = seedStrength;
exports.seedWeaknesse = seedWeaknesse;
//seed.ts
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function seedRoles() {
    const { data, error } = await supabase.from('Roles').select('id').limit(1);
    if (error) {
        console.error('❌ Error checking Users:', error);
        return;
    }
    if (data.length == 0) {
        await supabase.from('Roles').insert([
            { role_name: 'ชาวนา' },
            { role_name: 'เจ้าหน้าที่กระทรวงเกษตรฯ' }
        ]);
    }
}
async function seedDiseaseInformations() {
    const { data, error } = await supabase.from('DiseaseInformations').select('id').limit(1);
    if (error) {
        console.error('❌ Error checking DiseaseInformations :', error);
        return;
    }
    if (data.length == 0) {
        await supabase.from('DiseaseInformations').insert([
            { disease_name: 'โรคใบจุดสีน้ำตาล', symptom: `<u>แผลที่ใบข้าว</u> พบมากในระยะแตกกอ แผลมีลักษณะเป็นจุดสีน้ำตาล รูปกลมหรือรูปไข่ขอบนอกสุดของแผลมีสีเหลือง ขนาดเส้นผ่าศูนย์กลาง 0.5-1 มิลลิเมตร แผลที่มีการพัฒนาเต็มที่ขนาดประมาณ 1-2 x 4-10 มิลลิเมตร บางครั้งพบแผลไม่เป็นวงกลมหรือรูปไข่ แต่จะเป็นรอยเปื้อนคล้ายสนิมกระจัดกระจายทั่วไปบนใบข้าว <u>แผลบนเมล็ดข้าวเปลือก</u> (โรคเมล็ดด่าง) บางแผลมีขนาดเล็ก บางแผลอาจใหญ่คลุมเมล็ดข้าวเปลือก ทำให้เมล็ดข้าวเปลือกสกปรก เสื่อมคุณภาพ เมื่อนำไปสีข้าวสารจะหักง่าย` },
            { disease_name: 'โรคขอบใบแห้ง', symptom: `โรคนี้เป็นได้ตั้งแต่ระยะกล้าถึงออกรวง ต้นกล้าจะมีจุดเล็กๆ ลักษณะช้ำที่ขอบใบของใบล่าง ต่อมาประมาณ 7 - 10 วัน จุดช้ำนี้จะขยายกลายเป็นทางสีเหลืองยาวตามใบ ใบที่เป็นโรคจะแห้งเร็ว และสีเขียวจะจางลงเป็นสีเทาๆ ระยะปักดำใบที่เป็นโรคขอบใบมีรอยขีดช้ำ ต่อมาจะเปลี่ยนเป็นสีเหลือง ที่แผลมีหยดน้ำสีครีมกลมๆ ขนาดเล็ก ต่อมาจะกลายเป็นสีน้ำตาลและหลุดไปตามน้ำหรือฝนแผลขยายตามความยาวของใบและตามความกว้างของใบ ขอบแผลหยัก แผลนี้เมื่อนานไปจะเปลี่ยนเป็นสีเทา ใบที่เป็นโรคขอบใบจะแห้งและม้วนตามความยาว ต้นข้าวเหี่ยวเฉาและแห้งตายทั้งต้นโดยรวดเร็ว เรียกอาการของโรคนี้ว่า “ครีเสก” (kresek)` },
            { disease_name: 'โรคใบสีส้ม', symptom: `เป็นได้ทั้งระยะกล้า แตกกอ ตั้งท้อง หากข้าวได้รับเชื้อในระยะกล้าถึงระยะแตกกอ ข้าวจะเสียหายมากกว่าได้รับเชื้อในระยะตั้งท้องถึงระยะออกรวงข้าวเริ่มแสดงอาการหลังจากได้รับเชื้อ 15 - 20 วันอาการเริ่มต้นใบข้าวจะเริ่มมีสีเหลืองสลับเขียว ต่อมาจะเปลี่ยนเป็นสีเหลือง เริ่มจากปลายใบเข้าหาโคนใบ ถ้าเป็นรุนแรงในระยะกล้าต้นข้าวอาจถึงตาย ต้นที่เป็นโรคจะเตี้ยแคระแกร็น ช่วงลำต้นสั้นกว่าปกติมาก ใบใหม่ที่โผล่ออกมามีตำแหน่งต่ำกว่าข้อต่อใบล่าสุด ถ้าเป็นรุนแรงอาจตายทั้งกอ ถ้าไม่ตายจะออกรวงล่าช้ากว่าปกติ ให้รวงเล็ก หรือไม่ออกรวงเลย` },
            { disease_name: 'โรคไหม้', symptom: `<u>ระยะกล้า</u> ที่ใบมีแผลจุดสีนํ้าตาล คล้ายรูปตามีสีเทาอยู่ตรงกลางแผล ถ้าระบาดรุนแรง กล้าข้าวจะแห้ง และฟุบตาย อาการคล้ายถูกไฟไหม้ (blast)ระยะแตกกอ พบได้ที่ใบ กาบใบ ข้อต่อของใบและข้อต่อของลำต้น ใบจะมีแผลสีนํ้าตาลดำ และหลุดจากกาบใบ<u>ระยะคอรวง</u> จะทำให้เมล็ดลีบ ในข้าวเริ่มให้รวงแต่ถ้าเป็นโรคตอนรวงข้าวแก่ใกล้เก็บเกี่ยว คอรวงจะปรากฏรอยแผลช้ำสีน้ำตาล ทำให้เปราะหักรวงข้าวร่วงหล่น` },
            { disease_name: 'โรคใบวงสีน้ำตาล', symptom: `<u>ระยะกล้า</u> ข้าวจะแสดงอาการไหม้ที่ปลายใบและมีสีน้ำตาลเข้ม <u>ระยะแตกกอ</u>อาการส่วนใหญ่จะเกิดบนใบ แต่มักจะเกิดแผลที่ปลายใบมากกว่าบริเวณอื่นๆ ของใบ แผลที่เกิดบนใบในระยะแรกมีลักษณะเป็นรอยช้ำ รูปไข่ยาวๆ แผลสีน้ำตาลปนเทา ขอบแผลสีน้ำตาลอ่อน จากนั้นแผลจะขยายใหญ่ขึ้นเป็นรูปวงรี ติดต่อกัน ทำให้เกิดอาการใบไหม้บริเวณกว้าง และเปลี่ยนเป็นสีฟางข้าว ในที่สุดแผลจะมีลักษณะเป็นวงซ้อนๆ กันลุกลามเข้ามาที่โคนใบ มีผลทำให้ข้าวแห้งก่อนกำหนด` },
            { disease_name: 'โรคใบขีดสีน้ำตาล', symptom: `ลักษณะแผลที่ใบข้าวมีเป็นขีดๆ สีน้ำตาลขนานไปกับเส้นใบข้าว มักพบในระยะข้าวแตกกอ แผลไม่กว้างตรงกลางเล็กและไม่มีรอยช้ำที่แผล ต่อมาแผลจะขยายมาติดกัน แผลจะมีมากตามใบล่างและปลายใบ ใบที่เป็นโรคจะแห้งตายจากปลายใบก่อน ต้นข้าวที่เป็นโรครุนแรงจะมีแผลสีน้ำตาลที่ข้อต่อใบได้เช่นกัน เชื้อนี้สามารถเข้าทำลายคอรวง ทำให้คอรวงเน่าและหักพับได้` },
            { disease_name: 'โรคแมลงดำหนามข้าว', symptom: `เกิดจากด้วงปีกแข็งชนิดหนึ่ง มีหนามแข็งปกคลุมหรือตัวหนอนของด้วงชนิดนี้ที่มีลักษณะลำตัวแบน สีขาว ตัวเต็มวัยมีสีดำ ลำตัวยาว 5-6 มิลลิเมตร ตัวเต็มวัยกัดกิน และแทะผิวใบข้าวด้านบน ทำให้เป็นรอยขูดทางสีขาวยาวขนานกับเส้นกลางใบ ส่วนตัวหนอนจะชอนใบข้าว เห็นเป็นรอยแผ่นสีขาวขุ่น มัว ขนานกับเส้นใบ นาข้าวที่ถูกทำลายรุนแรง ใบข้าวจะแห้งและกลายเป็นสัน้ำตาล เหมือนถูกไฟไหม้` },
            { disease_name: 'โรคกาบใบแห้ง', symptom: `พบในข้าวระยะแตกกอถึงระยะใกล้เก็บเกี่ยว ต้นข้าวที่แตกกอมากเบียดแน่น โรคนี้จะรุนแรง ลักษณะแผลสีเขียวปนเทา ขอบแผลมีสีนํ้าตาลไหม้ ขนาด1-4 x 2-10 มิลลิเมตรปรากฏตามกาบใบใกล้ระดับน้ำ แผลจะขยายใหญ่จนลุกลามขยายขึ้นถึงใบข้าวเชื้อราอาศัยอยู่ได้นานในตอซังวัชพืชในนา ดินนาและแหล่งน้ำ สามารถมีชีวิตข้ามฤดูหมุนเวียนทำลายข้าวได้ตลอดฤดูการทำนา` },
            { disease_name: 'ใบข้าวสมบูรณ์', symptom: ` ` }
        ]);
    }
}
async function seedDeficiencySolutions() {
    const { data, error } = await supabase.from('DeficiencySolutions').select('id').limit(1);
    if (error) {
        console.error('❌ Error checking Users:', error);
        return;
    }
    if (data.length == 0) {
        await supabase.from('DeficiencySolutions').insert([
            { disease_id: 1, solution_text: 'คลุกเมล็ดพันธุ์ก่อนปลูกด้วยสารป้องกันกำจัดเชื้อรา เช่น แมนโคเซบ หรือ คาร์เบนดาซิม+แมนโคเซบ อัตรา 3 กรัมต่อเมล็ด 1 กิโลกรัม' },
            { disease_id: 1, solution_text: 'กำจัดวัชพืชในนา ดูแลแปลงให้สะอาด และใส่ปุ๋ยในอัตราที่เหมาะสม' },
            { disease_id: 2, solution_text: 'ใช้พันธุ์ข้าวที่ต้านทาน เช่น พันธุ์สุพรรณบุรี 60 สุพรรณบุรี 90 สุพรรณบุรี 1 สุพรรณบุรี 2 กข7 และ กข23' },
            { disease_id: 2, solution_text: 'เมื่อเริ่มพบอาการของโรคบนใบข้าว ให้ใช้สารป้องกันกำจัดโรคพืช เช่น ไอโซโพรไทโอเลน คอปเปอร์ไฮดรอกไซด์ เสตร็พโตมัยซินซัลเฟต+ออกซีเตทตราไซคลินไฮโดรคลอร์ไรด์ ไตรเบซิคคอปเปอร์ซัลเฟต อัตราตามคำแนะนำในฉลาก' },
            { disease_id: 3, solution_text: 'ใช้พันธุ์ข้าวต้านทานแมลงเพลี้ยจักจั่นสีเขียว เช่น กข1 กข3' },
            { disease_id: 3, solution_text: 'กำจัดวัชพืช และพืชอาศัยของเชื้อไวรัสและแมลงพาหะนำโรค' },
            { disease_id: 3, solution_text: 'พ่นสารกำจัดแมลงในระยะที่เป็นตัวอ่อน เช่น ไดโนทีฟูเรน หรือ บูโพรเฟซิน หรือ อีโทเฟนพรอกซ' },
            { disease_id: 4, solution_text: 'ใช้พันธุ์ต้านทานที่เหมาะสมแต่ละท้องที่ ปัจจุบันพันธุ์ที่ค่อนข้างต้านทาน ได้แก่ กข1 กข9 กข11 และ กข21 สุพรรณบุรี 60 สุพรรณบุรี 90' },
            { disease_id: 4, solution_text: 'อย่าตกกล้าหนาแน่น แบ่งแปลงให้มีการระบายถ่ายเทอากาศดี และอย่าใส่ปุ๋ย ไนโตรเจนสูงเกินไป' },
            { disease_id: 4, solution_text: 'ใช้สารป้องกันกำจัดโรคพืชเพื่อหยุดยั้งการแพร่ระบาด - คลุกเมล็ดด้วยสารป้องกันกำจัดเชื้อรา เช่น คาซูกะมัยซัน คาร์เบนดาซิมโปรคลอลาส อัตราตามคำแนะนำในฉลาก - ในแหล่งที่มีโรคระบาด ควรพ่นสารป้องกันกำจัดโรคพืชอัตราตามคำแนะนำในฉลาก เช่น คาซูกะมัยซัน คาร์เบนดาซิม อีดิเฟนฟอส' },
            { disease_id: 5, solution_text: 'ใช้พันธุ์ข้าวต้านทาน เช่น ในภาคตะวันออกเฉียงเหนือใช้ หางยี 71' },
            { disease_id: 5, solution_text: 'กำจัดพืชอาศัยของเชื้อราสาเหตุโรค เช่น หญ้าชันกาด และหญ้าขน' },
            { disease_id: 5, solution_text: 'ในแหล่งที่เคยมีโรคระบาด หรือพบแผลลักษณะอาการดังที่กล่าวข้างต้นบนใบข้าวจำนวนมาก ในระยะข้าวแตกกอ ควรฉีดพ่นสารป้องกันกำจัดโรคพืช เช่น ไธโอฟาเนทเมทิล โพรพิโคนาโซล ตามอัตราที่ระบุ' },
            { disease_id: 6, solution_text: 'ใช้พันธุ์ต้านทานที่เหมาะสมเฉพาะท้องที่ เช่น ภาคใต้ใช้พันธุ์แก่นจันทร์ดอกพะยอม' },
            { disease_id: 6, solution_text: 'ใช้ปุ๋ยโปแตสเซียมคลอไรด์ (0-0-60) อัตรา 5 - 10 กิโลกรัมต่อไร่ สามารถช่วยลดความรุนแรงของโรคได้' },
            { disease_id: 6, solution_text: 'กรณีที่เกิดการระบาดของโรครุนแรงในระยะข้าวตั้งท้อง อาจใช้สารป้องกันกำจัดเชื้อราเช่น คาร์เบนดาซิม อัตราตามคำแนะนำในฉลาก' },
            { disease_id: 7, solution_text: 'หมั่นสำรวจแปลงนาอย่างสม่ำเสมอ' },
            { disease_id: 7, solution_text: 'กำจัดวัชพืชรอบ ๆ แปลงนา' },
            { disease_id: 7, solution_text: 'ไม่ควรใช้ปุ๋ยไนโตรเจนมากเกินไป' },
            { disease_id: 7, solution_text: 'เมื่อเริ่มพบ พ่นเชื้อราเมตาไรเซียม อัตรา 250 กรัม ผสมน้ำ 20 ลิตร พ่นในช่วงที่มีความชื้นสัมพันธ์สูง และพ่นให้เชื้อราสัมผัสกับตัวแมลงมากที่สุด โดยพ่นทุก 3-7 วัน' },
            { disease_id: 7, solution_text: 'หากมีการระบาดรุนแรง ให้ใช้สารเคมีป้องกันกำจัดแมลง ดังนี้ สารเคมีกลุ่ม 2B ได้แก่ ฟิโพรนิล และสารเคมีกลุ่ม 4A เช่น ไทอะมีทอกแซม อิมิดาโคลพริด โคลไทอะนิดิน เป็นต้น ในอัตราส่วนตามคำแนะนำในฉลาก' },
            { disease_id: 8, solution_text: 'ใช้พันธุ์ข้าวต้านทาน เช่น กข13 กข7 สุพรรณบุรี 60 เป็นต้น' },
            { disease_id: 8, solution_text: 'หลังเก็บเกี่ยวข้าวควรเผาตอซังเพื่อทำลายเมล็ดขยายพันธุ์ของเชื้อรา' },
            { disease_id: 8, solution_text: 'กำจัดวัชพืชตามคันนาและแหล่งนํ้า เพื่อลดโอกาสการฟักตัวและเป็นแหล่งสะสมของเชื้อสาเหตุโรค' },
            { disease_id: 8, solution_text: 'ใช้ชีวภัณฑ์ บาซิลลัส ซับทิลิส (เชื้อแบคทีเรียปฏิปักษ์) อัตราตามคำแนะนำในฉลาก' },
            { disease_id: 8, solution_text: 'ใช้สารป้องกันกำจัดเชื้อรา เช่น วาลิดามัยซิน โพรพิโคนาโซล เพนไชคูรอนอัตราตามคำแนะนำในฉลาก โดยพ่นบริเวณที่เริ่มพบโรคระบาด ไม่จำเป็นต้องพ่นทั้งแปลงนา เพราะโรคกาบใบแห้งจะเกิดเป็นหย่อมๆ' },
        ]);
    }
}
async function seedUsers() {
    const usersData = [
        {
            email: 'wichitchai63@gmail.com',
            password: '123456',
            display_name: 'User1',
            phone: '0800000000',
            role_id: 1
        },
        {
            email: 'b6512194@g.sut.ac.th',
            password: '123456789',
            display_name: 'User2',
            phone: '0900000000',
            role_id: 2
        }
    ];
    for (const u of usersData) {
        // 1. list users จาก auth
        const { data: userList, error: listError } = await supabase.auth.admin.listUsers({
            page: 1,
            perPage: 1000
        });
        if (listError) {
            //console.error(`Error listing users:`, listError);
            continue;
        }
        let authUserId = null;
        const existingAuth = userList.users.find(user => user.email === u.email);
        if (existingAuth) {
            // ใช้ uid เดิมของ auth.users
            authUserId = existingAuth.id;
        }
        else {
            // ยังไม่มี user ใน auth → สร้างใหม่
            const { data: signUpData, error: signUpError } = await supabase.auth.admin.createUser({
                email: u.email,
                password: u.password,
                user_metadata: {
                    display_name: u.display_name,
                    phone: u.phone
                }
            });
            if (signUpError || !signUpData.user) {
                //console.error(`Error creating auth user for ${u.email}:`, signUpError);
                continue;
            }
            authUserId = signUpData.user.id;
        }
        // 2. insert หรือ update ลง public.Users
        const { error: upsertError } = await supabase
            .from('Users')
            .upsert([{ user_id: authUserId, role_id: u.role_id }], { onConflict: 'user_id' } // ป้องกันซ้ำ
        );
        if (upsertError) {
            //console.error(`Error upserting into public.Users for ${u.email}:`, upsertError);
            continue;
        }
        //console.log(`Synced user: ${u.email}`);
    }
}
async function seedRegions() {
    const { data, error } = await supabase.from('Region').select('id').limit(1);
    if (error) {
        console.error('❌ Error checking Users:', error);
        return;
    }
    if (data.length == 0) {
        await supabase.from('Region').insert([
            { region_name: 'ภาคเหนือ' },
            { region_name: 'ภาคตะวันออกเฉียงเหนือ' },
            { region_name: 'ภาคกลาง' },
            { region_name: 'ภาคตะวันออก' },
            { region_name: 'ภาคตะวันตก' },
            { region_name: 'ภาคใต้' },
        ]);
    }
}
async function seedProvinces() {
    const { data, error } = await supabase.from('Provinces').select('id').limit(1);
    if (error) {
        console.error('❌ Error checking Provinces:', error);
        return;
    }
    if (data.length == 0) {
        const provinces = [
            // 🟦 ภาคกลาง (id=3)
            { province_name: 'กรุงเทพมหานคร', region_id: 3 },
            { province_name: 'ชัยนาท', region_id: 3 },
            { province_name: 'นครนายก', region_id: 3 },
            { province_name: 'นครปฐม', region_id: 3 },
            { province_name: 'นนทบุรี', region_id: 3 },
            { province_name: 'ปทุมธานี', region_id: 3 },
            { province_name: 'พระนครศรีอยุธยา', region_id: 3 },
            { province_name: 'ลพบุรี', region_id: 3 },
            { province_name: 'สมุทรปราการ', region_id: 3 },
            { province_name: 'สมุทรสงคราม', region_id: 3 },
            { province_name: 'สมุทรสาคร', region_id: 3 },
            { province_name: 'สระบุรี', region_id: 3 },
            { province_name: 'สิงห์บุรี', region_id: 3 },
            { province_name: 'อ่างทอง', region_id: 3 },
            { province_name: 'อุทัยธานี', region_id: 3 },
            // 🟥 ภาคเหนือ (id=1)
            { province_name: 'เชียงใหม่', region_id: 1 },
            { province_name: 'เชียงราย', region_id: 1 },
            { province_name: 'ลำพูน', region_id: 1 },
            { province_name: 'ลำปาง', region_id: 1 },
            { province_name: 'พะเยา', region_id: 1 },
            { province_name: 'น่าน', region_id: 1 },
            { province_name: 'แพร่', region_id: 1 },
            { province_name: 'แม่ฮ่องสอน', region_id: 1 },
            { province_name: 'ตาก', region_id: 1 },
            { province_name: 'สุโขทัย', region_id: 1 },
            { province_name: 'พิษณุโลก', region_id: 1 },
            { province_name: 'อุตรดิตถ์', region_id: 1 },
            { province_name: 'เพชรบูรณ์', region_id: 1 },
            { province_name: 'พิจิตร', region_id: 1 },
            { province_name: 'กำแพงเพชร', region_id: 1 },
            { province_name: 'นครสวรรค์', region_id: 1 },
            // 🟨 ภาคอีสาน (id=2)
            { province_name: 'กาฬสินธุ์', region_id: 2 },
            { province_name: 'ขอนแก่น', region_id: 2 },
            { province_name: 'ชัยภูมิ', region_id: 2 },
            { province_name: 'นครพนม', region_id: 2 },
            { province_name: 'นครราชสีมา', region_id: 2 },
            { province_name: 'บึงกาฬ', region_id: 2 },
            { province_name: 'บุรีรัมย์', region_id: 2 },
            { province_name: 'มหาสารคาม', region_id: 2 },
            { province_name: 'มุกดาหาร', region_id: 2 },
            { province_name: 'ยโสธร', region_id: 2 },
            { province_name: 'ร้อยเอ็ด', region_id: 2 },
            { province_name: 'ศรีสะเกษ', region_id: 2 },
            { province_name: 'สกลนคร', region_id: 2 },
            { province_name: 'สุรินทร์', region_id: 2 },
            { province_name: 'หนองคาย', region_id: 2 },
            { province_name: 'หนองบัวลำภู', region_id: 2 },
            { province_name: 'อำนาจเจริญ', region_id: 2 },
            { province_name: 'อุดรธานี', region_id: 2 },
            { province_name: 'อุบลราชธานี', region_id: 2 },
            // 🟩 ภาคตะวันออก (id=4)
            { province_name: 'จันทบุรี', region_id: 4 },
            { province_name: 'ฉะเชิงเทรา', region_id: 4 },
            { province_name: 'ชลบุรี', region_id: 4 },
            { province_name: 'ตราด', region_id: 4 },
            { province_name: 'ปราจีนบุรี', region_id: 4 },
            { province_name: 'ระยอง', region_id: 4 },
            { province_name: 'สระแก้ว', region_id: 4 },
            // 🟫 ภาคตะวันตก (id=5)
            { province_name: 'กาญจนบุรี', region_id: 5 },
            { province_name: 'ประจวบคีรีขันธ์', region_id: 5 },
            { province_name: 'เพชรบุรี', region_id: 5 },
            { province_name: 'ราชบุรี', region_id: 5 },
            { province_name: 'สุพรรณบุรี', region_id: 5 },
            // ⬛ ภาคใต้ (id=6)
            { province_name: 'กระบี่', region_id: 6 },
            { province_name: 'ชุมพร', region_id: 6 },
            { province_name: 'ตรัง', region_id: 6 },
            { province_name: 'นครศรีธรรมราช', region_id: 6 },
            { province_name: 'นราธิวาส', region_id: 6 },
            { province_name: 'ปัตตานี', region_id: 6 },
            { province_name: 'พังงา', region_id: 6 },
            { province_name: 'พัทลุง', region_id: 6 },
            { province_name: 'ภูเก็ต', region_id: 6 },
            { province_name: 'ระนอง', region_id: 6 },
            { province_name: 'สงขลา', region_id: 6 },
            { province_name: 'สตูล', region_id: 6 },
            { province_name: 'สุราษฎร์ธานี', region_id: 6 },
            { province_name: 'ยะลา', region_id: 6 },
        ];
        await supabase.from('Provinces').insert(provinces);
    }
}
async function seedRiceVariety() {
    const { data, error } = await supabase.from('RiceVariety').select('id').limit(1);
    if (error) {
        console.error('❌ Error checking RiceVariety :', error);
        return;
    }
    if (data.length == 0) {
        await supabase.from('RiceVariety').insert([
            { name_th: 'สุพรรณบุรี 60',
                name_en: 'Suphan Buri 60',
                type: 'ข้าวเจ้า',
                recommended_area: 'เขตชลประทานภาคกลาง ภาคตะวันตก และภาคตะวันออก',
                average_yield: '700 กิโลกรัมต่อไร่' }, //1
            { name_th: 'สุพรรณบุรี 90',
                name_en: 'Suphan Buri 90',
                type: 'ข้าวเจ้า',
                recommended_area: 'ภาคกลาง โดยเฉพาะอย่างยิ่งในแหล่งที่มีการระบาดของ เพลี้ยกระโดดสีน้ำตาล โรคใบหงิก โรคใบสีส้ม และโรคไหม้',
                average_yield: '600 กิโลกรัมต่อไร่' }, //2
            { name_th: 'สุพรรณบุรี 1',
                name_en: 'Suphan Buri 1',
                type: 'ข้าวเจ้า',
                recommended_area: 'ทุกภาคในเขตชลประทาน',
                average_yield: '806 กิโลกรัมต่อไร่' }, //3
            { name_th: 'สุพรรณบุรี 2',
                name_en: 'Suphan Buri 2',
                type: 'ข้าวเจ้า',
                recommended_area: 'เขตพื้นที่ปลูกข้าวนาชลประทานของภาคกลาง ภาคตะวันออก และ ภาคตะวันตก',
                average_yield: '700 กิโลกรัมต่อไร่' }, //4
            { name_th: 'กข7',
                name_en: 'RD7',
                type: 'ข้าวเจ้า',
                recommended_area: 'ทุกภาคที่มีการชลประทาน',
                average_yield: '672 กิโลกรัมต่อไร่' }, //5
            { name_th: 'กข23',
                name_en: 'RD23',
                type: 'ข้าวเจ้า',
                recommended_area: 'ทุกภาคในเขตนาชลประทาน',
                average_yield: '800 กิโลกรัมต่อไร่' }, //6
            { name_th: 'กข1',
                name_en: 'RD1',
                type: 'ข้าวเจ้า',
                recommended_area: 'ทุกภาคที่มีการนาชลประทาน',
                average_yield: '742 กิโลกรัมต่อไร' }, //7
            { name_th: 'กข3',
                name_en: 'RD3',
                type: 'ข้าวเจ้า',
                recommended_area: 'ทุกภาคในเขตชลประทาน',
                average_yield: '667 กิโลกรัมต่อไร่' }, //8
            { name_th: 'กข9',
                name_en: 'RD9',
                type: 'ข้าวเจ้า',
                recommended_area: 'ทุกภาคที่มีการนาชลประทาน',
                average_yield: '657 กิโลกรัมต่อไร่' }, //9
            { name_th: 'กข11',
                name_en: 'RD11',
                type: 'ข้าวเจ้า',
                recommended_area: 'ทุกภาคในเขตนาชลประทาน',
                average_yield: '700 กิโลกรัมต่อไร่' }, //10
            { name_th: 'กข21',
                name_en: 'RD21',
                type: 'ข้าวเจ้า',
                recommended_area: 'ทุกภาคในเขตนาชลประทาน',
                average_yield: '700 กิโลกรัมต่อไร่' }, //11
            { name_th: 'หางยี 71',
                name_en: 'Hahng Yi 71',
                type: 'ข้าวเหนียว',
                recommended_area: 'ภาคตะวันออกเฉียงเหนือ',
                average_yield: '506 กิโลกรัมต่อไร่' }, //12
            { name_th: 'แก่นจันทร์',
                name_en: 'Gaen Jan',
                type: 'ข้าวเจ้า',
                recommended_area: 'นาน้ำฝนภาคใต้',
                average_yield: '660 กิโลกรัมต่อไร่' }, //13
            { name_th: 'กข13',
                name_en: 'RD13',
                type: 'ข้าวเจ้า',
                recommended_area: 'ภาคใต้',
                average_yield: '450 กิโลกรัมต่อไร่' }, //14
        ]);
    }
}
async function seedMorphology() {
    const { data, error } = await supabase.from('Morphology').select('id').limit(1);
    if (error) {
        console.error('❌ Error checking Morphology :', error);
        return;
    }
    if (data.length == 0) {
        await supabase.from('Morphology').insert([
            { characteristic: 'สูงประมาณ 133 เซนติเมตร', variety_id: 1 },
            { characteristic: 'ไม่ไวต่อช่วงแสง', variety_id: 1 },
            { characteristic: 'ใบสีเขียวเข้ม ทรงกอตั้ง รวงแน่น ระแง้ถี่ คอรวงสั้น เมล็ดรูปร่างเรียว ยาว ท้องไข่น้อย', variety_id: 1 },
            { characteristic: 'ระยะพักตัวของเมล็ดประมาณ 4 สัปดาห์', variety_id: 1 },
            { characteristic: 'เมล็ดข้าวเปลือก ยาว x กว้าง x หนา = 10.4 x 2.5 x 2.0 มิลลิเมตร', variety_id: 1 },
            { characteristic: 'เมล็ดข้าวกล้อง ยาว x กว้าง x หนา = 7.5 x 2.2 x 1.8 มิลลิเมตร', variety_id: 1 },
            { characteristic: 'ปริมาณอมิโลส 23 -25 %', variety_id: 1 },
            { characteristic: 'คุณภาพข้าวสุก ร่วน นุ่ม', variety_id: 1 },
            { characteristic: 'สูงประมาณ 120 เซนติเมตร', variety_id: 2 },
            { characteristic: 'ไม่ไวต่อช่วงแสง', variety_id: 2 },
            { characteristic: 'อายุเก็บเกี่ยว ประมาณ 120 วัน', variety_id: 2 },
            { characteristic: 'ทรงกอตั้ง ใบสีเขียวเข้ม ใบธงยาว ค่อนข้างตั้งตรง', variety_id: 2 },
            { characteristic: 'คอรวงยาว รวงยาว แน่น ระแง้ถี่ ต้นแข็ง เมล็ดยาวเรียว', variety_id: 2 },
            { characteristic: 'เมล็ดข้าวเปลือก ยาว x กว้าง x หนา = 10.1 x 2.7 x 2.0 มิลลิเมตร', variety_id: 2 },
            { characteristic: 'เมล็ดข้าวกล้อง ยาว x กว้าง x หนา = 7.4 x 2.2 x 1.8 มิลลิเมตร', variety_id: 2 },
            { characteristic: 'ปริมาณอมิโลส 25-28 %', variety_id: 2 },
            { characteristic: 'คุณภาพข้าวสุก ร่วน แข็ง', variety_id: 2 },
            { characteristic: 'สูงประมาณ 125 เซนติเมตร', variety_id: 3 },
            { characteristic: 'ไม่ไวต่อช่วงแสง', variety_id: 3 },
            { characteristic: 'อายุเก็บเกี่ยว ประมาณ 120 วัน', variety_id: 3 },
            { characteristic: 'ทรงกอตั้ง ต้นแข็งไม่ล้ม ใบสีเขียวเข้ม มีขน กาบใบและปล้องสีเขียว ใบธงยาวค่อนข้างตั้งตรง คอรวงยาว รวงค่อนข้างแน่น', variety_id: 3 },
            { characteristic: 'เมล็ดข้าวเปลือกสีฟาง', variety_id: 3 },
            { characteristic: 'ระยะพักตัวของเมล็ดประมาณ 22 วัน', variety_id: 3 },
            { characteristic: 'เมล็ดข้าวเปลือก ยาว x กว้าง x หนา = 10.0 x 2.4 x 2.0 มิลลิเมตร', variety_id: 3 },
            { characteristic: 'เมล็ดข้าวกล้อง ยาว x กว้าง x หนา = 7.3 x 2.2 x 1.8 มิลลิเมตร', variety_id: 3 },
            { characteristic: 'ปริมาณอมิโลส 29 %', variety_id: 3 },
            { characteristic: 'คุณภาพข้าวสุก ร่วน แข็ง', variety_id: 3 },
            { characteristic: 'สูงประมาณ 122 เซนติเมตร', variety_id: 4 },
            { characteristic: 'ไม่ไวต่อช่วงแสง', variety_id: 4 },
            { characteristic: 'อายุเก็บเกี่ยว ประมาณ 115 วัน', variety_id: 4 },
            { characteristic: 'ทรงกอตั้ง ใบสีเขียวมีขน การแก่ของใบปานกลาง กาบใบและปล้องสีเขียว ใบธงยาวปานกลางและค่อนข้างตั้งตรง คอรวงยาว รวงยาว ระแง้ค่อนข้างถี่', variety_id: 4 },
            { characteristic: 'เมล็ดข้าวเปลือกสีฟาง มีขน', variety_id: 4 },
            { characteristic: 'ระยะพักตัวของเมล็ดประมาณ 6 สัปดาห์', variety_id: 4 },
            { characteristic: 'เมล็ดข้าวเปลือก ยาว x กว้าง x หนา = 9.9 x 2.5 x 2.0 มิลลิเมตร', variety_id: 4 },
            { characteristic: 'เมล็ดข้าวกล้อง ยาว x กว้าง x หนา = 7.3 x 2.2 x 1.8 มิลลิเมตร', variety_id: 4 },
            { characteristic: 'ปริมาณอมิโลส 22-23 %', variety_id: 4 },
            { characteristic: 'คุณภาพข้าวสุก ร่วน นุ่ม', variety_id: 4 },
            { characteristic: 'สูงประมาณ 115 เซนติเมตร', variety_id: 5 },
            { characteristic: 'ไม่ไวต่อช่วงแสง', variety_id: 5 },
            { characteristic: 'อายุเก็บเกี่ยวประมาณ 125 วัน', variety_id: 5 },
            { characteristic: 'เมล็ดข้าวเปลือกสีฟาง', variety_id: 5 },
            { characteristic: 'ท้องไข่น้อย', variety_id: 5 },
            { characteristic: 'ระยะพักตัวของเมล็ดประมาณ 1 สัปดาห์', variety_id: 5 },
            { characteristic: 'เมล็ดข้าวเปลือก ยาว x กว้าง x หนา =9.7 x 2.7 x 2.0 มิลลิเมตร', variety_id: 5 },
            { characteristic: 'เมล็ดข้าวกล้อง ยาว x กว้าง x หนา = 7.2 x 2.3 x 1.8 มิลลิเมตร', variety_id: 5 },
            { characteristic: 'ปริมาณอมิโลส 24-28 %', variety_id: 5 },
            { characteristic: 'คุณภาพข้าวสุก ร่วน นุ่ม', variety_id: 5 },
            { characteristic: 'สูงประมาณ 115-120 เซนติเมตร', variety_id: 6 },
            { characteristic: 'ไม่ไวต่อช่วงแสง', variety_id: 6 },
            { characteristic: 'อายุเก็บเกี่ยว ประมาณ 125 วัน', variety_id: 6 },
            { characteristic: 'ไม่ไวต่อช่วงแสง', variety_id: 6 },
            { characteristic: 'ลำต้นและใบมีสีเขียวอ่อน ใบธงตั้ง และค่อนข้างยาว รวงอยู่ใต้ใบ แตกกอดี', variety_id: 6 },
            { characteristic: 'ข้าวเปลือกสีฟาง', variety_id: 6 },
            { characteristic: 'ระยะพักตัวของเมล็ดประมาณ 5 สัปดาห์', variety_id: 6 },
            { characteristic: 'ท้องไข่น้อย', variety_id: 6 },
            { characteristic: 'ปริมาณอมิโลส 25-30 %', variety_id: 6 },
            { characteristic: 'คุณภาพข้าวสุก ร่วน นุ่ม', variety_id: 6 },
            { characteristic: 'เมล็ดข้าวเปลือก ยาว x กว้าง x หนา = 9.9 x 2.5 x 2.0 มิลลิเมตร', variety_id: 6 },
            { characteristic: 'เมล็ดข้าวกล้อง ยาว x กว้าง x หนา = 7.3 x 2.2 x 1.8 มิลลิเมตร', variety_id: 6 },
            { characteristic: 'สูงประมาณ 115 เซนติเมตร', variety_id: 7 },
            { characteristic: 'ไม่ไวต่อช่วงแสง', variety_id: 7 },
            { characteristic: 'อายุเก็บเกี่ยวประมาณ 130 วัน', variety_id: 7 },
            { characteristic: 'ลําต้นและใบสีเขียวอ่อน ใบธงตั้งตรง เมล็ดเรียวยาว', variety_id: 7 },
            { characteristic: 'เมล็ดข้าวเปลือกสีฟาง', variety_id: 7 },
            { characteristic: 'ท้องไข่น้อย', variety_id: 7 },
            { characteristic: 'ระยะพักตัวของเมล็ดประมาณ 3 สัปดาห์', variety_id: 7 },
            { characteristic: 'เมล็ดข้าวเปลือก ยาว x กว้าง x หนา = 10.0 x 2.5 x 2.0 มิลลิเมตร', variety_id: 7 },
            { characteristic: 'เมล็ดข้าวกล้อง ยาว x กว้าง x หนา = 7.1 x 2.2 x 1.8 มิลลิเมตร', variety_id: 7 },
            { characteristic: 'ปริมาณอมิโลส 29-30%', variety_id: 7 },
            { characteristic: 'คุณภาพข้าวสุกร่วน แข็ง', variety_id: 7 },
            { characteristic: 'สูงประมาณ 100 เซนติเมตร', variety_id: 8 },
            { characteristic: 'ไม่ไวต่อช่วงแสง', variety_id: 8 },
            { characteristic: 'ลําต้นและใบสีเขียว เมล็ดเรียวยาว', variety_id: 8 },
            { characteristic: 'เมล็ดข้าวเปลือกสีนํ้าตาล', variety_id: 8 },
            { characteristic: 'อายุเก็บเกี่ยวประมาณ 128 วัน', variety_id: 8 },
            { characteristic: 'ระยะพักตัวของเมล็ดประมาณ 3 สัปดาห์', variety_id: 8 },
            { characteristic: 'เมล็ดข้าวเปลือก ยาว x กว้าง x หนา = 10.3 x 2.7 x 2.0 มิลลิเมตร', variety_id: 8 },
            { characteristic: 'เมล็ดข้าวกล้อง ยาว x กว้าง x หนา = 7.2 x 2.2 x 1.8 มิลลิเมตร', variety_id: 8 },
            { characteristic: 'ท้องไข่น้อย', variety_id: 8 },
            { characteristic: 'ปริมาณอมิโลส 29-31%', variety_id: 8 },
            { characteristic: 'คุณภาพข้าวสุกร่วน แข็ง', variety_id: 8 },
            { characteristic: 'สูงประมาณ 105 เซนติเมตร', variety_id: 9 },
            { characteristic: 'ไม่ไวต่อช่วงแสง', variety_id: 9 },
            { characteristic: 'ทรงกอตั้งตรง สีเขียวเข้ม ฟางแข็งไม่ล้มง่าย', variety_id: 9 },
            { characteristic: 'เมล็ดข้าวเปลือกสีฟาง', variety_id: 9 },
            { characteristic: 'อายุเก็บเกี่ยวประมาณ 115-125 วัน', variety_id: 9 },
            { characteristic: 'ท้องไข่น้อย', variety_id: 9 },
            { characteristic: 'ระยะพักตัวของเมล็ดพันธุ์ประมาณ 5 สัปดาห์', variety_id: 9 },
            { characteristic: 'เมล็ดข้าวเปลือก ยาว x กว้าง x หนา = 10.0 x 2.7 x 2.0 มิลลิเมตร', variety_id: 9 },
            { characteristic: 'เมล็ดข้าวกล้อง ยาว x กว้าง x หนา = 7.2 x 2.3 x 1.8 มิลลิเมตร', variety_id: 9 },
            { characteristic: 'ปริมาณอมิโลส 29-31 %', variety_id: 9 },
            { characteristic: 'คุณภาพข้าวสุก ร่วน แข็ง', variety_id: 9 },
            { characteristic: 'สูงประมาณ 115 เซนติเมตร', variety_id: 10 },
            { characteristic: 'ไม่ไวต่อช่วงแสง', variety_id: 10 },
            { characteristic: 'ทรงกอตั้งตรงสีเขียวเข้ม ฟางแข็ง ใบธงยาวปานกลาง แตกกอมาก', variety_id: 10 },
            { characteristic: 'เมล็ดข้าวเปลือกสีฟาง', variety_id: 10 },
            { characteristic: 'อายุเก็บเกี่ยวประมาณ 135 วัน', variety_id: 10 },
            { characteristic: 'ระยะพักตัวของเมล็ดประมาณ 4 สัปดาห์', variety_id: 10 },
            { characteristic: 'เมล็ดข้าวเปลือก ยาว x กว้าง x หนา = 10.9 x 2.6 x 2.1 มิลลิเมตร', variety_id: 10 },
            { characteristic: 'เมล็ดข้าวกล้อง ยาว x กว้าง x หนา = 7.6 x 2.37 x 1.8 มิลลิเมตร', variety_id: 10 },
            { characteristic: 'ปริมาณอมิโลส 29-32 %', variety_id: 10 },
            { characteristic: 'คุณภาพข้าวสุก ร่วน แข็ง', variety_id: 10 },
            { characteristic: 'เมล็ดร่วงยาก', variety_id: 10 },
            { characteristic: 'สูงประมาณ 100-125 เซนติเมตร', variety_id: 11 },
            { characteristic: 'ไม่ไวต่อช่วงแสง', variety_id: 11 },
            { characteristic: 'อายุเก็บเกี่ยวประมาณ 120-130 วัน', variety_id: 11 },
            { characteristic: 'ลำต้นใหญ่ แต่ค่อนข้างอ่อน รวงแน่น อยู่ใต้ใบธง', variety_id: 11 },
            { characteristic: 'เมล็ดข้าวเปลือกสีฟางกระน้ำตาล', variety_id: 11 },
            { characteristic: 'ระยะพักตัวของเมล็ดประมาณ 4 สัปดาห์', variety_id: 11 },
            { characteristic: 'ท้องไข่น้อย', variety_id: 11 },
            { characteristic: 'เมล็ดข้าวเปลือก ยาว x กว้าง x หนา = 10.2 x 2.7 x 2.0 มิลลิเมตร', variety_id: 11 },
            { characteristic: 'เมล็ดข้าวกล้อง ยาว x กว้าง x หนา = 7.3 x 2.3 x 1.8 มิลลิเมตร', variety_id: 11 },
            { characteristic: 'ปริมาณอมิโลส 17-20 %', variety_id: 11 },
            { characteristic: 'คุณภาพข้าวสุก นุ่ม', variety_id: 11 },
            { characteristic: 'สูงประมาณ 152 เซนติเมตร', variety_id: 12 },
            { characteristic: 'ไวต่อช่วงแสง ปลูกได้เฉพาะฤดูนาป', variety_id: 12 },
            { characteristic: 'ลําต้นสีเขียว ใบแคบ และยาว สีเขียวเข้มรวงอ่อนมีระแง้แผ่ออกคล้ายตีนนก', variety_id: 12 },
            { characteristic: 'เมล็ดข้าวยาวเรียว', variety_id: 12 },
            { characteristic: 'ข้าวเปลือกสีนําตาล', variety_id: 12 },
            { characteristic: 'อายุเก็บเกียว ประมาณ 4 พฤศจิกายน', variety_id: 12 },
            { characteristic: 'ระยะพักตัวของเมล็ด ประมาณ 1 สัปดาห', variety_id: 12 },
            { characteristic: 'เมล็ดข้าวเปลือก ยาว xกว้าง x หนา = 10.2 x 2.8 x 2.0 มิลลิเมตร', variety_id: 12 },
            { characteristic: 'เมล็ดข้าวกล้อง ยาว xกว้าง x หนา = 7.1 x 2.1 x 1.8 มิลลิเมตร', variety_id: 12 },
            { characteristic: 'คุณภาพข้าวสุก เหนียวนุ่ม', variety_id: 12 },
            { characteristic: 'สูงประมาณ 165 เซนติเมตร', variety_id: 13 },
            { characteristic: 'ไวต่อช่วงแสง', variety_id: 13 },
            { characteristic: 'อายุเก็บเกี่ยวประมาณปลายเดือนมกราคมถึงปลายเดือนกุมภาพันธ์', variety_id: 13 },
            { characteristic: 'ลักษณะทรงกอแบะ ต้นแข็ง ใบสีเขียว ใบธงเอน รวงยาวมาก ระแง้ถี่', variety_id: 13 },
            { characteristic: 'เมล็ดข้าวเปลือกสีฟาง', variety_id: 13 },
            { characteristic: 'ระยะพักตัว ประมาณ 5-6 สัปดาห์', variety_id: 13 },
            { characteristic: 'เมล็ดข้าวเปลือกยาว x กว้าง x หนา =10.3 x 2.6 x1.9 มิลลิเมตร', variety_id: 13 },
            { characteristic: 'เมล็ดข้าวกล้อง ยาว x กว้าง x หนา = 7.06 x 2.16 x 1.58 มิลลิเมตร', variety_id: 13 },
            { characteristic: 'ปริมาณอมิโลส 30-31%', variety_id: 13 },
            { characteristic: 'คุณภาพข้าวสุก ร่วน', variety_id: 13 },
            { characteristic: 'สูงประมาณ 160 เซนติเมตร', variety_id: 14 },
            { characteristic: 'ไวต่อช่วงแสง', variety_id: 14 },
            { characteristic: 'ลำต้นตั้งตรง สีเขียว ใบธงตก ชูรวงอยู่เหนือใบ ระแง้ถี่', variety_id: 14 },
            { characteristic: 'อายุเก็บเกี่ยวประมาณ 26 กุมภาพันธ์', variety_id: 14 },
            { characteristic: 'เมล็ดข้าวเปลือกสีน้ำตาล', variety_id: 14 },
            { characteristic: 'ท้องไข่ปานกลาง', variety_id: 14 },
            { characteristic: 'ระยะพักตัวของเมล็ดประมาณ 3 สัปดาห์', variety_id: 14 },
            { characteristic: 'เมล็ดข้าวกล้อง กว้าง x ยาว x หนา =6.9 x 2.2 x 1.7 มิลลิเมตร', variety_id: 14 },
            { characteristic: 'เมล็ดข้าวเปลือก ยาว x กว้าง x หนา = 9.3 x 2.5 x 1.8 มิลลิเมตร', variety_id: 14 },
            { characteristic: 'ปริมาณอมิโลส 30-33 %', variety_id: 14 },
            { characteristic: 'คุณภาพข้าวสุก ร่วนค่อนข้างแข็ง', variety_id: 14 },
            //{ characteristic: 'เมล็ดร่วงยาก', variety_id: 14},
        ]);
    }
}
async function seedStrength() {
    const { data, error } = await supabase.from('Strengths').select('id').limit(1);
    if (error) {
        console.error('❌ Error checking Strengths :', error);
        return;
    }
    if (data.length == 0) {
        await supabase.from('Strengths').insert([
            { strength: 'ผลผลิตสูง', variety_id: 1 },
            { strength: 'คุณภาพเมล็ดดี', variety_id: 1 },
            { strength: 'คุณภาพการสีดี', variety_id: 1 },
            { strength: 'ตอบสนองต่อปุ๋ยสูง', variety_id: 1 },
            { strength: 'ต้านทานโรคใบสีส้ม และโรคไหม้', variety_id: 1 },
            { strength: 'ต้านทานเพลี้ยกระโดดสีน้ำตาล เพลี้ยจักจั่นสีเขียว', variety_id: 1 },
            { strength: 'ต้านทานโรคไหม้ โรคขอบใบแห้ง และต้านทานโรคใบหงิก และโรคใบสีส้ม ในสภาพธรรมชาติ', variety_id: 2 },
            { strength: 'ต้านทานเพลี้ยกระโดดสีน้ำตาล และเพลี้ยจักจั่นสีเขียว', variety_id: 2 },
            { strength: 'ผลผลิตสูง', variety_id: 3 },
            { strength: 'ตอบสนองต่อการใช้ปุ๋ย', variety_id: 3 },
            { strength: 'ต้านทานโรคไหม้ โรคขอบใบแห้ง และต้านทานโรคใบหงิก และโรคใบสีส้ม ในสภาพธรรมชาติ', variety_id: 3 },
            { strength: 'ต้านทานเพลี้ยกระโดดสีน้ำตาล และเพลี้ยกระโดดหลังขาว', variety_id: 3 },
            { strength: 'อายุเก็บเกี่ยวสั้น', variety_id: 4 },
            { strength: 'ตอบสนองต่อการใช้ปุ๋ยดี', variety_id: 4 },
            { strength: 'คุณภาพการสีดี', variety_id: 4 },
            { strength: 'ต้านทานโรคไหม้ และโรคขอบใบแห้ง ทนทานต่อโรคใบหงิก และ โรคใบสีส้ม ในสภาพธรรมชาติ', variety_id: 4 },
            { strength: 'ต้านทานเพลี้ยกระโดดสีน้ำตาล', variety_id: 4 },
            { strength: 'แตกกอดี ต้นแข็ง ไม่ล้มง่าย', variety_id: 5 },
            { strength: 'ตอบสนองต่อการใช้ปุ๋ยดี', variety_id: 5 },
            { strength: 'คอรวงยาว นวดง่าย เป็นที่นิยมของชาวนาภาคใต้ที่เกี่ยวข้าวด้วยแกระ', variety_id: 5 },
            { strength: 'ทนดินเปรี้ยวได้พอควร', variety_id: 5 },
            { strength: 'ต้านทานต่อโรคขอบใบแห้งดี และต้านทานโรคใบสีส้มปานกลาง', variety_id: 5 },
            { strength: 'ให้ผลผลิตสูง', variety_id: 6 },
            { strength: 'แตกกอดี', variety_id: 6 },
            { strength: 'ต้านทานโรคขอบใบแห้ง โรคใบหงิก', variety_id: 6 },
            { strength: 'เป็นพันธุ์ที่เหมาะสําหรับปลูกในเขตชลประทานคุณภาพการสีดี', variety_id: 7 },
            { strength: 'ตอบสนองต่อการใช้ปุ๋ยในระดับสูง', variety_id: 7 },
            { strength: 'แตกกอดี ลําต้นแข็งไม่ล้มง่าย', variety_id: 7 },
            { strength: 'ข้าวกล้องใส แกร่ง คุณภาพการสีดี', variety_id: 7 },
            { strength: 'ค่อนข้างต้านทานโรคใบจุดสีนํ้าตาล', variety_id: 7 },
            { strength: 'เจริญเติบโตได้ดีในท้องที่ที่มีความอุดมสมบูรณ์ของดินตํ่า เมื่อเทียบกับพันธุ์ กข อื่นๆ', variety_id: 8 },
            { strength: 'ต้นแข็งไม่ล้มง่าย', variety_id: 8 },
            { strength: 'มีรวงซ่อนใต้ใบธง ป้องกันการทําลายของนกได้ดี', variety_id: 8 },
            { strength: 'ต้านทานเพลี้ยจักจั่นสีเขียว', variety_id: 8 },
            { strength: 'ตอบสนองต่อการใช้ปุ๋ยสูง', variety_id: 8 },
            { strength: 'เมล็ดร่วงง่าย', variety_id: 9 },
            { strength: 'การเจริญเติบโตและออกรวงสม่ำเสมอ', variety_id: 9 },
            { strength: 'ไม่ต้านทานโรคขอบใบแห้ง โรคไหม้ และโรคเมล็ดด่าง', variety_id: 9 },
            { strength: 'ไม่ต้านทานโรคเมล็ดด่าง', variety_id: 9 },
            { strength: 'เมล็ดขาวเรียวยาว จัดเป็นข้าว 100 % ชั้นหนึ่ง', variety_id: 10 },
            { strength: 'ตอบสนองต่อการใช้ปุ๋ยดี', variety_id: 10 },
            { strength: 'ต้นแข็งไม่ล้มง่าย', variety_id: 10 },
            { strength: 'เมล็ดข้าวเปลือกมีน้ำหนักต่อถังดี', variety_id: 10 },
            { strength: 'คุณภาพการสีดี ได้เมล็ดข้าวสารใส แกร่ง', variety_id: 10 },
            { strength: 'ต้านทานโรคคอรวงเน่า โรคไหม้ และโรคใบจุดสีน้ำตาล', variety_id: 10 },
            { strength: 'ให้ผลผลิตสูง ทั้งในสภาพที่มีและไม่มีโรคใบหงิกระบาด', variety_id: 11 },
            { strength: 'คุณภาพการสีดี ข้าวสารสวย', variety_id: 11 },
            { strength: 'ต้านทานโรคใบหงิก โรคขอบใบแห้ง', variety_id: 11 },
            { strength: 'ต้านทานเพลี้ยกระโดสีน้ำตาล', variety_id: 11 },
            { strength: 'ต้านทานโรคไหม้', variety_id: 12 },
            { strength: 'ค่อนข้างต้านทานโรคใบจุดสีนําตาล', variety_id: 12 },
            { strength: 'เป็นข้าวต้นสูง อายุเบา เหมาะกับสภาพทีดอนทีน้ำหมดเร็ว', variety_id: 12 },
            { strength: 'ค่อนข้างต้านทานโรคใบหงิก โรคใบขีดสีน้ำตาล และเพลี้ยจักจั่นสีเขียว', variety_id: 13 },
            { strength: 'ให้ผลผลิตสูงกว่าพันธุ์นางพญา 132 ประมาณ 17 %', variety_id: 14 },
            { strength: 'ลักษณะรวงยาว และใหญ่ มีเมล็ดต่อรวงมาก สะดวกต่อการเก็บเกี่ยวด้วยแกระ', variety_id: 14 },
            { strength: 'นวดง่ายกว่าพันธุ์นางพญา 132', variety_id: 14 },
            { strength: 'ระบบรากดี มีความสามารถทนแล้งพอสมควร', variety_id: 14 },
            { strength: 'มีความต้านทานต่อสภาพน้ำลึก', variety_id: 14 },
            { strength: 'ต้านทานโรคไหม้', variety_id: 14 },
            //{ strength: 'โรคใบจุดสีน้ำตาล', variety_id: 14},
        ]);
    }
}
async function seedWeaknesse() {
    const { data, error } = await supabase.from('Weaknesses').select('id').limit(1);
    if (error) {
        console.error('❌ Error checking Weaknesses :', error);
        return;
    }
    if (data.length == 0) {
        await supabase.from('Weaknesses').insert([
            { weaknesse: 'ไม่ต้านทานโรคใบจุดสีน้ำตาล และโรคกาบใบแห้ง', variety_id: 1 },
            { weaknesse: 'พบโรคใบขีดสีน้ำตาลในระยะข้าวออกรวง', variety_id: 2 },
            { weaknesse: 'ออกรวงไม่สม่ำเสมอ', variety_id: 2 },
            { weaknesse: 'ไม่ควรใช้ปุ๋ยไนโตรเจนเกินอัตรา 12 กิโลกรัมไนโตรเจนต่อไร่ เพราะจะทำให้ต้นข้าว อ่อนแอต่อการเข้าทำลายของโรคและแมลง', variety_id: 2 },
            { weaknesse: 'พบโรคใบขีดสีน้ำตาลในระยะออกรวง อาจเป็นสาเหตุของโรคเมล็ดด่างได้', variety_id: 3 },
            { weaknesse: 'ไม่ต้านทานโรคใบขีดสีน้ำตาลระยะออกรวง และโรคกาบใบเน่า ใน สภาพธรรมชาติ', variety_id: 4 },
            { weaknesse: 'ไม่ทนทานอากาศหนาว ถ้าปลูกในฤดูนาปรังของภาคเหนือ และภาคตะวันออกเฉียงเหนือบางท้องที่ จะทำให้เมล็ดลีบมากและผลผลิตค่อนข้างต่ำ', variety_id: 5 },
            { weaknesse: 'ข้าวแตกกอมาก มีลูกข้าวมาก จึงทำให้ข้าวออกดอกไม่สม่ำเสมอ', variety_id: 5 },
            { weaknesse: 'ข้าวร่วงง่าย ทำให้ต้องระมัดระวังในการเก็บเกี่ยวมากขึ้น', variety_id: 5 },
            { weaknesse: 'ไม่ต้านทานต่อโรคไหม้ โรคใบหงิก', variety_id: 5 },
            { weaknesse: 'ไม่ต้านทานเพลี้ยกระโดดสีน้ำตาล เพลี้ยจักจั่นสีเขียว และแมลงบั่ว', variety_id: 5 },
            { weaknesse: 'ไม่ต้านทานโรคใบสีส้ม และโรคไหม้', variety_id: 6 },
            { weaknesse: 'ไม่ต้านทานโรคขอบใบแห้ง โรคใบหงิก โรคใบขีดสีนํ้าตาล โรคใบสีส้ม และโรคไหม', variety_id: 7 },
            { weaknesse: 'ไม่ต้านทานเพลี้ยกระโดดสีนํ้าตาล เพลี้ยจักจั่นสีเขียวหนอนกอ และแมลงบั่ว', variety_id: 7 },
            { weaknesse: 'ไม่ต้านทานโรคใบหงิก โรคคอรวงเน่า และโรคใบจุดสีนํ้าตาล', variety_id: 7 },
            { weaknesse: 'ไม่ต้านทานโรคไหม้ โรคขอบใบแห้ง โรคใบหงิก และโรคใบจุดสีนํ้าตาล', variety_id: 8 },
            { weaknesse: 'ไม่ต้านทานเพลี้ยกระโดดสีนํ้าตาล หนอนกอ และแมลงบั่ว', variety_id: 8 },
            { weaknesse: 'เมล็ดร่วงง่าย', variety_id: 9 },
            { weaknesse: 'ไม่ต้านทานโรคขอบใบแห้ง โรคไหม้ และโรคเมล็ดด่าง', variety_id: 9 },
            { weaknesse: 'ไม่ต้านทานโรคเมล็ดด่าง', variety_id: 9 },
            { weaknesse: 'ไม่ต้านทานโรคขอบใบแห้ง โรคใบสีส้ม โรคใบขีดโปร่งแสง โรคใบขีดสีน้ำตาล และโรคใบหงิก', variety_id: 10 },
            { weaknesse: 'ไม่ต้านทานเพลี้ยกระโดดสีน้ำตาล เพลี้ยจักจั่นสีเขียว หนอนกอ และแมลงบั่ว', variety_id: 10 },
            { weaknesse: 'ถ้าใช้อัตราปุ๋ยสูง ต้นข้าวจะล้ม', variety_id: 11 },
            { weaknesse: 'ไม่ต้านทานโรคใบสีส้ม โรคกาบใบแห้ง โรคไหม้', variety_id: 11 },
            { weaknesse: 'ไม่ต้านทานหนอนกอ', variety_id: 11 },
            { weaknesse: 'ไม่ต้านทานโรคขอบใบแห้ง โรคใบสีส้ม', variety_id: 12 },
            { weaknesse: 'ไม่ต้านทานเพลียกระโดดสีนําตาล และแมลงบัว', variety_id: 12 },
            { weaknesse: 'ไม่ต้านทานโรคไหม้ และเพลี้ยกระโดดสีน้ำตาล', variety_id: 13 },
            { weaknesse: 'ไม่ต้านทานโรคขอบใบแห้ง', variety_id: 14 },
            //{ weaknesse: 'โรคใบจุดสีน้ำตาล', variety_id: 14},
            //{ weaknesse: 'โรคใบจุดสีน้ำตาล', variety_id: 14},
            //{ weaknesse: 'โรคใบจุดสีน้ำตาล', variety_id: 14},
            //{ weaknesse: 'โรคใบจุดสีน้ำตาล', variety_id: 14},
            //{ weaknesse: 'โรคใบจุดสีน้ำตาล', variety_id: 14},
        ]);
    }
}
