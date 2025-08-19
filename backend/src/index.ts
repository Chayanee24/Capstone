// index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import userRoutes from './routes/users';
import roleRoutes from './routes/roles';
import uploadRoutes from './routes/upload';
import diseaseRoutes from './routes/disease';
import statisticRoutes from './routes/statistics';

import { seedRoles, seedDiseaseInformations, seedDeficiencySolutions, seedUsers, seedRegions, seedProvinces } from './seed';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());

// ไว้เช็คว่าเรียกใช้ option ต่างๆ ผ่านมั้ย
app.use(morgan('[:method] :url :status - :response-time ms'));
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(`❌ Error: ${err.message}`);
  res.status(err.status || 500).json({ error: err.message });
});

//Route ไว้ทดสอบว่า server รันได้มั้ย
app.get('/', (_req, res) => {
  res.send('🌾 Rice Disease API is running');
});

//Routes ต่างๆ
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/uploads', uploadRoutes);
app.use('/disease', diseaseRoutes);
app.use('/Statistic', statisticRoutes)

//เริ่มต้น server
async function startServer() {
  await seedRoles();
  await seedDiseaseInformations();
  await seedDeficiencySolutions();
  await seedUsers();
  await seedRegions();
  await seedProvinces();
  //await seedDiseaseStatistics();

  app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
  });
}

startServer();