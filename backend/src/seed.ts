//seed.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function seedRoles() {
  const { data, error } = await supabase.from('Roles').select('id').limit(1)

  if (error) {
    console.error('❌ Error checking Users:', error)
    return
  }

  if (data.length == 0) {
    await supabase.from('Roles').insert([
      { role_name: 'ชาวนา'},
      { role_name: 'เจ้าหน้าที่กระทรวงเกษตรฯ'}
    ])  
  }
  
}

export async function seedDiseaseInformations() {
  const { data, error } = await supabase.from('DiseaseInformations').select('id').limit(1)

  if (error) {
    console.error('❌ Error checking DiseaseInformations :', error)
    return
  }

  if (data.length == 0) {
    await supabase.from('DiseaseInformations').insert([
      { disease_name: 'โรคใบจุดสีน้ำตาล', symptom : `<u>แผลที่ใบข้าว</u> พบมากในระยะแตกกอ แผลมีลักษณะเป็นจุดสีน้ำตาล รูปกลมหรือรูปไข่ขอบนอกสุดของแผลมีสีเหลือง ขนาดเส้นผ่าศูนย์กลาง 0.5-1 มิลลิเมตร แผลที่มีการพัฒนาเต็มที่ขนาดประมาณ 1-2 x 4-10 มิลลิเมตร บางครั้งพบแผลไม่เป็นวงกลมหรือรูปไข่ แต่จะเป็นรอยเปื้อนคล้ายสนิมกระจัดกระจายทั่วไปบนใบข้าว <u>แผลบนเมล็ดข้าวเปลือก</u> (โรคเมล็ดด่าง) บางแผลมีขนาดเล็ก บางแผลอาจใหญ่คลุมเมล็ดข้าวเปลือก ทำให้เมล็ดข้าวเปลือกสกปรก เสื่อมคุณภาพ เมื่อนำไปสีข้าวสารจะหักง่าย`}
      ,{ disease_name: 'โรคขอบใบแห้ง', symptom : `โรคนี้เป็นได้ตั้งแต่ระยะกล้าถึงออกรวง ต้นกล้าจะมีจุดเล็กๆ ลักษณะช้ำที่ขอบใบของใบล่าง ต่อมาประมาณ 7 - 10 วัน จุดช้ำนี้จะขยายกลายเป็นทางสีเหลืองยาวตามใบ ใบที่เป็นโรคจะแห้งเร็ว และสีเขียวจะจางลงเป็นสีเทาๆ ระยะปักดำใบที่เป็นโรคขอบใบมีรอยขีดช้ำ ต่อมาจะเปลี่ยนเป็นสีเหลือง ที่แผลมีหยดน้ำสีครีมกลมๆ ขนาดเล็ก ต่อมาจะกลายเป็นสีน้ำตาลและหลุดไปตามน้ำหรือฝนแผลขยายตามความยาวของใบและตามความกว้างของใบ ขอบแผลหยัก แผลนี้เมื่อนานไปจะเปลี่ยนเป็นสีเทา ใบที่เป็นโรคขอบใบจะแห้งและม้วนตามความยาว ต้นข้าวเหี่ยวเฉาและแห้งตายทั้งต้นโดยรวดเร็ว เรียกอาการของโรคนี้ว่า “ครีเสก” (kresek)`}
      ,{ disease_name: 'โรคใบสีส้ม', symptom : `เป็นได้ทั้งระยะกล้า แตกกอ ตั้งท้อง หากข้าวได้รับเชื้อในระยะกล้าถึงระยะแตกกอ ข้าวจะเสียหายมากกว่าได้รับเชื้อในระยะตั้งท้องถึงระยะออกรวงข้าวเริ่มแสดงอาการหลังจากได้รับเชื้อ 15 - 20 วันอาการเริ่มต้นใบข้าวจะเริ่มมีสีเหลืองสลับเขียว ต่อมาจะเปลี่ยนเป็นสีเหลือง เริ่มจากปลายใบเข้าหาโคนใบ ถ้าเป็นรุนแรงในระยะกล้าต้นข้าวอาจถึงตาย ต้นที่เป็นโรคจะเตี้ยแคระแกร็น ช่วงลำต้นสั้นกว่าปกติมาก ใบใหม่ที่โผล่ออกมามีตำแหน่งต่ำกว่าข้อต่อใบล่าสุด ถ้าเป็นรุนแรงอาจตายทั้งกอ ถ้าไม่ตายจะออกรวงล่าช้ากว่าปกติ ให้รวงเล็ก หรือไม่ออกรวงเลย`}
      ,{ disease_name: 'โรคไหม้', symptom : `<u>ระยะกล้า</u> ที่ใบมีแผลจุดสีนํ้าตาล คล้ายรูปตามีสีเทาอยู่ตรงกลางแผล ถ้าระบาดรุนแรง กล้าข้าวจะแห้ง และฟุบตาย อาการคล้ายถูกไฟไหม้ (blast)ระยะแตกกอ พบได้ที่ใบ กาบใบ ข้อต่อของใบและข้อต่อของลำต้น ใบจะมีแผลสีนํ้าตาลดำ และหลุดจากกาบใบ<u>ระยะคอรวง</u> จะทำให้เมล็ดลีบ ในข้าวเริ่มให้รวงแต่ถ้าเป็นโรคตอนรวงข้าวแก่ใกล้เก็บเกี่ยว คอรวงจะปรากฏรอยแผลช้ำสีน้ำตาล ทำให้เปราะหักรวงข้าวร่วงหล่น`}
      ,{ disease_name: 'โรคใบวงสีน้ำตาล', symptom : `<u>ระยะกล้า</u> ข้าวจะแสดงอาการไหม้ที่ปลายใบและมีสีน้ำตาลเข้ม <u>ระยะแตกกอ</u>อาการส่วนใหญ่จะเกิดบนใบ แต่มักจะเกิดแผลที่ปลายใบมากกว่าบริเวณอื่นๆ ของใบ แผลที่เกิดบนใบในระยะแรกมีลักษณะเป็นรอยช้ำ รูปไข่ยาวๆ แผลสีน้ำตาลปนเทา ขอบแผลสีน้ำตาลอ่อน จากนั้นแผลจะขยายใหญ่ขึ้นเป็นรูปวงรี ติดต่อกัน ทำให้เกิดอาการใบไหม้บริเวณกว้าง และเปลี่ยนเป็นสีฟางข้าว ในที่สุดแผลจะมีลักษณะเป็นวงซ้อนๆ กันลุกลามเข้ามาที่โคนใบ มีผลทำให้ข้าวแห้งก่อนกำหนด`}
      ,{ disease_name: 'โรคใบขีดสีน้ำตาล', symptom : `ลักษณะแผลที่ใบข้าวมีเป็นขีดๆ สีน้ำตาลขนานไปกับเส้นใบข้าว มักพบในระยะข้าวแตกกอ แผลไม่กว้างตรงกลางเล็กและไม่มีรอยช้ำที่แผล ต่อมาแผลจะขยายมาติดกัน แผลจะมีมากตามใบล่างและปลายใบ ใบที่เป็นโรคจะแห้งตายจากปลายใบก่อน ต้นข้าวที่เป็นโรครุนแรงจะมีแผลสีน้ำตาลที่ข้อต่อใบได้เช่นกัน เชื้อนี้สามารถเข้าทำลายคอรวง ทำให้คอรวงเน่าและหักพับได้`}
      ,{ disease_name: 'โรคแมลงดำหนามข้าว', symptom : `เกิดจากด้วงปีกแข็งชนิดหนึ่ง มีหนามแข็งปกคลุมหรือตัวหนอนของด้วงชนิดนี้ที่มีลักษณะลำตัวแบน สีขาว ตัวเต็มวัยมีสีดำ ลำตัวยาว 5-6 มิลลิเมตร ตัวเต็มวัยกัดกิน และแทะผิวใบข้าวด้านบน ทำให้เป็นรอยขูดทางสีขาวยาวขนานกับเส้นกลางใบ ส่วนตัวหนอนจะชอนใบข้าว เห็นเป็นรอยแผ่นสีขาวขุ่น มัว ขนานกับเส้นใบ นาข้าวที่ถูกทำลายรุนแรง ใบข้าวจะแห้งและกลายเป็นสัน้ำตาล เหมือนถูกไฟไหม้`}
      ,{ disease_name: 'โรคกาบใบแห้ง', symptom : `พบในข้าวระยะแตกกอถึงระยะใกล้เก็บเกี่ยว ต้นข้าวที่แตกกอมากเบียดแน่น โรคนี้จะรุนแรง ลักษณะแผลสีเขียวปนเทา ขอบแผลมีสีนํ้าตาลไหม้ ขนาด1-4 x 2-10 มิลลิเมตรปรากฏตามกาบใบใกล้ระดับน้ำ แผลจะขยายใหญ่จนลุกลามขยายขึ้นถึงใบข้าวเชื้อราอาศัยอยู่ได้นานในตอซังวัชพืชในนา ดินนาและแหล่งน้ำ สามารถมีชีวิตข้ามฤดูหมุนเวียนทำลายข้าวได้ตลอดฤดูการทำนา`}
      ,{ disease_name: 'ใบข้าวสมบูรณ์', symptom : ` `}
    ])  
  }
  
}

export async function seedDeficiencySolutions() {
  const { data, error } = await supabase.from('DeficiencySolutions').select('id').limit(1)

  if (error) {
    console.error('❌ Error checking Users:', error)
    return
  }

  if (data.length == 0) {
    await supabase.from('DeficiencySolutions').insert([
      { disease_id: 1 , solution_text: 'คลุกเมล็ดพันธุ์ก่อนปลูกด้วยสารป้องกันกำจัดเชื้อรา เช่น แมนโคเซบ หรือ คาร์เบนดาซิม+แมนโคเซบ อัตรา 3 กรัมต่อเมล็ด 1 กิโลกรัม'},
      { disease_id: 1 , solution_text: 'กำจัดวัชพืชในนา ดูแลแปลงให้สะอาด และใส่ปุ๋ยในอัตราที่เหมาะสม'},
      { disease_id: 2 , solution_text: 'ใช้พันธุ์ข้าวที่ต้านทาน เช่น พันธุ์สุพรรณบุรี 60 สุพรรณบุรี 90 สุพรรณบุรี 1 สุพรรณบุรี 2 กข7 และ กข23'},
      { disease_id: 2 , solution_text: 'เมื่อเริ่มพบอาการของโรคบนใบข้าว ให้ใช้สารป้องกันกำจัดโรคพืช เช่น ไอโซโพรไทโอเลน คอปเปอร์ไฮดรอกไซด์ เสตร็พโตมัยซินซัลเฟต+ออกซีเตทตราไซคลินไฮโดรคลอร์ไรด์ ไตรเบซิคคอปเปอร์ซัลเฟต อัตราตามคำแนะนำในฉลาก'},
      { disease_id: 3 , solution_text: 'ใช้พันธุ์ข้าวต้านทานแมลงเพลี้ยจักจั่นสีเขียว เช่น กข1 กข3'},
      { disease_id: 3 , solution_text: 'กำจัดวัชพืช และพืชอาศัยของเชื้อไวรัสและแมลงพาหะนำโรค'},
      { disease_id: 3 , solution_text: 'พ่นสารกำจัดแมลงในระยะที่เป็นตัวอ่อน เช่น ไดโนทีฟูเรน หรือ บูโพรเฟซิน หรือ อีโทเฟนพรอกซ'},
      { disease_id: 4 , solution_text: 'ใช้พันธุ์ต้านทานที่เหมาะสมแต่ละท้องที่ ปัจจุบันพันธุ์ที่ค่อนข้างต้านทาน ได้แก่ กข1 กข9 กข11 และ กข21 สุพรรณบุรี 60 สุพรรณบุรี 90'},
      { disease_id: 4 , solution_text: 'อย่าตกกล้าหนาแน่น แบ่งแปลงให้มีการระบายถ่ายเทอากาศดี และอย่าใส่ปุ๋ย ไนโตรเจนสูงเกินไป'},
      { disease_id: 4 , solution_text: 'ใช้สารป้องกันกำจัดโรคพืชเพื่อหยุดยั้งการแพร่ระบาด - คลุกเมล็ดด้วยสารป้องกันกำจัดเชื้อรา เช่น คาซูกะมัยซัน คาร์เบนดาซิมโปรคลอลาส อัตราตามคำแนะนำในฉลาก - ในแหล่งที่มีโรคระบาด ควรพ่นสารป้องกันกำจัดโรคพืชอัตราตามคำแนะนำในฉลาก เช่น คาซูกะมัยซัน คาร์เบนดาซิม อีดิเฟนฟอส'},
      { disease_id: 5 , solution_text: 'ใช้พันธุ์ข้าวต้านทาน เช่น ในภาคตะวันออกเฉียงเหนือใช้ หางยี 71'},
      { disease_id: 5 , solution_text: 'กำจัดพืชอาศัยของเชื้อราสาเหตุโรค เช่น หญ้าชันกาด และหญ้าขน'},
      { disease_id: 5 , solution_text: 'ในแหล่งที่เคยมีโรคระบาด หรือพบแผลลักษณะอาการดังที่กล่าวข้างต้นบนใบข้าวจำนวนมาก ในระยะข้าวแตกกอ ควรฉีดพ่นสารป้องกันกำจัดโรคพืช เช่น ไธโอฟาเนทเมทิล โพรพิโคนาโซล ตามอัตราที่ระบุ'},
      { disease_id: 6 , solution_text: 'ใช้พันธุ์ต้านทานที่เหมาะสมเฉพาะท้องที่ เช่น ภาคใต้ใช้พันธุ์แก่นจันทร์ดอกพะยอม'},
      { disease_id: 6 , solution_text: 'ใช้ปุ๋ยโปแตสเซียมคลอไรด์ (0-0-60) อัตรา 5 - 10 กิโลกรัมต่อไร่ สามารถช่วยลดความรุนแรงของโรคได้'},
      { disease_id: 6 , solution_text: 'กรณีที่เกิดการระบาดของโรครุนแรงในระยะข้าวตั้งท้อง อาจใช้สารป้องกันกำจัดเชื้อราเช่น คาร์เบนดาซิม อัตราตามคำแนะนำในฉลาก'},
      { disease_id: 7 , solution_text: 'หมั่นสำรวจแปลงนาอย่างสม่ำเสมอ'},
      { disease_id: 7 , solution_text: 'กำจัดวัชพืชรอบ ๆ แปลงนา'},
      { disease_id: 7 , solution_text: 'ไม่ควรใช้ปุ๋ยไนโตรเจนมากเกินไป'},
      { disease_id: 7 , solution_text: 'เมื่อเริ่มพบ พ่นเชื้อราเมตาไรเซียม อัตรา 250 กรัม ผสมน้ำ 20 ลิตร พ่นในช่วงที่มีความชื้นสัมพันธ์สูง และพ่นให้เชื้อราสัมผัสกับตัวแมลงมากที่สุด โดยพ่นทุก 3-7 วัน'},
      { disease_id: 7 , solution_text: 'หากมีการระบาดรุนแรง ให้ใช้สารเคมีป้องกันกำจัดแมลง ดังนี้ สารเคมีกลุ่ม 2B ได้แก่ ฟิโพรนิล และสารเคมีกลุ่ม 4A เช่น ไทอะมีทอกแซม อิมิดาโคลพริด โคลไทอะนิดิน เป็นต้น ในอัตราส่วนตามคำแนะนำในฉลาก'},
      { disease_id: 8 , solution_text: 'ใช้พันธุ์ข้าวต้านทาน เช่น กข13 กข7 สุพรรณบุรี 60 เป็นต้น'},
      { disease_id: 8 , solution_text: 'หลังเก็บเกี่ยวข้าวควรเผาตอซังเพื่อทำลายเมล็ดขยายพันธุ์ของเชื้อรา'},
      { disease_id: 8 , solution_text: 'กำจัดวัชพืชตามคันนาและแหล่งนํ้า เพื่อลดโอกาสการฟักตัวและเป็นแหล่งสะสมของเชื้อสาเหตุโรค'},
      { disease_id: 8 , solution_text: 'ใช้ชีวภัณฑ์ บาซิลลัส ซับทิลิส (เชื้อแบคทีเรียปฏิปักษ์) อัตราตามคำแนะนำในฉลาก'},
      { disease_id: 8 , solution_text: 'ใช้สารป้องกันกำจัดเชื้อรา เช่น วาลิดามัยซิน โพรพิโคนาโซล เพนไชคูรอนอัตราตามคำแนะนำในฉลาก โดยพ่นบริเวณที่เริ่มพบโรคระบาด ไม่จำเป็นต้องพ่นทั้งแปลงนา เพราะโรคกาบใบแห้งจะเกิดเป็นหย่อมๆ'},
    ])  
  }
  
}

export async function seedUsers() {
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

    let authUserId: string | null = null;
    const existingAuth = userList.users.find(user => user.email === u.email);

    if (existingAuth) {
      // ใช้ uid เดิมของ auth.users
      authUserId = existingAuth.id;
    } else {
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
      .upsert(
        [{ user_id: authUserId, role_id: u.role_id }],
        { onConflict: 'user_id' } // ป้องกันซ้ำ
      );

    if (upsertError) {
      //console.error(`Error upserting into public.Users for ${u.email}:`, upsertError);
      continue;
    }

    //console.log(`Synced user: ${u.email}`);
  }
}

export async function seedRegions() {
  const { data, error } = await supabase.from('Region').select('id').limit(1)

  if (error) {
    console.error('❌ Error checking Users:', error)
    return
  }

  if (data.length == 0) {
    await supabase.from('Region').insert([
      { region_name: 'ภาคเหนือ'},
      { region_name: 'ภาคตะวันออกเฉียงเหนือ'},
      { region_name: 'ภาคกลาง'},
      { region_name: 'ภาคตะวันออก'},
      { region_name: 'ภาคตะวันตก'},
      { region_name: 'ภาคใต้'},
    ])  
  }
  
}

export async function seedProvinces() {
  const { data, error } = await supabase.from('Provinces').select('id').limit(1)
  
  if (error) {
    console.error('❌ Error checking Provinces:', error)
    return
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
    ]

    await supabase.from('Provinces').insert(provinces)
  }
}